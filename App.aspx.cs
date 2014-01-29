using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Formula3DApp
{
    public partial class App : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            String ukeyString = Request.QueryString["PNGUKey"];
            int PNGUKey =  ukeyString == null ? -1 : int.Parse(ukeyString);

            String formulaString = Request.QueryString["formula"];
            String systemString = Request.QueryString["system"];
            String descString = "";
            if (formulaString != null) descString = Server.UrlDecode(formulaString);
            if (systemString != null) descString += "\n(" +Server.UrlDecode(systemString) + " Coordinate System)";
            Page.MetaDescription = descString;

            if (PNGUKey > -1)
                SnapPng.ImageUrl = "http://3linematrix.com.s3-website-us-east-1.amazonaws.com/FormulaToy.FormulaToy" + PNGUKey + ".png";
        }
    }
}