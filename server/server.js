/*global __dirname:true, console:true, require:true */

var socket = require('socket.io'),
	express = require('express'),
	http = require('http'),
	app = express(),
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
server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});

/* Start socket listeners */
require('./lib/game-server');