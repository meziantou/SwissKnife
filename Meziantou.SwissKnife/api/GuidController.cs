using System;
using System.Text;
using System.Web.Http;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/guid")]
    public class GuidController : ApiController
    {
        [HttpGet, Route("new")]
        public string NewGuid()
        {
            var newGuid = Guid.NewGuid();
            string[] formats = { "B", "N", "D", "P" };
            StringBuilder sb = new StringBuilder();

            foreach (var format in formats)
            {
                //sb.Append(format);
                //sb.Append(": ");
                sb.AppendLine(newGuid.ToString(format));
            }

            return sb.ToString();
        }

        [HttpPost, Route("parse")]
        public string Parse([FromBody]string value)
        {
            Guid guid = ToGuid(value, Guid.Empty);
            string[] formats = { "B", "N", "D", "P" };
            StringBuilder sb = new StringBuilder();

            foreach (var format in formats)
            {
                //sb.Append(format);
                //sb.Append(": ");
                sb.AppendLine(guid.ToString(format));
            }

            return sb.ToString();
        }

        public static Guid ToGuid(string text, Guid value)
        {
            if (string.IsNullOrEmpty(text))
                return value;

            text = text.Replace("-", "").Trim('{', '}');

            if (string.Compare(text, "new", StringComparison.CurrentCultureIgnoreCase) == 0 || string.Compare(text, "newid", StringComparison.CurrentCultureIgnoreCase) == 0 || string.Compare(text, "newguid", StringComparison.CurrentCultureIgnoreCase) == 0)
                return Guid.NewGuid();

            Guid guid;
            if (Guid.TryParse(text, out guid))
            {
                return guid;
            }

            if (Guid.TryParseExact(text, "N", out guid))
            {
                return guid;
            }
            return value;
        }
    }
}