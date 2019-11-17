createUserButton = document.getElementById("createButton");
email = document.getElementById('email');
password = document.getElementById('password');
vpassword = document.getElementById('vpassword');
type = document.getElementById('inputState');
createUserButton.onclick = function (){
	if(password.value != vpassword.value){
		alert("Passwords do not match.");
	}
	else{
		socket.emit('create_user', {email: email.value, password: password.value, type: type.value[0].toLowerCase()});
		socket.on('create_confirm', function(dta){
			if(dta == 1){
				console.log("confirmed account creation.");
				sessionStorage.setItem('userType', type.value);
				window.location = "course.html";
			}
			else{
				alert("User with that email already exists.")
			}
		});
	}
};