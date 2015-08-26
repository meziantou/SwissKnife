using System.ServiceModel.Channels;
using System.Web;
using System.Web.Http;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/ip")]
    public class IpController : ApiController
    {
        [HttpGet, Route("my")]
        public string MyIp()
        {
            object value;
            if (Request.Properties.TryGetValue("MS_HttpContext", out value))
            {
                return ((HttpContextWrapper)value).Request.UserHostAddress;
            }

            if (Request.Properties.TryGetValue(RemoteEndpointMessageProperty.Name, out value))
            {
                RemoteEndpointMessageProperty prop = (RemoteEndpointMessageProperty)value;
                return prop.Address;
            }

            return null;
        }
    }
}