/**
 * This file defines the AngularJS module "TimeKeeper".
 *
 * @author  https://github.com/lukemcfarlane
 * @date    Dec 2014
 */
var app = angular.module('TimeKeeper', ['ui.bootstrap']);

var intervalID;

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function DisplayLastSavedTime(){
	$('#lastSaved').remove();
	var today = new Date();
	var h = checkTime(today.getHours());
    var m = checkTime(today.getMinutes());
	$('#storageValues').append('<div id="lastSaved"><p> Last saved: ' + h + ':' + m+ '</p></div>');
}

function SaveTimers(){
	var myDescriptions = $( ".ng-valid" );
	var myTimes = jQuery("[id=time-input]");
	localStorage.clear();
	localStorage.setItem("TimerNumbers", myTimes.size());
	for ( var i = 0, l = myTimes.size(); i < l; i++ ) {
		i2 = (i*2) +1;
		var myDescName = "inputDesc" + i;
		var myTimeName = "inputTime" + i;
		localStorage.setItem(myDescName, myDescriptions[i2].value);
		localStorage.setItem(myTimeName, myTimes[i].value);
	}
	console.log("Updated Values");
	DisplaySavedTimers();
	DisplayLastSavedTime();
}

function DisplaySavedTimers() {
	$('#savedData').remove();
	$('.text-center').append(
	'<div id="savedData"><h2>Saved Values</h2><table class="table ng-scope" style="width: 90%; text-align:left;" id="storageValues"><thead><tr><th>Description</th><th>Duration</th></tr></thead><tbody>');
		for ( var i = 0, l = localStorage.getItem("TimerNumbers"); i < l; i++ ) {
			//element for Description is every second one starting with 1 in the array
			i2 = (i*2) +1;
			var myDescName = "inputDesc" + i;
			var myTimeName = "inputTime" + i;
			$('#storageValues').append('<tr class="ng-scope"><td class="ng-binding">' +  localStorage.getItem(myDescName) + '</td><td class="ng-binding">' + localStorage.getItem(myTimeName) + '</td></tr>');
		}
	$('#storageValues').append( '</tbody></table></div>');
}

function StartAutoSave(){
	//Save every 5mins
	intervalID = window.setInterval(function(){
	  SaveTimers();
	}, 300000);
}

function StopAutoSave(){
	clearInterval(intervalID);
}

function ClearSavedValues(){
	localStorage.clear();
	DisplaySavedTimers();
}

function Initiate(){
    DisplaySavedTimers();
    StartAutoSave();
}

$(document).ready(function(){
	Initiate();
});