
$(document).ready(function() {
	var selected = document.querySelector(".selected");
	var optionsContainter = document.querySelector(".options-cont");
	var optionsList = document.querySelectorAll(".option");
	$("#registerForm").hide();

	selected.addEventListener("click", function() {
		optionsContainter.classList.toggle("active");
	})

	/*optionsList.forEach(function(o){
		o.addEventListener("click", function() {
			selected.innerHTML = o.querySelector("label").innerHTML;
			optionsContainter.classList.remove("active");
		})
	})*/


	for (var i = 0; i < optionsList.length; i++){
		optionsList[i].addEventListener("click", function() {
			selected.innerHTML = this.querySelector("label").innerHTML;
			optionsContainter.classList.remove("active");
		})
	}

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