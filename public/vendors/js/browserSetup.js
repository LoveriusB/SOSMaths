$( document ).ready(function() {
	console.log(Browser.name);
    if ( Browser.name === "Chrome" ) { 
    	$("whoAmI").addClass('whoAmI-button-chrome'); 
    }
});