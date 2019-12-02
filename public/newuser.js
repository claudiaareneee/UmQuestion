createUserButton = document.getElementById("createButton");
email = document.getElementById('email');
emailFeedback = document.getElementById('emailFeedback');
password = document.getElementById('password');
passwordFeedback = document.getElementById('passwordFeedback');
vpassword = document.getElementById('vpassword');
vpasswordFeedback = document.getElementById('vpasswordFeedback');
type = document.getElementById('inputState');
createUserButton.onclick = function (){ // Still need to validate input.
	var error = false;
	email.className = "form-control";
	password.className = "form-control";
	vpassword.className = "form-control";
	emailFeedback.classList = "valid-feedback";
	passwordFeedback.className = "valid-feedback";
	vpasswordFeedback.className = "valid-feedback";


	if (!validateEmail(email.value)){
		email.className = "form-control is-invalid";
		emailFeedback.classList = "invalid-feedback";
    	emailFeedback.innerText = "Invalid email format";
		error = true;
	}

	if (password.value != vpassword.value){
		password.className = "form-control is-invalid";
		vpassword.className = "form-control is-invalid";
		vpasswordFeedback.className = "invalid-feedback";
		vpasswordFeedback.innerText = "Passwords must match";
		error = true;
	} else if (!validateStringForPassword(password.value)){
		password.className = "form-control is-invalid";
		passwordFeedback.className = "invalid-feedback";
		passwordFeedback.innerText = "Invalid password";
		error = true;
	}

	if (!error){
		socket.emit('create_user', {email: email.value, password: password.value, type: type.value[0].toLowerCase()});
		socket.on('create_confirm', function(dta){
			if(dta != 0){
				console.log("confirmed account creation.");
				sessionStorage.setItem('userType', type.value[0].toLowerCase());
				sessionStorage.setItem("userID", dta);
				window.location = "course.html";
			}
			else{
				alert("User with that email already exists.");
			}
		});
	}
};