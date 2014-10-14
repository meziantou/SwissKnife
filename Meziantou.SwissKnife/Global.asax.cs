using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;
using Newtonsoft.Json.Serialization;

namespace Meziantou.SwissKnife
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(config =>
            {
                // Use camel case for JSON data.
                config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                // Web API routes
                config.MapHttpAttributeRoutes();

                //config.Routes.MapHttpRoute(
                //    name: "DefaultApi",
                //    routeTemplate: "api/{controller}/{action}/{id}",
                //    defaults: new { id = RouteParameter.Optional }
                //);
            });
        }

        protected void Session_Start(object sender, EventArgs e)
        {
         
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}