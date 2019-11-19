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
  
  socket.on('fetch_posts', async function(dta){ 
	 //socket.emit('send_posts', [204, 205, 26]);
	// First ask for all the questions related to the course.
	// For each question, get its answers. 
	// [{question: {postID: , msg: , authorId: , endorseCount:} answers: [{postID: , msg: , questionID: , authorID: } , ...]}, ...]
	var posts = [];
	try {
		let res = await client.query("SELECT * FROM post WHERE cid = " + dta + " AND ptype = 'q'");
 
		if (res == null || res == undefined){
			console.log ("res is " + res);
			return;
		}

		for (let x = 0; x < res.rows.length; x++) {
			// const  = res.rows[x];
			if (res == null && res == undefined){
				console.log("ERROR: questionRes is undefined or null");
				return;
			}

			posts[x] = {question: {postId: res.rows[x].pid, message: res.rows[x].content, authorId: res.rows[x].uid}, answers: []};

			try {
				let answerRes = await client.query('SELECT * FROM reply_to R, post P WHERE R.originalid = '+ res.rows[x].pid +' AND R.replyid = P.pid');
				for (let y = 0; y < answerRes.rows.length; y++) {
					posts[x].answers.push({postId: answerRes.rows[y].pid, message: answerRes.rows[y].content, authorId: answerRes.rows[y].uid});
				}
			} catch (err) {
				console.log(err);
			}
		}

	} catch (err) {
		console.log(err);
	}
	socket.emit('send_posts', posts);
  });
  
  socket.on('fetch_course_data',  function(dta){
	  client.query('SELECT * FROM course WHERE cid=$1', [dta], (err, res) => {
		console.log(err ? err.stack : res.rows[0]);
		socket.emit('send_course_data', {teacher: res.rows[0].uid, name: res.rows[0].name});
	  });
  });
  

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
		socket.emit('update_UI');
	});    
  });
  
  socket.on('add_answer', async function(dta){
	let res1 = await client.query('INSERT INTO post(uid, cid, ptype, content) VALUES($1, $2, $3, $4) RETURNING pid', [dta.aID, dta.cID, 'a', dta.msg]);
	let res2 = await client.query('INSERT INTO reply_to(replyid, originalid) VALUES($1, $2)', [res1.rows[0].pid, dta.qID]);
	socket.emit('update_UI');    
  });

  socket.on('searchingCourse', function(dta){
	client.query('SELECT * from course WHERE cid=$1', [dta], (err, res) => {
		console.log(err ? err.stack : res.rows[0]); // Hello World!
		if(err){
			socket.emit('courseFound', 0);
		}
		else{
			socket.emit('courseFound', 1);
		}
	});    
  });
  
	socket.on('create_course', async function(dta){
		let res1 = await client.query('INSERT INTO course(uid, name) VALUES($1, $2)', [dta.uID, dta.name]);
		socket.emit('update_UI');    
	});

	socket.on('fetch_course', async function(dta){
		console.log(dta);
		let res1 = await client.query('SELECT * FROM course WHERE uid=$1', [dta]);
		socket.emit('received_course', res1.rows);
	});

	socket.on('fetch_course_admin', async function(){
		let res1 = await client.query('SELECT * FROM course');
		socket.emit('received_course', res1.rows);
	});

	socket.on('fetch_single_course', async function(dta){
		let res1 = await client.query("SELECT * FROM course WHERE cid="+ dta);
		if(res1.rows[0] != null || res1.rows[0] != undefined)
			socket.emit('received_single_course', res1.rows[0].name);
		else 
			socket.emit('failed_received_single_course');
	});

	socket.on('delete_course', async function(dta){
		let res1 = await client.query("DELETE FROM course WHERE cid=" + dta);
	});

	socket.on('delete_post', async function(dta){
		let res1 = await client.query("DELETE FROM post WHERE pid=" + dta);
	});

	socket.on('delete_user', async function(dta){
		try {
			let res = await client.query("DELETE FROM account WHERE email=$1",[dta]);	
		} catch (error) {
			console.log(error);
		}
	});
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});