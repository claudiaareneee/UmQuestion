
var email = document.getElementById("email");
var password = document.getElementById("password");
var submitButton = document.getElementById("loginButton");
submitButton.onclick = function(){
    //TODO: verify user
	console.log(email.value);	
	socket.emit("Login_Validation", email.value);
	
	var dbPassword = 0;
	
	socket.on("Login_return", function(dta){
		dbPassword = dta[0];
		if(dbPassword == -1){
			alert("An account with this email does not exist.");
		}
		else{
			console.log(dbPassword);
		if(password.value == dbPassword){
		sessionStorage.setItem("userType", dta[1]); // 's' for student, 'a' for admin, 't' teacher.
		sessionStorage.setItem("UserID", dta[2]);
        window.location = "course.html";
		}
		else{
			alert("Incorrect Password.");
		}
}
	});
	
};

var loginButton = document.getElementById("newUserButton");
loginButton.onclick = function(){
    window.location = "newuser.html";
};