/*global __dirname:true, console:true, require:true */

var io = require('socket.io'),
	express = require('express'),
	http = require('http'),
	controls = require('./lib/controls'),
	app = express(),
	socket,
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
	console.log(__dirname);
	res.sendfile(__dirname + '/public/index.html');
});

/* Start up server */
server = app.listen(9000);
socket = io.listen(server);
console.log("Server listening on port 9000");

console.log(JSON.stringify(controls));

/* Set up socket event listeners */
socket.sockets.on('connection', function (client) {

	/* On deviceEvent, calculate the gamepad's position, and emit a gameEvent back to the game screen */
	client.on('deviceEvent', function (data) {
		var leftright = controls.getLeftRight(data, 15);
		var forwardbackward = controls.getForwardBackward(data, 15);

		client.emit('gameEvent', {
			tiltLR: leftright,
			tiltFB : forwardbackward
		});
	});
});