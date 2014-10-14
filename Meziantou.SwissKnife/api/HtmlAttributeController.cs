using System.Web;
using System.Web.Http;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/html-attribute")]
    public class HtmlAttributeController : ApiController
    {
        [HttpPost, Route("encode")]
        public string Encode([FromBody]string value)
        {
            return HttpUtility.HtmlAttributeEncode(value);
        }
    }
}