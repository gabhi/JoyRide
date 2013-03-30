/**
 * Hook the keyboard
 *
 * @name	hookDeviceOrientation
 * @memberOf	tQuery.Car
*/
tQuery.Car.register('hookDeviceOrientation', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop		: tQuery.world.loop()
	});
	// create the loop callback
	var loopCb	= this.hookDeviceOrientationLoopCb.bind(this);
	// store the loopCb
	tQuery.data(this, 'deviceOrientation', {
		loopCb	: loopCb
	}, true);
	// hook the callback
	opts.loop.hook(loopCb);
	// for chained API
	return this;
});

/**
 * unhook the keyboard
 *
 * @name	unhookDeviceOrientation
 * @memberOf	tQuery.Car
*/
tQuery.Car.register('unhookDeviceOrientation', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	// fetch data
	var data	= tQuery.data(this, 'deviceOrientation');
	// unstore loopCb
	tQuery.removeData(this, 'deviceOrientation');
	// unhook the callback
	opts.loop.unhook(data.loopCb);
	// for chained API
	return this;
});

/**
 * callback for hook the keyboard
 * 
 * @private 
 * @name	hookDeviceOrientationLoopCb
 * @memberOf	tQuery.Car
*/
tQuery.Car.register('hookDeviceOrientationLoopCb', function(deltaTime, present){
	/*var data	= tQuery.data(this, 'deviceOrientation');
	var opts	= data.opts;
	var dOrientation= tQuery.deviceOrientation();*/
	// device orientation handling
	
	/*this.controls().moveLeft	= (dOrientation.angleY() * 180 / Math.PI) >  10.0;
	this.controls().moveRight	= (dOrientation.angleY() * 180 / Math.PI) < -10.0;
	this.controls().moveForward	= (dOrientation.angleZ() * 180 / Math.PI) < -10.0;
	this.controls().moveBackward	= (dOrientation.angleZ() * 180 / Math.PI) > +10.0;*/
	
	var number = this._opts.number;
	
	if ( typeof controls.leftright !== 'undefined' ){
		if ( controls.leftright === 'left'){
			this.controls().moveLeft = true;
			this.controls().moveRight = false;
		} else if ( controls.leftright === 'right'){
			this.controls().moveLeft = false;
			this.controls().moveRight = true;
		} else {
			this.controls().moveRight = false;
			this.controls().moveLeft = false;
		}
	}
	if( typeof controls.forwardbackward !== 'undefined' ){
		if ( controls.forwardbackward === 'forward'){
			this.controls().moveForward = true;
			this.controls().moveBackward = false;
		} else if ( controls.forwardbackward === 'backward'){
			this.controls().moveBackward = true;
			this.controls().moveForward = false;
		} else {
			this.controls().moveBackward = false;
			this.controls().moveForward = false;
		}	
	}

	this.flareVisible(['backA', 'backB'], this.controls().moveBackward );
	this.flareVisible(['frontA', 'frontB'], false );
});