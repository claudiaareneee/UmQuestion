var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var pg = require('pg');

// var socket = io();
var isLoggedIn = false;
var userType = null;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/login.html');
});

app.get('course.html', function(req, res){
	if (isLoggedIn)
		res.sendFile(__dirname + '/public/login.html');
	else
		res.sendFile(__dirname + '/public/course.html');
  });

var client = new pg.Client({
	user: 'postgres',
	password: '8yn4ZdxUJF6uP7rIKrkO',
	database: 'postgres',
	host: 'umquestiondb.cz0erjq79iwr.us-east-1.rds.amazonaws.com',
	port: 5432
});

client.connect();

client.query('SELECT * FROM account', (err, res) => {
  console.log(err ? err.stack : res.rows[0]); // Hello World!
});

setTimeout(function(){
client.end();},
100000000);

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('fetch_posts', function(dta){ // Needs to return array of post Ids attached to a course ID
	 //socket.emit('send_posts', [204, 205, 26]);
	// First ask for all the questions related to the course.
	// For each question, get its answers. 
	// [{question: {postID: , msg: , authorId: , endorseCount:} answers: [{postID: , msg: , questionID: , authorID: } , ...]}, ...]
	var posts= [];
	client.query('SELECT * FROM post WHERE cid = $1 AND ptype = q', [dta], (err, res) => { // Untested, but hopefully will work without too much trouble. 
		console.log(err ? err.stack : res.rows[0]); // Hello World!
		var y;
		var endorse;
		for (var x = 0; x < res.rows.length; x++){
			client.query('SELECT COUNT(*) FROM endorses_post WHERE pid = $1', [res.rows[x].pid], (err, res) => {
				endorse = res.rows[0].count;
				posts.push({question: {postID: res.rows[x].pid, msg: res.rows[x].content, authorID: res.rows[x].uid, endorseCount: endorse}, answers: []})
				client.query('SELECT * FROM reply_to R, post P WHERE R.originalid = $1 AND R.replyid = P.pid', [x.pid], (err, res) => {
					for(y of res.rows){
						posts[x].answers.push({postID: y.pid, msg: y.content, authorID: y.uid});
					}
				});
			});
		}
	});
  });
  /*
  [{question: blah, answers: []}]
  */

  socket.on('setLoggedIn', (isLoggedIn, userType) => {
	  this.isLoggedIn = isLoggedIn;
	  this.userType = userType;
  });

  socket.on('userLoggedOut', () => {
	this.isLoggedIn = false;
	this.userType = null;
	});
  
  
  socket.on('fetch_users', function(dta){ // Needs to return array of user IDs attached to a course ID
	socket.emit('send_users', [401, 402, 72]);
  });
  
  socket.on('fetch_teacher', function(dta){ // Needs  to return the UserID of the teacher attached to the CourseID.
	socket.emit('send_teacher', 60);
  });
  
  socket.on('Login_Validation', function(dta){ // Needs  to return the UserID of the teacher attached to the CourseID.
  console.log(dta);
	client.query('SELECT * FROM account WHERE email = $1', [dta] , (err, res) => { // Just needs to return the password attached to this email *ALEX*
		console.log(err ? err.stack : res.rows[0]); // Hello World!
		if(res.rows[0] === undefined){
			console.log("Query was undefined.");
			socket.emit("Login_return", [-1, 0]);
		}
		else{
		console.log("Query was defined.");	
		socket.emit("Login_return", [res.rows[0].upassword, res.rows[0].utype, res.rows[0].uid]);
		}
	});
  });
  
  socket.on('create_user', function(dta){
	client.query('INSERT INTO account(email, upassword, utype) VALUES($1, $2, $3) RETURNING uid', [dta.email, dta.password, dta.type], (err, res) => {
		console.log(err ? err.stack : res.rows[0]); // Hello World!
		if(err){
			socket.emit("create_confirm", 0);
			
		}
		else{
			socket.emit("create_confirm", res.rows[0].uid);
		}
	});  
  });
  
  socket.on('add_question', function(dta){
	client.query('INSERT INTO post(uid, cid, ptype, content) VALUES($1, $2, $3, $4)', [dta.aID, dta.cID, 'q', dta.msg], (err, res) => {
		console.log(err ? err.stack : res.rows[0]); // Hello World!
	});    
  });
  
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});