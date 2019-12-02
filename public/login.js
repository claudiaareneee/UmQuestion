
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
			email.className += " is-invalid";
			password.className += " is-invalid";
			document.getElementById("errorText").className = 'form-text invalid-feedback';
		}
		else{
			console.log(dbPassword);
			if(password.value == dbPassword){
				sessionStorage.setItem("userType", dta[1]); // 's' for student, 'a' for admin, 't' teacher.
				sessionStorage.setItem("UserID", dta[2]);
				socket.emit('setLoggedIn',[true, dta[2]]);
				window.location = "course.html";
			}
			else{
				email.className += " is-invalid";
				password.className += " is-invalid";
				document.getElementById("errorText").className = 'form-text invalid-feedback';
			}
		}
	});
};

var loginButton = document.getElementById("newUserButton");
loginButton.onclick = function(){
    window.location = "newUser.html";
};