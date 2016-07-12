function uploadGif(pngurl) {
    var xhr1 = new XMLHttpRequest();
    var pngukey = Math.floor(Math.random() * 10000) + 1;
    var filename = "FormulaToy" + pngukey;
    xhr1.open("POST", "http://3linematrix.com/Upload.aspx?username=FormulaToy&filename=" + filename + "&png=true");
    xhr1.setRequestHeader('Content-Type', 'image/png');
    xhr1.onreadystatechange = function () {
        console.log("Uploading PNG, got status = " + xhr1.status);
        //document.getElementById('loadingGif').style.display = 'none'
                    //if (xhr1.readyState == 4 && xhr1.status == 200) {
                    //    alert("Your PNG was uploaded successfully.");
                    //}
    }
    var data = pngurl.replace("data:image/png;base64,", "");
    xhr1.send(data);
    console.log("Sent PNG to S3, filename = " + filename);
    return pngukey;
}

function shareFormula() {
    var pngUrl = _renderer.domElement.toDataURL();
    var image = document.getElementById('SnapPng');
    image.src = pngUrl;
    var pngukey = uploadGif(pngUrl);

    var tempName = parseInt((new Date()).getTime() / 1000);
    var root = location.protocol + '//' + location.host + location.pathname;
    var url = root + _params.toURL(pngukey) + "&" + tempName;
    var cleanFormula = "Surface graph for " + encodeURIComponent("'" + _params.formula + "'\n");
    var pinterestDescription = encodeURIComponent("Surface graph for '" + _params.formula + "'\n");
    document.getElementById('MatrixURL').value = url;
    document.getElementById("shareEmail").href = "mailto:?subject=" + cleanFormula + "&body=" + encodeURIComponent(url); // double-encoding seems to be required here.
    document.getElementById("shareTW").href = 'http://twitter.com/share?text=' + cleanFormula + '&url=' + encodeURIComponent(url);
    document.getElementById("shareFB").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    document.getElementById("sharePI").href = "https://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(url)
        + "&media=" + encodeURIComponent("http://3linematrix.com.s3-website-us-east-1.amazonaws.com/FormulaToy.FormulaToy" + pngukey + ".png")
        + "&description=" + pinterestDescription
        ;
    document.getElementById('modalBackground').style.display = 'block';
    var el = document.getElementById('ShareDiv');

    el.style.display = 'block';
    el.style.position = 'absolute';
    var top = 20;
    var left = 20;
    el.style.top = top + "px";
    el.style.left = left + "px";
}
function params() {
    this.formula = "g=math.sqrt(f)";
    this.XMapping = "gR";
    this.YMapping = "gI";
    this.ZMapping = "fR";
    this.GradientMapping = "fI";
    this.UMin = '-1';
    this.UMax = '1';
    this.VMin = '-1';
    this.VMax = '1';

    this.spin = true;
    this.spinSpeed = Math.PI / 256;
    this.displayOutline = false;
    this.P = 0.5;
    this.PNGUKey = -1;
    this.color = "#ff0000"; // color (change "#" to "0x")
    this.colorS = "#ffff00"; // color (change "#" to "0x")
    this.shininess = 30;
    this.opacity = 1;
    this.material = "Phong";
    this.draw = function () { userClickedDraw() };
    this.help = function () {
        var win = window.open('Help.html', '_blank');
        win.focus();
    };
    this.navigateToReal = function () {
        window.location.href = 'App.aspx';
    };
    this.share = function () { shareFormula() };
    this.toURL = function (pngUKey) {
        var sb = '';
        //alert(this.formula);
        sb += '?formula=' + encodeURIComponent(this.formula);
        sb += '&opacity=' + encodeURIComponent(this.opacity);
        // http://3linematrix.com.s3-website-us-east-1.amazonaws.com/FormulaToy.FormulaToy21411.png
        //alert(pngUKey);
        sb += '&PNGUKey=' + pngUKey;
        sb += '&XMapping=' + encodeURIComponent(this.XMapping);
        sb += '&YMapping=' + encodeURIComponent(this.YMapping);
        sb += '&ZMapping=' + encodeURIComponent(this.ZMapping);
        sb += '&GradientMapping=' + encodeURIComponent(this.GradientMapping);
        sb += '&UMin=' + encodeURIComponent(this.UMin);
        sb += '&UMax=' + encodeURIComponent(this.UMax);
        sb += '&VMin=' + encodeURIComponent(this.VMin);
        sb += '&VMax=' + encodeURIComponent(this.VMax);
        return sb;
    };
    this.initFromURL = function() {
        var formulaParam = getParameterByName('formula');
        if (formulaParam != '') {
            var cleanFormula = getCleanFormula(formulaParam);
            if (cleanFormula != null) _params.setFormula(cleanFormula);
        }
        var tmpParam;
        tmpParam = getParameterByName('opacity');
        if (tmpParam != '') _params.opacity = parseFloat(tmpParam);
        tmpParam = getParameterByName('PNGUKey');
        if (tmpParam != '') _params.PNGUKey = tmpParam;
        tmpParam = getParameterByName('XMapping');
        if (tmpParam != '') _params.XMapping = tmpParam;
        tmpParam = getParameterByName('YMapping');
        if (tmpParam != '') _params.YMapping = tmpParam;
        tmpParam = getParameterByName('ZMapping');
        if (tmpParam != '') _params.ZMapping = tmpParam;
        tmpParam = getParameterByName('GradientMapping');
        if (tmpParam != '') _params.GradientMapping = tmpParam;
        tmpParam = getParameterByName('UMin');
        if (tmpParam != '') _params.UMin = tmpParam;
        tmpParam = getParameterByName('UMax');
        if (tmpParam != '') _params.UMax = tmpParam;
        tmpParam = getParameterByName('VMin');
        if (tmpParam != '') _params.VMin = tmpParam;
        tmpParam = getParameterByName('VMax');
        if (tmpParam != '') _params.VMax = tmpParam;
    }
    this.setFormula = function(newFormula){
        this.formula = newFormula;
        document.title = newFormula;
    }
}