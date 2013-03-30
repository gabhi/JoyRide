module.exports = function () {

	var io = socket.listen(server),
		users = {},
		lastLeftRight,
		lastForwardBackward,
		messagesPerSecond,
		messages = 0;
		
	function getLeftRight(data, factor){
		var leftright;
		
		if (data.fb < -factor){
			leftright = 'left';
		} else if (data.fb > -factor && data.fb < factor){
			leftright = 'center';
		} else {
			leftright = 'right';
		}
		
		return leftright;
	}
	
	function getForwardBackward(data, factor){
		var forwardbackward;
		
		if (data.lr < -factor ){
			forwardbackward = 'backward';
		} else if (data.lr > factor ){
			forwardbackward = 'forward';
		} else {
			forwardbackward = 'still';
		}
		
		return forwardbackward;
	}
	
	io.sockets.on('connection', function (socket) {
		
		socket.on('deviceEvent', function (data) {
	
			var leftright = getLeftRight(data, 15);
			var forwardbackward = getForwardBackward(data, 15);
			
			messages++;
			
			io.sockets.emit('gameEvent', { 
				number : socket.handshake.address.address,
				tiltLR: leftright,
				tiltFB : forwardbackward,
				messages : messagesPerSecond
			});
		});
	});
	
	/*setInterval(function(){
		messagesPerSecond = messages;
		messages = 0;
	}, 1000);*/	
};