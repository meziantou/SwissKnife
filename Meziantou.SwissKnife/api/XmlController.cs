using System.Web.Http;
using System.Xml.Linq;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/xml")]
    public class XmlController : ApiController
    {
        [HttpPost, Route("encode")]
        public string Encode([FromBody]string value)
        {
            var xml = new XElement("Data", value).ToString();
            return xml.Substring(6, xml.Length - ("<Data>".Length + "</Data>".Length));
        }

        [HttpPost, Route("Decode")]
        public string Decode([FromBody]string value)
        {
            XElement xElement = XElement.Parse("<Data>" + value + "</Data>");
            return xElement.Value;

        }
    }
}