using System.Collections.Generic;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Xml;
using System.Xml.XPath;

namespace Meziantou.SwissKnife.api
{
    [RoutePrefix("api/xpath")]
    public class XPathController : ApiController
    {
        public class Query
        {
            public string Xml { get; set; }
            public string XPath { get; set; }
        }
        [HttpPost, Route("")]
        public List<string> Find(Query query)
        {
            try
            {
                XmlDocument document = new XmlDocument();
                document.LoadXml(query.Xml);
                if (document.DocumentElement == null)
                {
                    throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid XML");
                }

                XmlNodeList xmlNodeList = document.DocumentElement.SelectNodes(query.XPath);

                List<string> matches = new List<string>();
                foreach (XmlNode xmlElement in xmlNodeList)
                {
                    matches.Add(xmlElement.OuterXml);
                }
                return matches;
            }
            catch (XmlException)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid XML");
            }
            catch (XPathException)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid XPath");
            }
        }
    }
}