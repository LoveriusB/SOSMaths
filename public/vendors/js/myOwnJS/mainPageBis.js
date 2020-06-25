import { postData, getData } from "./UtilsAPI.js";

var filtersServices = [];
var filtersYears = [];
var topics = [];
var filteredTopics = [];

//Just to be sure the info string after the click on the search button
//Is nice and clean just like it should be.
function buildNotificationString(){
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
//Only alert wich actually interests me.
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

//Allows to load all the topics on arrival on the page.
function loadAndShowMainPage(){
	let data = {
		action : "firstLoad"
	};
	postData("/menu", data, onSuccess, onError);
}

//On succes of the postdate, this function shall be launched
function onSuccess(response){
	//notify("info",buildNotificationString());
	topics = response.data;

	//Creating the HTML table.
	createDynamicHtmlList("topics", topics);
}

//On error of the postdate, this function shall be launched
function onError(response){
	console.log(response);
	notify("info","Une erreur est survenue.");
}

//Gonna filter every element each time something is tiped in the input bar.
//Ergonomics! No need to click on any button.
function filterTopics(topic) {
	if (filtersServices.length == 0 && filtersYears.length == 0){
		//No filters selected. Only filter on the input.
		return topic.title.indexOf($("#keyWord").val()) != -1;
	} else if (filtersServices.length == 0 && filtersYears.length != 0){
		//No services selected. Filter on year AND input!
		return topic.title.indexOf($("#keyWord").val()) != -1 && filtersYears.indexOf(topic.annee) != -1;
	} else if (filtersServices.length != 0 && filtersYears.length == 0){
		//No year selected. Filter on services AND input!
		return topic.title.indexOf($("#keyWord").val()) != -1 && filtersServices.indexOf(topic.matiere) != -1;
	} else {
		//All kind of filters are used.
		return topic.title.indexOf($("#keyWord").val()) != -1 && filtersServices.indexOf(topic.matiere) != -1 && filtersYears.indexOf(topic.annee) != -1;
	}
	return false;
}

//sets the filteredTopics as an array of.. filtered topics (YOLOOOO)
function getFilteredTopics() {
  filteredTopics = topics.filter(filterTopics);
  createDynamicHtmlList("topics", filteredTopics);
}

//Creates the list of topics shown in the main menu.
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

//When document is ready, prepare to react on different events.
$(document).ready(function() {
	loadAndShowMainPage();
	
	$('#checkboxMaths').click(function () {
		if ($('#checkboxMaths').is(":checked")){
			filtersServices.push("Maths");
		} else {
			filtersServices.splice(filtersServices.indexOf("Maths"), 1);
		}
		getFilteredTopics();
		notify("info",buildNotificationString());
	})

	$('#checkboxPhysique').click(function () {
		if ($('#checkboxPhysique').is(":checked")){
			filtersServices.push("Physique");
		} else {
			filtersServices.splice(filtersServices.indexOf("Physique"), 1);
		}
		getFilteredTopics();
		notify("info",buildNotificationString());
	})

	$('#checkboxChimie').click(function () {
		if ($('#checkboxChimie').is(":checked")){
			filtersServices.push("Chimie");
		} else {
			filtersServices.splice(filtersServices.indexOf("Chimie"), 1);
		}
		getFilteredTopics();
		notify("info",buildNotificationString());
	})

	$('#checkboxPremière').click(function () {
	    if ($('#checkboxPremière').is(":checked")){
	    	filtersYears.push("Premiere");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Premiere"), 1);
	    }
	    getFilteredTopics();
	    notify("info",buildNotificationString());
	})

	$('#checkboxDeuxième').click(function () {
	    if ($('#checkboxDeuxième').is(":checked")){
	    	filtersYears.push("Deuxieme");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Deuxieme"), 1);
	    }
	    getFilteredTopics();
	    notify("info",buildNotificationString());
	})

	$('#checkboxTroisième').click(function () {
	    if ($('#checkboxTroisième').is(":checked")){
	    	filtersYears.push("Troisieme");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Troisieme"), 1);
	    }
	    getFilteredTopics();
	    notify("info",buildNotificationString());
	})

	$('#checkboxQuatrième').click(function(){
		if ($('#checkboxQuatrième').is(":checked")){
	    	filtersYears.push("Quatrieme");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Quatrieme"), 1);
	    }
	    getFilteredTopics();
	    notify("info",buildNotificationString());
	})

	$('#checkboxCinquième').click(function () {
	    if ($('#checkboxCinquième').is(":checked")){
	    	filtersYears.push("Cinquieme");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Cinquieme"), 1);
	    }
	    getFilteredTopics();
	    notify("info",buildNotificationString());
	})

	$('#checkboxSixième').click(function () {
	    if ($('#checkboxSixième').is(":checked")){
	    	filtersYears.push("Sixieme");
	    } else {
	    	filtersYears.splice(filtersYears.indexOf("Sixieme"), 1);
	    }
	    getFilteredTopics();
	    notify("info",buildNotificationString());
	})

	$("#keyWord").on("input", function() {
	    getFilteredTopics();
	});
});
