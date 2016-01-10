var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var reduxMiddlewareReceiver = require('../../lib').server;

http.listen(3001, function(){
  console.log('listening on *:3001');
});

io.on('connection', function(socket){
    reduxMiddlewareReceiver(socket);
});
