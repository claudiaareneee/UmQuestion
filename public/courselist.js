// TODO: Get logged in user and logged in user type

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


var courses = [
    // TODO: get courses
    // new Course(1234, "DCSP"),
    // new Course(2345, "Intro to CSE"),
    // new Course(3456, "Microprocessors"),
    // new Course(4567, "Art History"),
    // new Course(5678, "Qudditch")
];

var mainContent = document.getElementById("mainContent");
mainContent.appendChild(View.createCourseList(courses));