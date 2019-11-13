/*
This file contains all of our classes as defined by the design document.
*/

// Will want Methods to return Class data as JSON objects.

/*var Question = function (authorId, courseId, message){
    this.postId = 0;
    this.authorId = authorId || 0;
    this.courseId = courseId || 0;
    this.message = message || "";this.endorseCount = 0;
    this.endorserIds = [];
};

var Answer = function (authorId, courseId, questionId, message){
    this.postId = 0;
    this.authorId = authorId || 0;
    this.questionId = questionId || 0;
    this.courseId = courseId || 0;
    this.message = message || "";this.endorseCount = 0;
    this.endorserIds = [];
}; */

class Course{
	constructor(courseID){
		this.courseID = courseID;
		this.posts = fetchPosts();
		this.userIDs = fetchUsers();
		this.teacherID = fetchTeacher();
	}
	fetchPosts(){
		socket.emit('fetch_posts', this.courseID);
		socket.on('send_posts', function(dta){ // dta is an array of postID's that are attached to the given course.
			return dta;
		});
	}
	fetchUsers(){
		socket.emit('fetch_users', this.courseID);
		socket.on('send_users', function(dta){ // dta is an array of userID's attached to the given course;
			return dta;
		});
	}
	fetchTeacher(){
		socket.emit('fetch_teacher', this.courseID);
		socket.on('send_teacher', function(dta){ // dta is the ID of the teacher in charge of the course.
			return dta;
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
		super(userID)
	}
}