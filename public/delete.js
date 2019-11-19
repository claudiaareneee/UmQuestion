window.onload = function() {
	$('#deleteUser').modal('show')
}

var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
	$('#deleteUser').modal('show')
});

function Confirm(){
	var userID = document.getElementById("userIdTest").value;
	var userIDC = document.getElementById("userIdConfirm").value;
	
	if(userID == userIDC)
	{
	console.log(userID);
	document.getElementById("userIdTest").value = "";
	document.getElementById("userIdConfirm").value = "";
	document.getElementById("noMatch").innerHTML = " ";
	
	
	$('#deleteUser').modal('hide')
	}
	else
	{
		console.log("Does not Match");
		document.getElementById("noMatch").innerHTML = "User ID's do not match";
	}
}

function Cancel(){
	console.log("Cancel");
}