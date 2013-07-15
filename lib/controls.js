exports.getLeftRight = function(data, factor){
	var leftright;

	if (data.fb < -factor){
		leftright = 'left';
	} else if (data.fb > -factor && data.fb < factor){
		leftright = 'center';
	} else {
		leftright = 'right';
	}

	return leftright;
};

exports.getForwardBackward = function(data, factor){
	var forwardbackward;

	if (data.lr < -factor ){
		forwardbackward = 'backward';
	} else if (data.lr > factor ){
		forwardbackward = 'forward';
	} else {
		forwardbackward = 'still';
	}

	return forwardbackward;
};