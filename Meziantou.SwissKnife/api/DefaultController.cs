using System;
using System.ServiceModel.Channels;
using System.Text;
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
    }
}