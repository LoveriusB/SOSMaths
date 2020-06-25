//Is going to make ligin and register forms swipe.

$(document).ready(function() {
	$("#registerForm").hide();

	$("#goToRegister").click(function(){
		$("#loginForm").fadeOut(400);
		setTimeout(function(){
			$("#registerForm").fadeIn(400);
		}, 500)
	})

	$("#goToLogin").click(function(){
		$("#registerForm").fadeOut(400);
		setTimeout(function(){
			$("#loginForm").fadeIn(400);
		}, 500)
	})
})