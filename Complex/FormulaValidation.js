function getPossibleValuesForSystem(system) {
	return ['f', 'g', 'p'];
}
function getCleanFormula(userFormula) {
    var formula = userFormula.toLowerCase()
            .replace(' ', '')
            .replace(/;;/g, ';')
            .replace(/;/g, ';\n')
    ;
    console.log(formula);
    return formula;
}
