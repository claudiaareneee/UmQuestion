var email = document.getElementById("email");
var password = document.getElementById("password");

var submitButton = document.getElementById("loginButton");
submitButton.onclick = function(){
    //TODO: verify user

    if(email.value != "" && password.value != "")
        window.location = "course.html";
    else
        alert("please fill in fields");
};

var loginButton = document.getElementById("newUserButton");
loginButton.onclick = function(){
    window.location = "newuser.html";
};