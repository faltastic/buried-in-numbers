// https://github.com/faltastic/gazaJuly2014

// setup the data

var places = ["Gaza", "Khan Younis", "Rafah", "Beit Hanoun", "Jabalia", "Shujaeyya"];

var daysJuly = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var ages = [0];

for( i=0;i<33;i++){ 
	ages[i+1] = ages[i] + 2;
}

var countDays = Array.apply(null, new Array(daysJuly.length)).map(Number.prototype.valueOf,0);
var countPlaces = Array.apply(null, new Array(places.length)).map(Number.prototype.valueOf,0);
var countAges = Array.apply(null, new Array(ages.length)).map(Number.prototype.valueOf,0);

// looping over the data only once
for( i=0 ; i< data.length ; i++){

	
	for( j=0 ; j< daysJuly.length ; j++){
		if (data[i].day == daysJuly[j] ){ 
		countDays[j]++;
		}
	}
	for( j=0 ; j< places.length ; j++){
		if (data[i].place.indexOf(places[j]) >= 0){ 
		countPlaces[j]++;
		}
	}

	for( j=0 ; j< ages.length ; j++){
		if (data[i].age == ages[j] || data[i].age == ages[j]-1){ 
		countAges[j]++;
		}
	}


}

//var sumNotOther = 0;
//for( i=0;i<countPlaces.length;i++){ sumNotOther += countPlaces[i];}

//countPlaces[countPlaces.length-1] = data.length - sumNotOther;  



// setup the data for visualization


var palcolor = ["rgb(255,0,0)", "rgb(0,255,0)","rgb(0,0,0)"];
var palecolor = ["rgba(255,0,0,0.8)", "rgba(0,255,0,0.8)","rgba(0,0,0,0.8)"];

var placeData = [];

for ( i=0; i< places.length; i++){
	placeData[i] ={
		value : countPlaces[i],
		label : places[i],	
		color : palecolor[i%3],
		highlight :  palcolor[i%3]
	};
}
		
var daysData = {
	labels: daysJuly,
	datasets: [
		{ 
		data: countDays,
		fillColor : palecolor[2],
		//strokeColor : palecolor[1],
		highlightFill: palcolor[2],
		highlightStroke: palecolor[1]
		}
	]
}

var agesData = {
	labels : ages,
	datasets : [
		{
		data: countAges,
		label: "Ages",
		fillColor : palecolor[1],
		strokeColor : palcolor[1],
		pointColor : palecolor[0],
		pointStrokeColor : palecolor[0],
		pointHighlightFill : palcolor[0],
		pointHighlightStroke : palcolor[0],
		}
	]
}



// create the charts
		
window.onload = function(){
	var ctx = document.getElementById("daysCanvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(daysData, {
		responsive : true, scaleShowGridLines : false

	});


	var ctx = document.getElementById("placesCanvas").getContext("2d");
	window.myPolarArea = new Chart(ctx).PolarArea(placeData, {
		responsive:true,
		scaleShowLine: true

	});
	}

	var ctx = document.getElementById("agesCanvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(agesData, {
			responsive: true, scaleShowGridLines : false, barValueSpacing : 2
		});

