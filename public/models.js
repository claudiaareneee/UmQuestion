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
	constructor(courseID){
		this.courseID = courseID;
		this.courseName = null;
		this.posts = null;
		this.teacherID = null;
		this.fetchData();
		this.fetchPosts();
	}
	fetchPosts(){
		socket.emit('fetch_posts', this.courseID);
		var that = this;
		socket.on('send_posts', function(dta){ // dta will be an object containing all of the questions in the course with their connected answers.
			that.posts = dta;
		});
	}
	fetchData(){
		socket.emit('fetch_course_data', this.courseID);
		var that = this;
		socket.on('send_course_data', function(dta){ // dta is the ID of the teacher in charge of the course.
			that.teacherID = dta.teacher;
			that.courseName = dta.name;
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