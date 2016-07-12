var _camera, _scene, _renderer, _system;
var _pointLight,_pointLightSphere;
var _spotLight;
var _controls;
var _stats;
var _mat;
var _lastMesh;
var _params;
var _minGrad, _maxGrad;
var _minX, _maxX;
var _minY, _maxY;
var _minZ, _maxZ;
var _gradientValues;
var _font;

var loader = new THREE.FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    _font = font;
    init();
});
var _drawClicked = false;
function userClickedDraw() {
    _drawClicked = true;
    draw();
}
function clearPlot() {
    if (_lastMesh != undefined) {
        _scene.remove(_lastMesh);
        //		_lastMesh.deallocate();
        _lastMesh = undefined;
    }
}
function draw() {
    clearPlot();
	doPlot();
}
function init() {

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    _params = new params();
    _params.initFromURL();
    //alert(_params.PNGUKey);
    //if (_params.PNGUKey > -1) {
    //    var image = document.getElementById('SnapPng');
    //    image.src = "http://3linematrix.com.s3-website-us-east-1.amazonaws.com/FormulaToy.FormulaToy" + _params.PNGUKey + ".png";
    //}

    _renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
    _renderer.setClearColor(0x555555);
    _renderer.setSize(window.innerWidth, window.innerHeight);
	_renderer.shadowMapEnabled = true;
    _renderer.sortObjects = false; // see http://stackoverflow.com/questions/15994944/transparent-objects-in-threejs
	//_renderer.shadowMapCullFace = THREE.CullFaceBack;        
	document.body.appendChild( _renderer.domElement );

	_camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 4000 );
	_camera.position.x = 0;
	_camera.position.y = 4;
	_camera.position.z = 8                                                             ;
	_controls = new THREE.OrbitControls( _camera, _renderer.domElement );

    // STATS
	_stats = new Stats();
	_stats.domElement.style.position = 'absolute';
	_stats.domElement.style.bottom = '0px';
	_stats.domElement.style.zIndex = 100;
	document.body.appendChild( _stats.domElement );    
    
	_scene = new THREE.Scene();
	_camera.lookAt(_scene.position);

	var ambientLight = new THREE.AmbientLight(0x333333);
	_scene.add(ambientLight);

	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 40, 390, -30);
	spotLight.intensity = 3;
	spotLight.distance=600;
	_scene.add( spotLight );

	spotLight = new THREE.SpotLight( 0xaaaaff );
	spotLight.position.set(-40, -190, 80);
	spotLight.intensity = 2;
	spotLight.distance=400;
	_scene.add( spotLight );
	
    setupDatGui();  // this will draw a shape.
	animate();

}
function doPlot() {
    var mesh;
    var color = 0xffffff;
    //var Mat = new THREE.MeshLambertMaterial({color: 0xaaaaaa, opacity: 1 });
    //var Mat2 = new THREE.MeshLambertMaterial({color: 0xddaaaa, opacity: 1 });
    _mat = new THREE.MeshPhongMaterial(
    { color: color, specular: 0x0000cc, shininess: 20,shading: THREE.SmoothShading  }  );

    var statements = _params.formula.replace(/\n/g,'').split(';');
    var jsFormula = "";
    var trimmedUserFormula = "";
    var numValidStatements = 0;
    for (var i = 0; i < statements.length; i++) {
        if (statements[i].length == 0) continue;
        var formulaPiece = convertToJavascript('cartesian', statements[i], "math.");
        if (jsFormula != null) {
            numValidStatements++;
            trimmedUserFormula += statements[i].trim() + ";";
            jsFormula = jsFormula + formulaPiece + ";";
        }
    }
    if (numValidStatements == 1)
        trimmedUserFormula = trimmedUserFormula.replace(/;/g, '');   
    _params.setFormula(getCleanFormula(trimmedUserFormula));
    var dependentVariable = getDependentVariable(_params.formula);
    if (dependentVariable != 'g') {
        alert("The formula must being with 'g='");
        return;
    }

	var prefix, postfix;
	prefix = "var xx, yy, zz, rr, phi, pp, qq;  \
	var uu = u * (" + _params.UMax + " - " + _params.UMin + ") + " + _params.UMin + "; \
	var vv = v * (" + _params.VMax + " - " + _params.VMin + ") + " + _params.VMin + "; \
    var f = math.complex(uu,vv); \
" ;
        
    var postFix = "";

    console.log(jsFormula);
    var preprefix = "var pi = Math.PI; var e = Math.E; var p = " + _params.P + ";";
    var newCode = preprefix + prefix + jsFormula + postFix;
    try {
        eval(newCode); 
    } catch (e) {
        if (e instanceof SyntaxError) {
            alert('There is a syntax error with your formula. Try again please');
            return;
        }
    }
    newCode += " xx = " + getMappingStringForUserSetting(_params.XMapping) + ";";
    newCode += " yy = " + getMappingStringForUserSetting(_params.YMapping) + ";";
    newCode += " zz = " + getMappingStringForUserSetting(_params.ZMapping) + ";";
    newCode += " collectMinMax(xx,yy,zz); "
    newCode += " addGradientValue(" + getMappingStringForUserSetting(_params.GradientMapping) + ");";
    newCode += "var scale = 1; return new THREE.Vector3(xx*scale, zz*scale, yy*scale);  "; // put this after the eval() or non-Chrome browsers will complain.
	var myFunc = new Function("u,v",newCode);
	var geo = doShape(0, 0, 0, myFunc);
	if (geo == null) return;
    updateMeshAppearance(geo);
}
function addGradientValue(val) {
    _gradientValues.push(val);
    if (val < _minGrad) _minGrad = val;
    if (val > _maxGrad) _maxGrad = val;
}
function collectMinMax(x, y, z) {
    if (x < _minX) _minX = x;
    if (x > _maxX) _maxX = x;
    if (y < _minY) _minY = y;
    if (y > _maxY) _maxY = y;
    if (z < _minZ) _minZ = z;
    if (z > _maxZ) _maxZ = z;
}
function getMappingStringForUserSetting(setting) {
    if (setting.toUpperCase() == 'FR')
        return "f.re";
    if (setting.toUpperCase() == 'FI')
        return "f.im";
    if (setting.toUpperCase() == 'GR')
        return "g.re";
    if (setting.toUpperCase() == 'GI')
        return "g.im";
    alert("Mapping must be one of fR, fI, gR, gI");
    return "";
}
function doShape(x, y, z, daFunc) {
    _minGrad = 99999;
    _maxGrad = -99999;
    _minX = 99999;
    _maxX = -99999;
    _minY = 99999;
    _maxY = -99999;
    _minZ = 99999;
    _maxZ = -99999;
    _gradientValues = [];

    try {
        var Geo3 = new THREE.ParametricGeometry(daFunc, 180, 180, false);
    }
    catch (e) {
        alert(e.message);
        return null;
    }
    mesh = new THREE.Mesh( Geo3, _mat );
    mesh.position.x = x; mesh.position.y = y; mesh.position.z = z;
    this._scene.add(mesh);
    _lastMesh = mesh;
    return Geo3;
}
function animate() {
	requestAnimationFrame( animate );
	if (_params.spin) rotateCameraY(_params.spinSpeed);
    // put the 'lookAt' after the camera rotation or it will be askew.
	render();
}
function render() {
    _renderer.render( _scene, _camera );
	_controls.update();
    _stats.update();
}
function updateMeshAppearance(graphGeometry) {
    graphGeometry.computeBoundingBox();

    var color, point, face, numberOfSides, vertexIndex;
    // faces are indexed using characters
    var faceIndices = ['a', 'b', 'c', 'd'];
    var gradientRange = _maxGrad - _minGrad;
    var xRange = _maxX - _minX;
    var yRange = _maxY - _minY;
    var zRange = _maxZ - _minZ;
    drawCoords(_params.XMapping, _params.ZMapping, _params.YMapping, xRange/2, zRange/2, yRange/2);

    // first, assign colors to vertices as desired
    for (var i = 0; i < graphGeometry.vertices.length; i++) {
        //point = graphGeometry.vertices[i];
        //color = new THREE.Color(0x0000ff);
        //color.setHSL(0.7 * (zMax - point.z) / zRange, 1, 0.5);

        color = new THREE.Color(0x0000ff);
        color.setHSL(0.7 * (_maxGrad - _gradientValues[i] ) / gradientRange, 1, 0.5);

        graphGeometry.colors[i] = color; // use this array for convenience
    }
    // copy the colors as necessary to the face's vertexColors array.
    for (var i = 0; i < graphGeometry.faces.length; i++) {
        face = graphGeometry.faces[i];
        numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
        for (var j = 0; j < numberOfSides; j++) {
            vertexIndex = face[faceIndices[j]];
            face.vertexColors[j] = graphGeometry.colors[vertexIndex];
        }
    }

    _lastMesh.material = new THREE.MeshBasicMaterial({
        opacity: _params.opacity,
        transparent: true,
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });

}
