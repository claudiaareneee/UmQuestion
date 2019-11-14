var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// var socket = io();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/login.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('fetch_posts', function(dta){ // Needs to return array of post Ids attached to a course ID
	socket.emit('send_posts', [204, 205, 26]);
  });
  
  socket.on('fetch_users', function(dta){ // Needs to return array of user IDs attached to a course ID
	socket.emit('send_users', [401, 402, 72]);
  });
  
  socket.on('fetch_teacher', function(dta){ // Needs  to return the UserID of the teacher attached to the CourseID.
	socket.emit('send_teacher', 60);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});