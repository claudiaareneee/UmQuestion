function fetchPosts(courseId){
    if (courseId != ''){
        socket.emit('fetch_posts', courseId);
        var that = this;
        socket.on('send_posts', function(dta){ // dta will be an object containing all of the questions in the course with their connected answers.
            for (var post of dta){
                var view = View.createPost(post.question, post.answers);
                contentContainer.appendChild(view);
            }
        });
    }
}

function addNewQuestion(questionText){
    var post = new Question(sessionStorage.UserID, sessionStorage.courseID, questionText);
    socket.emit("add_question", {aID:post.authorId, cID: post.courseId, msg:post.message});
}

function Confirm(){
	var user = document.getElementById("userId").value;
	var confirmUser = document.getElementById("confirmId").value;
	var confirmText = document.getElementById("confirmTo").value;
	
	if(user == confirmUser && user != "" && confirmUser != "" && confirmText == "confirm delete")
	{
	document.getElementById("userId").value = "";
	document.getElementById("confirmId").value = "";
	document.getElementById("doNotMatch").innerHTML = "";
	
	$('#deleteUser').modal('hide')
	alert("Succesfull");
	}
	else
	{
		document.getElementById("doNotMatch").innerHTML = "User ID's do not match and/or Usere ID cannot be empty";
		alert("Failed");
	}
}

function Cancel(){
	document.getElementById("userId").value = "";
	document.getElementById("confirmId").value = "";
}

var courseName = document.getElementById("courseName");
var courseIdcourseID = document.getElementById("courseID");

socket.emit('fetch_single_course', sessionStorage.getItem('courseID'));
socket.on('received_single_course', (name) => {
    if (name != undefined || name != null){
        courseName.innerText = name;
        courseID.innerText = "Course ID: " + sessionStorage.getItem('courseID');
        fetchPosts(sessionStorage.getItem('courseID'));
    }
});

socket.on('update_UI', () => {
    fetchPosts(courseId);
});


var courseId = sessionStorage.getItem("courseID");
if (courseId == null || courseId == undefined || courseId == "")
    courseId = 1;

contentContainer = document.getElementById("mainContent");
contentContainer.appendChild(View.createNewPost());

var newPostButton = document.getElementById("postQuestionButton");
newPostButton.addEventListener("click", () => {
    var questionText = document.getElementById("newQuestion").value;
    addNewQuestion(questionText);
    window.location = "/course.html";
});

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("UserID");
    sessionStorage.removeItem("userType");
    socket.emit('userLoggedOut');
    window.location = "/";
});

var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
	$('#deleteUser').modal('show')
});

var courseButton = document.getElementById("courseButton");
courseButton.addEventListener("click", () => {
    // TODO: HANDLE GETTING COURSES
    window.location = "courselist.html";
});

var courseSearchButton = document.getElementById("courseSearchButton");
courseSearchButton.addEventListener("click", () => {
    socket.emit('searchingCourse', searchInput.value);
    socket.on('courseFound', function(success){
        if(success == 0){
            alert("A course was not found matching this ID");
        } else {
            sessionStorage.setItem("courseID", searchInput.value);
            fetchPosts(sessionStorage.getItem("courseID"));
        }
    });
});

// TODO: I haven't made the UI for this yet, but a teacher needs to be able to delete a question
function deleteQuestion(){

}