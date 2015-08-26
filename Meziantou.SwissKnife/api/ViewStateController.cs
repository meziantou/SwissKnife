using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web.Http;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/viewstate")]
    public class ViewStateController : ApiController
    {
        [HttpPost, Route("decode")]
        public string Decode([FromBody]string value)
        {
            if (value == null) throw new ArgumentNullException(nameof(value));
            using (StringWriter writer = new StringWriter())
            {
                var parser = new ViewStateParser(writer);
                parser.ParseViewStateGraph(value);

                return writer.ToString();
            }
        }
    }

    public class ViewStateParser
    {
        private const byte Token_Int16 = (byte)1;
        private const byte Token_Int32 = (byte)2;
        private const byte Token_Byte = (byte)3;
        private const byte Token_Char = (byte)4;
        private const byte Token_String = (byte)5;
        private const byte Token_DateTime = (byte)6;
        private const byte Token_Double = (byte)7;
        private const byte Token_Single = (byte)8;
        private const byte Token_Color = (byte)9;
        private const byte Token_KnownColor = (byte)10;
        private const byte Token_IntEnum = (byte)11;
        private const byte Token_EmptyColor = (byte)12;
        private const byte Token_Pair = (byte)15;
        private const byte Token_Triplet = (byte)16;
        private const byte Token_Array = (byte)20;
        private const byte Token_StringArray = (byte)21;
        private const byte Token_ArrayList = (byte)22;
        private const byte Token_Hashtable = (byte)23;
        private const byte Token_HybridDictionary = (byte)24;
        private const byte Token_Type = (byte)25;
        private const byte Token_Unit = (byte)27;
        private const byte Token_EmptyUnit = (byte)28;
        private const byte Token_EventValidationStore = (byte)29;
        private const byte Token_IndexedStringAdd = (byte)30;
        private const byte Token_IndexedString = (byte)31;
        private const byte Token_StringFormatted = (byte)40;
        private const byte Token_TypeRefAdd = (byte)41;
        private const byte Token_TypeRefAddLocal = (byte)42;
        private const byte Token_TypeRef = (byte)43;
        private const byte Token_BinarySerialized = (byte)50;
        private const byte Token_SparseArray = (byte)60;
        private const byte Token_Null = (byte)100;
        private const byte Token_EmptyString = (byte)101;
        private const byte Token_ZeroInt32 = (byte)102;
        private const byte Token_True = (byte)103;
        private const byte Token_False = (byte)104;
        private const byte Marker_Format = (byte)255;
        private const byte Marker_Version_1 = (byte)1;
        private const int StringTableSize = 255;

        // private member variables
        private readonly TextWriter _writer;
        List<object> _typeList = new List<object>();
        List<string> _stringList = new List<string>();

        public ViewStateParser(TextWriter writer)
        {
            if (writer == null) throw new ArgumentNullException(nameof(writer));
            _writer = writer;

            InitializeDeserializer();
        }

        private void InitializeDeserializer()
        {
            _typeList.Add(typeof(object));
            _typeList.Add(typeof(int));
            _typeList.Add(typeof(string));
            _typeList.Add(typeof(bool));
        }

        public virtual void ParseViewStateGraph(object viewState)
        {
            ParseViewStateGraph(viewState, 0, string.Empty);
        }

        public virtual void ParseViewStateGraph(string viewStateAsString)
        {
            // Code from ObjectStateFormatter
            byte[] bytes = Convert.FromBase64String(viewStateAsString);
            using (MemoryStream ms = new MemoryStream(bytes))
            using (SerializerBinaryReader reader = new SerializerBinaryReader(ms))
            {
                if (reader.ReadByte() == Marker_Format)
                {
                    if (reader.ReadByte() == Marker_Version_1)
                    {
                        var value = DeserializeValue(reader);
                        ParseViewStateGraph(value, 0, string.Empty);
                    }
                }
            }
        }

        private object DeserializeValue(SerializerBinaryReader reader)
        {
            byte token = reader.ReadByte();
            switch (token)
            {
                case Token_Int16:
                    return reader.ReadInt16();
                case Token_Int32:
                    return reader.ReadEncodedInt32();
                case Token_Byte:
                    return reader.ReadByte();
                case Token_Char:
                    return reader.ReadChar();
                case Token_String:
                    return reader.ReadString();
                case Token_DateTime:
                    return DateTime.FromBinary(reader.ReadInt64());
                case Token_Double:
                    return reader.ReadDouble();
                case Token_Single:
                    return reader.ReadSingle();
                case Token_Color:
                    return Color.FromArgb(reader.ReadInt32());
                case Token_KnownColor:
                    return Color.FromKnownColor((KnownColor)reader.ReadEncodedInt32());
                case Token_IntEnum:
                    var deserializeType = DeserializeType(reader);
                    if (deserializeType is Type)
                    {
                        return Enum.ToObject((Type)deserializeType, reader.ReadEncodedInt32());
                    }
                    else
                    {
                        ((TypeRef)deserializeType).Value = reader.ReadEncodedInt32();
                        return deserializeType;
                    }
                case Token_EmptyColor:
                    return Color.Empty;
                case Token_Pair:
                    return new Pair(this.DeserializeValue(reader), this.DeserializeValue(reader));
                case Token_Triplet:
                    return new Triplet(this.DeserializeValue(reader), this.DeserializeValue(reader), this.DeserializeValue(reader));
                case Token_Array:
                    object elementType1 = DeserializeType(reader);
                    int length = reader.ReadEncodedInt32();
                    if (elementType1 is Type)
                    {
                        Array instance1 = Array.CreateInstance((Type)elementType1, length);
                        for (int index = 0; index < length; ++index)
                            instance1.SetValue(DeserializeValue(reader), index);
                        return instance1;
                    }
                    else
                    {
                        Array instance1 = new TypeRef[length];
                        for (int index = 0; index < length; ++index)
                            instance1.SetValue(new TypeRef(((TypeRef)elementType1).FullName) { Value = this.DeserializeValue(reader) }, index);
                        return instance1;
                    }

                case Token_StringArray:
                    int length2 = reader.ReadEncodedInt32();
                    string[] strArray = new string[length2];
                    for (int index = 0; index < length2; ++index)
                        strArray[index] = reader.ReadString();
                    return strArray;
                case Token_ArrayList:
                    int capacity = reader.ReadEncodedInt32();
                    ArrayList arrayList = new ArrayList(capacity);
                    for (int index = 0; index < capacity; ++index)
                        arrayList.Add(this.DeserializeValue(reader));
                    return arrayList;
                case Token_Hashtable:
                case Token_HybridDictionary:
                    int num2 = reader.ReadEncodedInt32();
                    IDictionary dictionary = (int)token != Token_Hashtable ? new HybridDictionary(num2) : (IDictionary)new Hashtable(num2);
                    for (int index = 0; index < num2; ++index)
                        dictionary.Add(this.DeserializeValue(reader), this.DeserializeValue(reader));
                    return dictionary;
                case Token_Type:
                    return DeserializeType(reader);
                case Token_Unit:
                    return new Unit(reader.ReadDouble(), (UnitType)reader.ReadInt32());
                case Token_EmptyUnit:
                    return Unit.Empty;
                case Token_EventValidationStore:
                    return new TypeRef("EventValidationStore");
                //return (object)EventValidationStore.DeserializeFrom(reader.BaseStream);
                case Token_IndexedStringAdd:
                case Token_IndexedString:
                    return DeserializeIndexedString(reader, token);
                case Token_StringFormatted:
                    object obj1 = null;
                    var type = DeserializeType(reader);
                    string text = reader.ReadString();
                    if (type != null)
                    {
                        TypeConverter converter = TypeDescriptor.GetConverter(type);
                        obj1 = converter.ConvertFromInvariantString(text);
                    }
                    return obj1;
                case Token_BinarySerialized:
                    int count = reader.ReadEncodedInt32();
                    byte[] buffer = new byte[count];
                    if (count != 0)
                        reader.Read(buffer, 0, count);
                    return new BinarySerializeData(buffer);
                case Token_SparseArray:
                    var elementType2 = this.DeserializeType(reader);
                    int num3 = reader.ReadEncodedInt32();
                    int num4 = reader.ReadEncodedInt32();
                    if (num4 > num3)
                        throw new InvalidOperationException("InvalidSerializedData");
                    int length3 = num3;
                    if (elementType2 is Type)
                    {
                        Array instance2 = Array.CreateInstance((Type)elementType2, length3);
                        for (int index1 = 0; index1 < num4; ++index1)
                        {
                            int index2 = reader.ReadEncodedInt32();
                            if (index2 >= num3 || index2 < 0)
                                throw new InvalidOperationException("InvalidSerializedData");
                            instance2.SetValue(this.DeserializeValue(reader), index2);
                        }
                        return instance2;
                    }
                    else
                    {
                        Array instance2 = new TypeRef[length3];
                        for (int index1 = 0; index1 < num4; ++index1)
                        {
                            int index2 = reader.ReadEncodedInt32();
                            if (index2 >= num3 || index2 < 0)
                                throw new InvalidOperationException("InvalidSerializedData");
                            instance2.SetValue(new TypeRef(((TypeRef)elementType2).FullName) { Value = this.DeserializeValue(reader) }, index2);
                        }
                        return instance2;
                    }
                case Token_Null:
                    return null;
                case Token_EmptyString:
                    return string.Empty;
                case Token_ZeroInt32:
                    return 0;
                case Token_True:
                    return true;
                case Token_False:
                    return false;
                default:
                    return "Unknown token: " + token;
                    //throw new InvalidOperationException("InvalidSerializedData");
            }
        }

        private IndexedString DeserializeIndexedString(SerializerBinaryReader reader, byte token)
        {
            if (token == Token_IndexedString)
                return new IndexedString(_stringList[reader.ReadByte()]);

            string s = reader.ReadString();
            _stringList.Add(s);
            return new IndexedString(s);
        }

        private object DeserializeType(SerializerBinaryReader reader)
        {
            byte num = reader.ReadByte();
            if (num == 43)
                return _typeList[reader.ReadEncodedInt32()];

            string typeFullName = reader.ReadString();
            var type = Type.GetType(typeFullName, false);
            if (type != null)
            {
                _typeList.Add(type);
                return type;
            }
            else
            {
                TypeRef typeref = new TypeRef(typeFullName);
                _typeList.Add(typeref);
                return typeref;
            }
        }

        private sealed class SerializerBinaryReader : BinaryReader
        {
            public SerializerBinaryReader(Stream stream)
              : base(stream)
            {
            }

            public int ReadEncodedInt32()
            {
                return this.Read7BitEncodedInt();
            }
        }

        protected virtual void ParseViewStateGraph(object node, int depth, string label)
        {
            _writer.Write(Environment.NewLine);

            if (node == null)
            {
                _writer.Write(string.Concat(Indent(depth), label, "NODE IS NULL"));
            }
            else if (node is Triplet)
            {
                _writer.Write(string.Concat(Indent(depth), label, "TRIPLET"));
                ParseViewStateGraph(((Triplet)node).First, depth + 1, "First: ");
                ParseViewStateGraph(((Triplet)node).Second, depth + 1, "Second: ");
                ParseViewStateGraph(((Triplet)node).Third, depth + 1, "Third: ");
            }
            else if (node is Pair)
            {
                _writer.Write(string.Concat(Indent(depth), label, "PAIR"));
                ParseViewStateGraph(((Pair)node).First, depth + 1, "First: ");
                ParseViewStateGraph(((Pair)node).Second, depth + 1, "Second: ");
            }
            else if (node is ArrayList)
            {
                _writer.Write(string.Concat(Indent(depth), label, "ARRAYLIST"));

                // display array values
                for (int i = 0; i < ((ArrayList)node).Count; i++)
                    ParseViewStateGraph(((ArrayList)node)[i], depth + 1, $"({i}) ");
            }
            else if (node is BinarySerializeData)
            {
                BinarySerializeData bsd = (BinarySerializeData)node;
                _writer.Write(string.Concat(Indent(depth), label, $"Binary Serialized (length {bsd.Bytes.Length})"));
            }
            else if (node is TypeRef)
            {
                TypeRef tr = (TypeRef)node;
                if (tr.Value != null)
                {
                    _writer.Write(string.Concat(Indent(depth), label, $"{tr.Value} ({tr.FullName})"));
                }
                else
                {
                    _writer.Write(string.Concat(Indent(depth), label, $"{tr.FullName}"));
                }
            }
            else if (node is IndexedString)
            {
                IndexedString indexedString = (IndexedString)node;
                _writer.Write(string.Concat(Indent(depth), label, indexedString.Value + " (" + typeof(IndexedString).FullName) + ")");

            }
            else if (node is IDictionary)
            {
                IDictionary dict = (IDictionary)node;

                _writer.Write(string.Concat(Indent(depth), label, "DICTIONARY "));
                _writer.Write(string.Concat("(", node.GetType().ToString(), ")"));
                foreach (object keys in dict.Keys)
                {
                    ParseViewStateGraph(keys, depth + 1, $"{keys} = ");
                }
            }
            else if (node.GetType().IsArray)
            {
                _writer.Write(string.Concat(Indent(depth), label, "ARRAY "));
                _writer.Write(string.Concat("(", node.GetType().ToString(), ")"));
                IEnumerator e = ((Array)node).GetEnumerator();
                int count = 0;
                while (e.MoveNext())
                    ParseViewStateGraph(e.Current, depth + 1, $"({count++}) ");
            }
            else if (node.GetType().IsPrimitive || node is string)
            {
                _writer.Write(string.Concat(Indent(depth), label));
                _writer.Write("{0} ({1})", node, node.GetType());
            }
            else
            {
                _writer.Write(string.Concat(Indent(depth), label, "OTHER - "));
                _writer.Write(node.GetType().ToString());
            }
        }

        protected virtual string Indent(int depth)
        {
            StringBuilder sb = new StringBuilder(IndentString.Length * depth);
            for (int i = 0; i < depth; i++)
                sb.Append(IndentString);

            return sb.ToString();
        }

        public string IndentString { get; set; } = "   ";

        private class TypeRef
        {
            public TypeRef(string fullName)
            {
                FullName = fullName;
            }

            public string FullName { get; set; }
            public object Value { get; set; }
        }

        private class BinarySerializeData
        {
            public BinarySerializeData(byte[] bytes)
            {
                Bytes = bytes;
            }

            public byte[] Bytes { get; set; }
        }
    }
}