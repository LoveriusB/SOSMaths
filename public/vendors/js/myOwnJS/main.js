var loginShown = false;

function showLoginPage(){
	$('#mainMenu').hide();
	$('#MainVideo').hide();
	$('#loginDiv').show();
	$('footer').hide();

	$( "#topDiv" ).removeClass( "backgroundimg" ).addClass( "expandLogin" );
}

function showMainPage(){
	$('#mainMenu').show();
	$('#MainVideo').show();
	$('#loginDiv').hide();
	$('footer').show();

	$( "#topDiv" ).removeClass( "expandLogin" ).addClass( "backgroundimg" );
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