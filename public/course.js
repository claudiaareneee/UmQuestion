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
	var count = 0;
	
	var email_1 = document.getElementById("emailInput1").value;
	var email_2 = document.getElementById("emailInput2").value;
	var confirmText = document.getElementById("confirmText").value;
	
	if(validateEmail(email_1) == false)
	{
		count++;
		document.getElementById("invalidEmail").innerHTML = "Invalid Format: Email Format";
	}
	else
	{
		document.getElementById("invalidEmail").innerHTML = "";
	}
	
	if(email_1 != email_2 || email_1 == "" || email_2 == "")
	{
		count++;
		document.getElementById("doNotMatch").innerHTML = "Email fields do not match";
	}
	else
	{
		document.getElementById("doNotMatch").innerHTML = "";
	}
	
	if(confirmText != "confirm delete" || confirmText == "")
	{
		count++;
		document.getElementById("confirmError").innerHTML = "Type: confirm delete";
	}
	else
	{
		document.getElementById("confirmError").innerHTML = "";
	}
	
	if(count == 0)
	{
		document.getElementById("emailInput1").value = "";
				document.getElementById("emailInput2").value = "";
				document.getElementById("confirmError").innerHTML = "";
				
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

var courseName = document.getElementById("courseName");
var courseIdcourseID = document.getElementById("courseID");

var courseId = sessionStorage.getItem("courseID");
if (courseId == null || courseId == undefined || courseId == ""){
    sessionStorage.setItem('courseID', 6);
}
    

socket.emit('fetch_single_course', sessionStorage.getItem('courseID'));
socket.on('received_single_course', (name) => {
    if (name != undefined || name != null){
        courseName.innerText = name;
        courseID.innerText = "Course ID: " + sessionStorage.getItem('courseID');
        fetchPosts(sessionStorage.getItem('courseID'));
    }
});
socket.on('failed_received_single_course', () => {
    alert("A course with this ID does not exist");
});

socket.on('update_UI', () => {
    fetchPosts(sessionStorage.getItem("courseID"));
});

contentContainer = document.getElementById("mainContent");
contentContainer.appendChild(View.createNewPost());

var newPostButton = document.getElementById("postQuestionButton");
newPostButton.addEventListener("click", () => {
    var questionText = document.getElementById("newQuestion").value;
    addNewQuestion(questionText);
    window.location = "/course.html";
});

var deleteButton = document.getElementById("deleteButton");

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("UserID");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("courseID");
    socket.emit('userLoggedOut');
    window.location = "/";
});

var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
	$('#deleteUser').modal('show');
});

var courseButton = document.getElementById("courseButton");
courseButton.addEventListener("click", () => {
    // TODO: HANDLE GETTING COURSES
    window.location = "courselist.html";
});

if(sessionStorage.getItem("userType") == 's'){
    deleteButton.remove();
    courseButton.remove();
    document.getElementById("divider1").remove();
    document.getElementById("divider2").remove();
}

if(sessionStorage.getItem("userType") == 't'){
    deleteButton.remove();
    document.getElementById("divider1").remove();
}

var courseSearchButton = document.getElementById("courseSearchButton");
courseSearchButton.addEventListener("click", () => {
    socket.emit('searchingCourse', searchInput.value);
    socket.on('courseFound', function(success){
        if(success == 0){
            alert("A course was not found matching this ID");
        } else {
            sessionStorage.setItem("courseID", searchInput.value);
            window.location = "course.html";
        }
    });
});

function validateEmail(email)
	{
		var validEmail = /[a-z0-9]+@[a-z]+[.][a-z]+$/;
		
		if(!validEmail.test(email.toLowerCase()) || email == "")
		{
			return false;
		}
		else
		{
			return true;
		}
	}

// TODO: I haven't made the UI for this yet, but a teacher needs to be able to delete a question
function deleteQuestion(){

}