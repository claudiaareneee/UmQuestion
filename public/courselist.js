var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    // TODO: HANDLE LOGGING OUT
    window.location = "login.html";
});

var courseButton = document.getElementById("courseButton");
courseButton.addEventListener("click", () => {
    // TODO: HANDLE LOGGING OUT
    window.location = "courselist.html";
});

var courseSearchButton = document.getElementById("courseSearchButton");
courseSearchButton.addEventListener("click", () => {
    // TODO: Handle navigating to course
});


var courses = [
    new Course(1234, "DCSP"),
    new Course(2345, "Intro to CSE"),
    new Course(3456, "Microprocessors"),
    new Course(4567, "Art History"),
    new Course(5678, "Qudditch")
];

var mainContent = document.getElementById("mainContent");
mainContent.appendChild(View.createCourseList(courses));