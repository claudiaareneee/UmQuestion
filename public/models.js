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

function validateEmail(email){
	var validEmail = /[a-z0-9]+@[a-z]+[.][a-z]+$/;
	
	if (!validEmail.test(email.toLowerCase()) || email == ""){
		return false;
	} else {
		return true;
	}
}

function validateStringForPassword(password){
	// Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?
	// Regex came from: https://stackoverflow.com/questions/2370015/regular-expression-for-password-validation
	var validPassword = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;

	if (!validPassword.test(password) || email == ""){
		return false;
	} else {
		return true;
	}	
}	

function Confirm(){
	var count = 0;
	
	var email_1 = document.getElementById("emailInput1").value;
	var email_2 = document.getElementById("emailInput2").value;
	var confirmText = document.getElementById("confirmText").value;
	
	if(validateEmail(email_1) == false){
		count++;
		document.getElementById("invalidEmail").innerHTML = "Invalid Format: Email Format";
	} else {
		document.getElementById("invalidEmail").innerHTML = "";
	}
	
	if(email_1 != email_2 || email_1 == "" || email_2 == "") {
		count++;
		document.getElementById("doNotMatch").innerHTML = "Email fields do not match";
	} else {
		document.getElementById("doNotMatch").innerHTML = "";
	}
	
	if(confirmText != "confirm delete" || confirmText == "") {
		count++;
		document.getElementById("confirmError").innerHTML = "Type: confirm delete";
		document.getElementById("confirmText").value = "";
	} else {
		document.getElementById("confirmError").innerHTML = "";
	}
	
	if(count == 0) {
		document.getElementById("emailInput1").value = "";
		document.getElementById("emailInput2").value = "";
		document.getElementById("confirmText").value = "";
		
		$('#deleteUser').modal('hide');
		socket.emit('delete_user', email_1);
		socket.on('confirm_delete', function(dta){
			if(dta == 1){
				alert("User successfully Deleted.");
			}
			else{
				alert("User does  not exist.");
			}
		});
	}
}

function Cancel(){
	document.getElementById("emailInput1").value = "";
	document.getElementById("emailInput2").value = "";
}
