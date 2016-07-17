function params() {
    this.formula = "z = 1";
    this.spin = true;
    this.spinSpeed = Math.PI / 256;
    this.displayOutline = false;
    this.X = 0;
    this.Y = 0;
    this.Z = 0;
    this.P = 0.5;
    this.PNGUKey = -1;
    this.system = "cartesian";
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
    this.showExamples = function () {
        var win = window.open('examples/index.html', '_blank');
        win.focus();
    };
    this.navigateToComplex = function () {
        window.location.href = 'ComplexApp.aspx';
    };
    this.share = function () { shareFormula() };
    this.toURL = function (pngUKey) {
        var sb = '';
        //alert(this.formula);
        sb += '?formula=' + encodeURIComponent(this.formula);
        sb += '&system=' + encodeURIComponent(this.system);
        sb += '&color=' + encodeURIComponent(this.color.replace('#','0x'));
        sb += '&shininess=' + encodeURIComponent(this.shininess);
        sb += '&opacity=' + encodeURIComponent(this.opacity);
        sb += '&material=' + encodeURIComponent(this.material);
        // http://3linematrix.com.s3-website-us-east-1.amazonaws.com/FormulaToy.FormulaToy21411.png
        //alert(pngUKey);
        sb += '&PNGUKey=' + pngUKey;
        return sb;
    };
    this.initFromURL = function() {
        var systemParam = getParameterByName('system');
        if (systemParam != '') _params.system = systemParam;

        var formulaParam = getParameterByName('formula');
        if (formulaParam != '') {
            var cleanFormula = getCleanFormula(formulaParam);
            if (cleanFormula != null) _params.setFormula(cleanFormula);
        }
        var tmpParam;
        tmpParam = getParameterByName('color');
        if (tmpParam != '') _params.color = tmpParam.replace('0x','#');
        tmpParam = getParameterByName('shininess');
        if (tmpParam != '') _params.shininess = parseInt(tmpParam);
        tmpParam = getParameterByName('opacity');
        if (tmpParam != '') _params.opacity = parseFloat(tmpParam);
        tmpParam = getParameterByName('material');
        if (tmpParam != '') _params.material = tmpParam;
        tmpParam = getParameterByName('PNGUKey');
        if (tmpParam != '') _params.PNGUKey = tmpParam;
    }
    this.setFormula = function(newFormula){
        this.formula = newFormula;
        document.title = newFormula;
    }
}