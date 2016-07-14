// Just putting this in a separate file so it doesn't clutter Main.js
// but it is in the Main.js namespace.
// maintains the global _params
window.addEventListener('keydown', function (event) {
    //console.log(event.keyCode);
    if (event.keyCode == 13) { // enter key pressed
        _params.draw();
    }
});
function smallInputBox() {
    // i arrived at these particular settings thru much trial and error
    _formulaDomElement.children[0].style = "height: 50px; width: 100%;"
    _formulaDomElement.parentElement.parentElement.style = "height: 50px;"
    _formulaDomElement.children[0].rows = 1;   // setting rows on a 'text area'.
}
function largeInputBox() {
    // i arrived at these particular settings thru much trial and error
    _formulaDomElement.children[0].rows = 10;   // setting rows on a 'text area'.

    _formulaDomElement.children[0].style = "height: 400px; width:100%;"
    _formulaDomElement.parentElement.parentElement.style = "height: 400px;"
}
var _sphereColorS;
var _formulaDomElement;
function setupDatGui() {

	var gui1 = new dat.GUI({autoPlace: false, width: 400});
    gui1.domElement.style.position = 'absolute';
    gui1.domElement.style.top = "20px";
    gui1.domElement.style.left = "20px";
    document.body.appendChild(gui1.domElement );
    var formula = gui1.add(_params, 'formula').listen();
    gui1.add(_params, 'XMapping').listen();
    gui1.add(_params, 'YMapping').listen();
    gui1.add(_params, 'ZMapping').listen();
    gui1.add(_params, 'GradientMapping').listen();
    gui1.add(_params, 'UMin').listen();
    gui1.add(_params, 'UMax').listen();
    gui1.add(_params, 'VMin').listen();
    gui1.add(_params, 'VMax').listen();
    _formulaDomElement = formula.domElement;
    var p = gui1.add(_params, 'P').min(-1).max(1).step(0.01).name("p");
    p.onChange(function (value) { draw(); });

    gui1.add(_params, 'draw').name("Click to draw formula.");
	gui1.add(_params, 'helpComplex').name("Click for help, tips.");
	gui1.add(_params, 'share').name("Share.");
	gui1.add(_params, 'navigateToReal').name("Go to Real Numbers.");

	var gui = new dat.GUI();
	    
    var folderAppearance = gui.addFolder('Appearance');
	
	var sphereOpacity = folderAppearance.add( _params, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
	sphereOpacity.onChange(function(value)
	{   _lastMesh.material.opacity = value;   });
	
    folderAppearance.open();     // this won't work now that we have textarea for input, 
	                                // given all the shenanigans i did to make that show/hide

	gui.add(_params, 'spin');
	gui.add(_params, 'spinSpeed',-Math.PI/32,Math.PI/32);

	
	gui.open();
	var updateFormula = !_drawClicked && getParameterByName('formula') == '';
    if (updateFormula)
        _params.formula="g=pow(f,2)"
	draw();
	var x = document.getElementsByTagName('textarea')
	for (var i = 0; i < x.length; i++)
	    x[i].addEventListener('keydown', function (e) {
	        if (e.keyCode == 9) {   // tab key
	            e.preventDefault();
	        }
	    }, false)

}
