/*
This file contains all of our classes as defined by the design document.
*/

// Will want Methods to return Class data as JSON objects.

class Question {
	constructor(authorId, courseId, message){
		this.postId = 0;
		this.authorId = authorId || 0;
		this.courseId = courseId || 0;
		this.message = message || "";this.endorseCount = 0;
		this.endorserIds = [];
	}   
}

class Answer {
	constructor(authorId, courseId, questionId, message){
		this.postId = 0;
		this.authorId = authorId || 0;
		this.questionId = questionId || 0;
		this.courseId = courseId || 0;
		this.message = message || "";this.endorseCount = 0;
		this.endorserIds = [];
	}
}

class Course{
	constructor(courseID, courseName){
		this.courseID = courseID;
		this.courseName = courseName;
		this.posts = this.fetchPosts();
		this.userIDs = this.fetchUsers();
		this.teacherID = this.fetchTeacher();
	}
	fetchPosts(){
		socket.emit('fetch_posts', this.courseID);
		var that = this;
		socket.on('send_posts', function(dta){ // dta will be an object containing all of the questions in the course with their connected answers.
			that.posts = dta;
		});
	}
	fetchUsers(){
		socket.emit('fetch_users', this.courseID);
		var that = this;
		socket.on('send_users', function(dta){ // dta is an array of userID's attached to the given course;
			that.userIDs = dta;
		});
	}
	fetchTeacher(){
		socket.emit('fetch_teacher', this.courseID);
		var that = this;
		socket.on('send_teacher', function(dta){ // dta is the ID of the teacher in charge of the course.
			that.teacherID = dta;
		});
	}
}

class User{
	constructor(userID){
		this.userID = userID;
	}
}

class Student extends User{
	constructor(userID){
		super(userID);
	}
}

class Teacher extends User{
	constructor(userID){
		super(userID);
	}
}