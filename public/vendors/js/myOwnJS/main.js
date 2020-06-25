var loginShown = false;

console.log("ready");

function showLoginPage(){
	$('#mainMenu').hide();
	$('#MainVideo').hide();
	$('#loginDiv').show();
	$('footer').hide();
	$('#mainTitle').hide();
	$('#subTitle').hide();

	$( "#topDiv" ).removeClass( "backgroundimg" ).addClass( "expandLogin" );
}

function showMainPage(){
	$('#mainMenu').show();
	$('#MainVideo').show();
	$('#loginDiv').hide();
	$('footer').show();
	$('#mainTitle').show();
	$('#subTitle').show();

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