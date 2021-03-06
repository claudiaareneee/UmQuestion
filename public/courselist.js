// TODO: Get logged in user and logged in user type

function fetchCourses(){
    if(sessionStorage.getItem("userType") == 'a'){
        socket.emit('fetch_course_admin');
    } else {
        socket.emit('fetch_course', sessionStorage.getItem('UserID'));   
    }
    socket.on('received_course', (courses) => {
        console.log(courses);
        mainContent.appendChild(View.createCourseList(courses));
    });
}

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("UserID");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("courseID");
    socket.emit('userLoggedOut');
    window.location = "/";
});

var courseButton = document.getElementById("courseButton");
courseButton.addEventListener("click", () => {
    // TODO: HANDLE GETTING COURSES
    window.location = "courselist.html";
});

var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
	$('#deleteUser').modal('show');
});

if(sessionStorage.getItem("userType") == 't'){
    deleteButton.remove();
    document.getElementById("divider1").remove();
}

var searchInput = document.getElementById("searchCourseInput");
var courseSearchButton = document.getElementById("courseSearchButton");
courseSearchButton.addEventListener("click", () => {
    socket.emit('searchingCourse', searchInput.value);
    socket.on('courseFound', function(success){
        if(success == 0){
            alert("A course was not found matching this ID");
        } else {
            sessionStorage.setItem("courseID", searchInput.value);
            window.location = 'course.html';
        }
    });
});

fetchCourses();