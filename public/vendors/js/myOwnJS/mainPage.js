import { postData, getData } from "./UtilsAPI.js";

var filtersServices = [];
var filtersYears = [];

//Just to be sure the info string after the click on the search button
//Is nice and clean just like it should be.
function buildSearchString(){
	//Not really sexy... but who cares?! :D
	//Final looks are cool!!!
	var aReturn = "";
	if (filtersServices.length == 0){
		aReturn = "Affichage de tous les éléments.";
	} else if (filtersServices.length == 1){
		aReturn = "Recherche effectuée sur le cours de ";
	} else {
		aReturn = "Recherche effectuée sur les cours de ";
	}
	for (var i = 0; i < filtersServices.length; i++){
		if (filtersServices.length > 1){
			if (i == 0){
				aReturn += filtersServices[i];
			}
			if (i != 0 && i != filtersServices.length - 1){
				aReturn += ", " + filtersServices[i]; 
			} 
			if (i != 0 && i == filtersServices.length - 1) {
				aReturn += " et " + filtersServices[i];
			}
		} else {
			if (filtersServices.length == 0){
				aReturn += filtersServices[i] + ".";
			} else {
				aReturn += filtersServices[i];
			}
		}
	}

	if (filtersYears.length != 0){
		aReturn += "\npour un niveau de ";
	} else {
		aReturn += ".";
	}

	for (var i = 0; i < filtersYears.length; i++){
		if (filtersYears.length > 1){
			if (i == 0){
				aReturn += filtersYears[i];
			}
			if (i != 0 && i != filtersYears.length - 1){
				aReturn += ", " + filtersYears[i]; 
			} 
			if (i != 0 && i == filtersYears.length - 1) {
				aReturn += " et " + filtersYears[i];
			}
		} else {
			aReturn += filtersYears[i];
		}
	}
	if (filtersYears.length != 0){
		aReturn += " année.";
	}
	return aReturn;
}


//SweetAlert2 function.
//Only alert who actually interests me.
function notify(type,msg){
	const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	onOpen: (toast) => {
	toast.addEventListener('mouseenter', Swal.stopTimer)
	toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
	})

	Toast.fire({
	icon: type,
	title: msg
	})
}

function showMainPage(){
	let data = {
			action : "firstLoad",
			filterYear : filtersYears,
			filtersService : filtersServices,
			keyWord : $("#keyWord").val()
		};
		postData("/menu", data, onSuccess, onError);
		notify("info",buildSearchString());
}

//Events on main page.
$(document).ready(function() {
	console.log("Ready");

	showMainPage();


	$('#checkboxMaths').click(function () {
		if ($('#checkboxMaths').is(":checked")){
			filtersServices.push("Maths");
	    	//notify("success","Maths à été ajouté à la liste de filtres");
		} else {
			filtersServices.splice(filtersServices.indexOf("Maths"), 1);
			//notify("warning","Maths à été retiré de la liste de filtres");
		}
		filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxPhysique').click(function () {
		if ($('#checkboxPhysique').is(":checked")){
			filtersServices.push("Physique");
	    	//notify("success","Physique à été ajouté à la liste de filtres");
		} else {
			filtersServices.splice(filtersServices.indexOf("Physique"), 1);
			//notify("warning","Physique à été retiré de la liste de filtres");
		}
		filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxChimie').click(function () {
		if ($('#checkboxChimie').is(":checked")){
			filtersServices.push("Chimie");
	    	//notify("success","Chimie à été ajouté à la liste de filtres");
		} else {
			filtersServices.splice(filtersServices.indexOf("Chimie"), 1);
			//notify("warning","Chimie à été retiré de la liste de filtres");
		}
		filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxPremière').click(function () {
	    if ($('#checkboxPremière').is(":checked")){
	    	filtersYears.push("Premiere");
	    	//notify("success","Première à été ajouté à la liste de filtres");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Premiere"), 1);
	    	//notify("warning","Première à été retiré de la liste de filtres");
	    }
	    filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxDeuxième').click(function () {
	    if ($('#checkboxDeuxième').is(":checked")){
	    	filtersYears.push("Deuxieme");
	    	//notify("success","Deuxième à été ajouté à la liste de filtres");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Deuxieme"), 1);
	    	//notify("warning","Deuxième à été retiré de la liste de filtres");
	    }
	    filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxTroisième').click(function () {
	    if ($('#checkboxTroisième').is(":checked")){
	    	filtersYears.push("Troisieme");
	    	//notify("success","Troisième à été ajouté à la liste de filtres");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Troisieme"), 1);
	    	//notify("warning","Troisième à été retiré de la liste de filtres");
	    }
	    filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxQuatrième').click(function(){
		if ($('#checkboxQuatrième').is(":checked")){
	    	filtersYears.push("Quatrieme");
	    	//notify("success","Quatrième à été ajouté à la liste de filtres");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Quatrieme"), 1);
	    	//notify("warning","Quatrième à été retiré de la liste de filtres");
	    }
	    filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxCinquième').click(function () {
	    if ($('#checkboxCinquième').is(":checked")){
	    	filtersYears.push("Cinquieme");
	    	//notify("success","Cinquième à été ajouté à la liste de filtres");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Cinquieme"), 1);
	    	//notify("warning","Cinquième à été retiré de la liste de filtres");
	    }
	    filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#checkboxSixième').click(function () {
	    if ($('#checkboxSixième').is(":checked")){
	    	filtersYears.push("Sixieme");
	    	//notify("success","Sixième à été ajouté à la liste de filtres");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Sixieme"), 1);
	    	//notify("warning","Sixième à été ajouté à la liste de filtres");
	    }
	    filter(filtersYears, filtersServices, $("#keyWord").val());
	})

	$('#SearchButton').click(function(){
		filter(filtersYears, filtersServices, $("#keyWord").val());
		console.log($("#keyWord").val());
	})
});

function filter(yearFilter, serviceFilter, tippedKeyWord){
	let data = {
		action : "filter",
		filterYear : yearFilter,
		filtersService : serviceFilter,
		keyWord : tippedKeyWord
	};
	postData("/menu", data, onSuccess, onError);
	notify("info",buildSearchString());
}

function onSuccess(response){
	console.log(response);
	createDynamicHtmlList("topics", response.data);
	notify("info",buildSearchString());
}

function onError(response){
	console.log(response);
	notify("info","Une erreur est survenue.");

}

function createDynamicHtmlList(targetHtmlElementID, arrayToPrint){
	let divCont = document.getElementById(targetHtmlElementID);
	divCont.innerHTML = "";

	for (var i = 0; i < arrayToPrint.length; i++){

		let myUl = document.createElement("ul");
		myUl.className = "question-list";

		let mya = document.createElement("a");
		myUl.appendChild(mya);

		let myLi = document.createElement("li");
		myLi.className = "question-item";
		mya.appendChild(myLi);

		let myTab = document.createElement("table");
		myTab.className = "table table-borderless";
		myLi.appendChild(myTab);

		let myTb = document.createElement("tbody");
		myTab.appendChild(myTb);

		let myTr = document.createElement("tr");
		myTr.className = "row";
		myTb.appendChild(myTr);

		let myTd = document.createElement("td");
		myTd.className = "col-3 question-state question-title";
		myTd.innerHTML = "<i class=\"fas fa-comment-alt\"></i><br/><button type=\"button\" class=\"btn btn-outline-primary\"> Cours de <br/>" + arrayToPrint[i].annee; + "</button>"
		myTr.appendChild(myTd);

		let myTd2 = document.createElement("td");
		myTd2.className = "col-7 question-title";
		myTr.appendChild(myTd2);

		let myA2 = document.createElement("a");
		myA2.href = "#"
		myA2.innerHTML = arrayToPrint[i].title;
		myTd2.appendChild(myA2);

		let mySpan = document.createElement("span");
		mySpan.className = "question-category badge badge-info";
		mySpan.innerHTML = "<i class=\"fas fa-plus\"></i>" + arrayToPrint[i].matiere;
		myTd2.appendChild(mySpan);

		//DIV INSIDE SECOND TD (Author)
		let myDiv = document.createElement("div");
		myDiv.className = "question-author";
		myDiv.innerHTML = "<i class=\"fa fa-user\"></i> Posted by <span>"+ arrayToPrint[i].poster +"</span>"
		myTd2.appendChild(myDiv);

		let myDiv2 = document.createElement("div");
		myDiv2.className = "question-details";
		myDiv2.innerHTML = "<i class=\"fas fa-calendar-alt\"></i> Posted on <span>" + arrayToPrint[i].postDate +
		 					"</span><div class=\"last-answer\">Last answer : " + arrayToPrint[i].lastAnswer + "</div>";
		myTd2.appendChild(myDiv2);

		let myTd3 = document.createElement("td");
		myTd3.className = "justify-content-end question-statistics";
		myTd3.style.position = "absolute";
		myTd3.style.right = "0px";
		myTr.appendChild(myTd3);

		let myDiv3 = document.createElement("div");
		myDiv3.className = "question-views";
		myDiv3.innerHTML = "<span>" + arrayToPrint[i].nbviews + "</span><br><i class=\"far fa-eye\"></i>"
		myTd3.appendChild(myDiv3);

		let myDiv4 = document.createElement("div");
		myDiv4.className = "question-answers";
		myDiv4.innerHTML = "<span>" + arrayToPrint[i].nbComments +"</span><br><i class=\"far fa-comment-alt\"></i>"
		myTd3.appendChild(myDiv4);

		divCont.appendChild(myUl);


	}


}
