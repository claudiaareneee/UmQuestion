// TODO: Get logged in user and logged in user type

function fetchCourses(){
    socket.emit('fetch_course', sessionStorage.getItem('UserID'));
    socket.on('received_course', (courses) => {
        console.log(courses);
        mainContent.appendChild(View.createCourseList(courses));
    });
}

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