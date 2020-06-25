
$(document).ready(function() {
	var selected = document.querySelector(".selected");
	var optionsContainter = document.querySelector(".options-cont");
	var optionsList = document.querySelectorAll(".option");
	$("#registerForm").hide();

	selected.addEventListener("click", () => {
		optionsContainter.classList.toggle("active");
	})

	optionsList.forEach(o => {
		o.addEventListener("click", () => {
			selected.innerHTML = o.querySelector("label").innerHTML;
			optionsContainter.classList.remove("active");
		})
	})

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