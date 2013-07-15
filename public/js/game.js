var world,
	car,
	scene = {
		car : undefined,
		greenBlobs : [],
		horseText : undefined,
		horse : undefined
	};

function init(){
	createWorld();
	createSky();
	createLights();
	createGround();
	createRoad();

	addPosts();

	addText({
		text : "iOSDevCamp 2012",
		translateZ : 20,
		translateY : 3,
		translateX : 20,
		rotateY : 80,
		size : 1
	});

	addText({
		text : "WebGL Rocks",
		translateZ : 30,
		translateY : 0.5,
		translateX : -7,
		rotateY : 120,
		size : 0.5
	});

	addCar();

	addHorsey(1, 7);

	scene.horseText = addText({
		text : "oMG HORSE!!",
		translateZ : 7,
		translateY : 1.1,
		translateX : 1,
		size : 0.5
	});
	scene.horseText.scale(0.3, 0.3, 0.3);
	scene.horseText.rotateY(-1);
	scene.horseText.rotateY(-1);
	scene.horseText.rotateY(-1);

	createWobble();

	addImage("images/wayne.jpg", -10, 1, -10);
	addImage('images/cats.png', -6, 1, -6);
	addImage('images/lolcats.jpg', -20, 1, 10);
	addImage('images/orly.jpg', 2, 1, -10);
	addImage('images/shakeweight.jpg', -14, 1, 5);
	addImage('images/chocolaterain.jpg', 3, 1, -12);

	addFace();

	setTimeout( function() {
		showScreen();
	}, 5000);
}

function addImage(path, x, y, z){
	// material
    var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(path)
    });

    // cube
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
	mesh.translateZ(z);
	mesh.translateX(x);
	mesh.translateY(y);
	world.add( mesh );
}

function addHorsey(x, z){
		var loader = new THREE.JSONLoader( true );

		loader.load( "/lib/horse.js", function( geometry ) {
			scene.horse = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x333333, morphTargets: true } ) );
			scene.horse.scale.set( 0.005, 0.005, 0.005 );
			scene.horse.translateZ(z);
			scene.horse.translateX(x);
			scene.horse.rotation.y = 2;
			world.add( scene.horse );
		});

		radius = 600;
		theta = 0;
		duration = 1000;
		keyframes = 15;
		interpolation = duration / keyframes;
		lastKeyframe = 0, currentKeyframe = 0;

		world.loop().hook( function() {
			if (typeof scene.horse === 'undefined') return;
			theta += 0.2;
			var time = Date.now() % duration;
			var keyframe = Math.floor( time / interpolation );
			if ( keyframe != currentKeyframe ) {
				scene.horse.morphTargetInfluences[ lastKeyframe ] = 0;
				scene.horse.morphTargetInfluences[ currentKeyframe ] = 1;
				scene.horse.morphTargetInfluences[ keyframe ] = 0;
				lastKeyframe = currentKeyframe;
				currentKeyframe = keyframe;
			}
			scene.horse.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
			scene.horse.morphTargetInfluences[ lastKeyframe ] = 1 - scene.horse.morphTargetInfluences[ keyframe ];
		});
}

function addFace(){
	var loader = new THREE.JSONLoader();
	loader.load( '/lib/WaltHeadLo.js', function ( geometry ) {
		scene.walt = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
			color: 0x666666,
			ambient : 0x444444,
			envMap	: tQuery.createCubeTexture('skybox')
		}));
		scene.walt.scale.set(0.02, 0.02, 0.02);
		scene.walt.translateX(20);
		scene.walt.translateY(1);
		scene.walt.translateZ(-4);
		world.add(scene.walt);
	});
}

function addPosts(){
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x4ADED,
		color	: 0xFFAAAA
	});
	for(var i = 0; i < 10; i++ ){
		(function(){

			var column	= tQuery.createCylinder(0.2,0.2,2, material).addTo(world);
			column.translateX(i % 2 ? +1 : -1).translateY(0.1).translateZ(-20/2 + -1*i);
		}());
	}
}

function showScreen(){
	document.getElementById('splash').style.display = "none";
}

function createWorld(){
	world = tQuery.createWorld().boilerplate().start();
	world.tRenderer().shadowMapEnabled = true;
	world.tRenderer().shadowMapSoft = true;
}

function addText(opts){
	var text = tQuery.createText(opts.text, {
		size : opts.size
	}).translateY(opts.translateY).translateX(opts.translateX).translateZ(opts.translateZ).castShadow(true).addTo(world);

	if (opts.rotateY){
		world.loop().hook(function(delta){
			var degSecond = delta * Math.PI / 180;
			text.rotateY(opts.rotateY * degSecond);
			//text.rotateZ(2*degSecond);
		});
	}
	return text;
}

function createWobble(){
	for( var m = 0; m < 10; m++){
		(function() {
			var randomZ = Math.floor((Math.random()*10)+13),
				randomX = Math.floor((Math.random()*10)+13),
				randomRotation = Math.floor((Math.random()*360)+1);

			var object3d = tQuery.createSphere().translateX(randomX).translateY(0.5).translateZ(randomZ).addTo(world);

			object3d.geometry().zoom(m*0.2).wobble().back();

			world.loop().hook(function(delta){
				var degSecond	= delta * Math.PI / 180;
				object3d.rotateY(randomRotation*degSecond);
				object3d.rotateZ(randomRotation*degSecond);
			});
		})();
	}
}

function createSky(){
	tQuery.createSkymap('swedishRoyalCastle').addTo(world);
}

function createLights(){
	tQuery.createAmbientLight()
		.addTo(world)
		.color(0xFFFFFF);

	tQuery.createDirectionalLight()
		.addTo(world)
		.position(1,1,-1)
		.color(0xffffff)
		.intensity(2);

	tQuery.createDirectionalLight()
		.addTo(world)
		.position(-10, 20, 30)
		.color(0xffffff)
		.intensity(4)
		.castShadow(true)
		.shadowDarkness(0.8)
		.shadowMap(512*2,512*2)
		.shadowCamera(10, -10, 20, -20, 0.1, 50);
}

function createGround(){
	var ground	= tQuery.createGrassGround({
		//textureUrl	: 'images/grasslight-big.jpg',
		textureUrl : 'images/textures/cube/SwedishRoyalCastle/nx.jpg',
		textureRepeatX	: 1,
		textureRepeatY	: 1,
	}).addTo(world).receiveShadow(true).scaleBy(100);
}

function createRoad(){
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0x666666,
		envMap	: tQuery.createCubeTexture('skybox')
	});

	var material2	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0x123412,
		envMap	: tQuery.createCubeTexture('skybox')
	});


	for(var i = 0; i < 5; i++){
		(function(){
			var torus = tQuery.createTorus(1.25 - 0.1, 0.25, 8, 6 * 4, material)
				.addTo(world)
				.castShadow(true)
				.translateZ( 4 + -1*i )
				.translateY( 0.1 * i )
				.translateX( 8 + i );

			var randomRotation = Math.floor((Math.random()*720)+1);
				if ( randomRotation % 2 === 1 ){
					randomRotation = -randomRotation;
				}

			world.loop().hook(function(delta){
				var degSecond	= delta * Math.PI / 180;
				torus.rotateY( randomRotation * degSecond );
				torus.rotateZ( randomRotation * degSecond );
			});
		}());
	}

	for(var k = 0; k < 4; k++){
		(function() {
			var sphere = tQuery.createSphere(1.25 - 0.25, 0.25, 8, 6 * 4, material2)
				.addTo(world)
				.castShadow(true)
				.translateZ( 20 )
				.translateY( 20 )
				.translateX( -4 + (0.7 * k) );

			scene.greenBlobs[k] = world._scene.__objects[world._scene.__objects.length - 1];

			var randomRotation = Math.floor((Math.random()*360)+1);

			world.loop().hook(function(delta){
				var degSecond	= delta * Math.PI / 180;
				sphere.rotateY(randomRotation*degSecond);
				sphere.rotateZ(randomRotation*degSecond);
			});
		}());
	}

}

function addCar(number){
	car = tQuery.createCar();

	world.add(car.model());
	tQuery.Car.createCameraControls(car, world);

	// var hasTouchEvent	= "ontouchstart" in window;
	// if( hasTouchEvent )	{
	 	//car.hookDeviceOrientation();
	// } else {
		car.hookKeyboard();
	// }

	scene.car = world._scene.__objects[world._scene.__objects.length - 1];
}

init();
