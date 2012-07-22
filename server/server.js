/*global __dirname:true, console:true, require:true */

var socket = require('socket.io'),
	express = require('express'),
	http = require('http');


var app = express();

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

app.get('/reveal', function(req, res){
	res.sendfile(__dirname + '/public/reveal/index.html');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = socket.listen(server);

var users = {};

var lastLeftRight,
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

setInterval(function(){
	messagesPerSecond = messages;
	messages = 0;
}, 1000);