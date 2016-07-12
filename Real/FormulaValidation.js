function getPossibleValuesForSystem(system) {
    var possibleValues;
    if (_params.system == "cartesian") {
        possibleValues = "x,y,z,p";
    }
    if (_params.system == "spherical") {
        possibleValues = "radius,phi,theta,p";
    }
    if (_params.system == "toroidal") {
        possibleValues = "radius, phi, theta";
    }
    if (_params.system == "parametric") {
        possibleValues = "x,y,z,u,v,xx,yy,zz,phi,rr,pp,qq";
    }
    if (_params.system == "cylindrical") {
        possibleValues = "z,radius,phi,p";
    }
    return possibleValues;
}
function getCleanFormula(userFormula) {
    var formula = userFormula.toLowerCase()
            .replace(' ', '')
            .replace(/math/g, 'Math')
            .replace(/;;/g, ';')
            .replace(/;/g, ';\n')
    ;
    console.log(formula);
    return formula;
}
