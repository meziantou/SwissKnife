using System.Web;
using System.Web.Http;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/url")]
    public class UrlController : ApiController
    {
        [HttpPost, Route("encode")]
        public string Encode([FromBody]string value)
        {
            return HttpUtility.UrlEncode(value);
        }

        [HttpPost, Route("path-encode")]
        public string PathEncode([FromBody]string value)
        {
            return HttpUtility.UrlPathEncode(value);
        }

        [HttpPost, Route("Decode")]
        public string Decode([FromBody]string value)
        {
            return HttpUtility.UrlDecode(value);
        }
    }
}