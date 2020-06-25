//Is going to make ligin and register forms swipe.

var loginDiv = document.getElementById("Login");
var registerDiv = document.getElementById("register");
var z = document.getElementById("btn");

function registerClick(){
	loginDiv.style.left = "-110%";
	registerDiv.style.left = "10%";
	z.style.left = "50%";
}

function loginClick(){
	loginDiv.style.left = "10%";
	registerDiv.style.left = "110%";
	z.style.left = "0%";
}

$(document).ready(function() {
	$("#inscrireForm").click(function(){
		registerClick();
	})

	$("#connecterForm").click(function(){
		loginClick();
	})
})