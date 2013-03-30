/*global __dirname:true, console:true, require:true */

var io = require('socket.io'),
	express = require('express'),
	http = require('http'),
	app = express.createServer(),
	server;

app.configure(function(){
	app.set('port', 9000);
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

/* Start up server */
server = app.listen(9000);
console.log("Server listening on port 9000");

var socket = io.listen(server),
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

socket.sockets.on('connection', function (client) {
	
	client.on('deviceEvent', function (data) {

		var leftright = getLeftRight(data, 15);
		var forwardbackward = getForwardBackward(data, 15);
		
		messages++;
		
		client.emit('gameEvent', { 
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