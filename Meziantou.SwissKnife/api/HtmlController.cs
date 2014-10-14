using System.Web;
using System.Web.Http;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/html")]
    public class HtmlController : ApiController
    {
        [HttpPost, Route("encode")]
        public string Encode([FromBody]string value)
        {
            return HttpUtility.HtmlEncode(value);
        }

        [HttpPost, Route("Decode")]
        public string Decode([FromBody]string value)
        {
            return HttpUtility.HtmlDecode(value);
        }
    }
}