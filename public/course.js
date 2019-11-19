var testingthis;
function fetchPosts(courseId){
    if (courseId != ''){
        socket.emit('fetch_posts', courseId);
        var that = this;
        socket.on('send_posts', function(dta){ // dta will be an object containing all of the questions in the course with their connected answers.
            for (var post of dta){
                testingthis = post;
                var view = View.createPost(post.question, post.answers);
                contentContainer.appendChild(view);
            }
        });
    }
}

socket.on('update_UI', () => {
    fetchPosts();
});

function addNewQuestion(questionText){
    var post = new Question(sessionStorage.UserID, sessionStorage.courseID, questionText);
    socket.emit("add_question", {aID:post.authorId, cID: post.courseId, msg:post.message});
}

contentContainer = document.getElementById("mainContent");
contentContainer.appendChild(View.createNewPost());

var courseName = document.getElementById("courseName");
courseName.innerText = "Distributed Client/Server Programming";

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


socket.emit('searchingCourse', 1);
socket.on('courseFound', function(success){
    if(success == 0){
        alert("A course was not found matching this ID");
    } else {
        fetchPosts(1);
    }
});

// TODO: I haven't made the UI for this yet, but a teacher needs to be able to delete a question
function deleteQuestion(){

}