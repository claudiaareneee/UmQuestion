var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var pg = require('pg');

// var socket = io();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/login.html');
});

var client = new pg.Client({
	user: 'postgres',
	password: '8yn4ZdxUJF6uP7rIKrkO',
	database: 'postgres',
	host: 'umquestiondb.cz0erjq79iwr.us-east-1.rds.amazonaws.com',
	port: 5432
});

client.connect();

client.query('INSERT INTO account(upassword, uname, utype) VALUES($1, $2, $3)', ['password', 'user', 's'], (err, res) => {
})

client.query('SELECT * FROM account', (err, res) => {
  console.log(err ? err.stack : res.rows[0]) // Hello World!
})

setTimeout(function(){
client.end();},
100000000);

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('fetch_posts', function(dta){ // Needs to return array of post Ids attached to a course ID
	 socket.emit('send_posts', [204, 205, 26]);
	// First ask for all the questions related to the course.
	// For each question, get its answers. 
	// [{question: {postID: , msg: , authorId: , endorseCount:} answers: [{postID: , msg: , questionID: , authorID: } , ...]}, ...]
  });
  /*
  [{question: blah, answers: []}]
  */
  
  socket.on('fetch_users', function(dta){ // Needs to return array of user IDs attached to a course ID
	socket.emit('send_users', [401, 402, 72]);
  });
  
  socket.on('fetch_teacher', function(dta){ // Needs  to return the UserID of the teacher attached to the CourseID.
	socket.emit('send_teacher', 60);
  });
  
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});