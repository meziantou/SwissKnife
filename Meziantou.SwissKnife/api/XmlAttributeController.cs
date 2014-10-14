using System.Web.Http;
using System.Xml.Linq;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/xml-attribute")]
    public class XmlAttributeController : ApiController
    {
        [HttpPost, Route("encode")]
        public string Encode([FromBody]string value)
        {
            var xml = new XElement("Data", new XAttribute("attr", value)).ToString();
            return xml.Substring("<Data attr=\"".Length, xml.Length - ("<Data attr=\"".Length + "\" />".Length));
        }

        [HttpPost, Route("Decode")]
        public string Decode([FromBody]string value)
        {
            XAttribute attribute = XElement.Parse("<Data attr=\"" + value + "\" />").Attribute("attr");
            return attribute.Value;

        }
    }
}