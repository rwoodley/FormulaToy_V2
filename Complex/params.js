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
    this.helpComplex = function () {
        var win = window.open('ComplexHelp.html', '_blank');
        win.focus();
    };
    this.showExamples = function () {
        var win = window.open('examples/index.html', '_blank');
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