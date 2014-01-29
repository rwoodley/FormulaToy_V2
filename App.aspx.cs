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
            if (formulaString == null)
                Page.MetaDescription = Server.UrlDecode(formulaString);

            if (PNGUKey > -1)
                SnapPng.ImageUrl = "http://3linematrix.com.s3-website-us-east-1.amazonaws.com/FormulaToy.FormulaToy" + PNGUKey + ".png";
        }
    }
}