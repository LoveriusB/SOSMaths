var loginShown = false;

function showLoginPage(){
	$('#mainMenu').hide();
	$('#MainVideo').hide();
	$('#loginDiv').show();
	$('footer').hide();

//Some style moddifications to have a nice background on login page
	$('#topDiv').css("height", "100%");
	$('#topDiv').css("width", "100%");
	$('#topDiv').css("background-position", "center");
	$('#topDiv').css("background-size", "cover");
	$('#topDiv').css("position", "absolute");
}

function showMainPage(){
	$('#mainMenu').show();
	$('#MainVideo').show();
	$('#loginDiv').hide();
	$('footer').show();
//Undo all changings
	$('#topDiv').css("height", "");
	$('#topDiv').css("width", "");
	$('#topDiv').css("background-position", "");
	$('#topDiv').css("background-size", "");
	$('#topDiv').css("position", "");
}

$(document).ready(function() {
	$('#loginDiv').hide();

	$('#ProfileLink').click(function(){
		if (loginShown){
			showMainPage();
			loginShown = false;
		} else {
			showLoginPage();
			loginShown = true;
		}
	})
})