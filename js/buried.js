// https://github.com/faltastic/gazaJuly2014

// setup the data

var places = ["Gaza", "Khan Younis", "Rafah", "Beit Hanoun", "Jabalia", "Shujaeyya"];

var daysJuly = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var ages = [0];

for( i=0;i<33;i++){ 
	ages[i+1] = ages[i] + 2;
}

var families = [ 
	["al-Astal",[],0] ,
	 ["Abu Amer",[],0] , ["Balata",[],0] , ["Abu Zeid",[],0] , ["al-Najjar",[],0] , ["al-Astal-two",[],0] , ["Siyam",[],0] ,
        ["alKilani",[],0] , ["alHallaq",[],0] , ["alBatsh",[],0]  
         ] ;
for( i=0 ; i< families.length ; i++){
	families[i][1] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);
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


	if (data[i].family){	// family field exists
	
		for( j=0 ; j< families.length ; j++){	
			if (data[i].family.indexOf(families[j][0]) >= 0){
		
			// families[j][2] = total
			families[j][2]++;
	 
				// families[j][1] = ["unknown", "Child", "Teenager", "Adult", "Elder"]
				if (data[i].age) {  
					if (data[i].age < 12) { families[j][1][1]++ ; }
					else if (data[i].age < 21) { families[j][1][2]++ ; }	
					else if (data[i].age < 40) { families[j][1][3]++ ; }
					else if (data[i].age >= 40) { families[j][1][4]++ ; }
			 	}
				else { families[j][1][0]++ ;} // unknown age
			} 
		} 
	}

}

console.log(families);

//var sumNotOther = 0;
//for( i=0;i<countPlaces.length;i++){ sumNotOther += countPlaces[i];}

//countPlaces[countPlaces.length-1] = data.length - sumNotOther;  



// setup the data for visualization


var palcolor = ["rgb(255,0,0)", "rgb(0,255,0)","rgb(0,0,0)"];
var palecolor = ["rgba(255,0,0,0.8)", "rgba(0,255,0,0.8)","rgba(0,0,0,0.8)"];

var morepalcolor = [ "rgb(0,255,0)", "rgb(0,155,0)", "rgb(0,55,0)", "rgb(0,0,0)", "rgb(50,50,50)", "rgb(100,100,100)", "rgb(255,0,0)", "rgb(155,0,0)", "rgb(55,0,0)",];


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


var familiesData =[];
var oneFamilyData =[];
for ( i=0; i< families.length; i++){
	familiesData[i]= {
			label: families[i][0],
			data: families[i][1],
			fillColor: "rgba(220,220,220,0.3)",
			strokeColor: morepalcolor[i],
			pointColor: morepalcolor[i] ,
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)"
			
	};
	oneFamilyData[i]= {
			label: families[i][0],
			data: families[i][1],
			fillColor: "rgba(0,0,0,0.2)",
			strokeColor: "rgb(0,0,0)",
			pointColor: "rgba(255,0,0,0.2)",
			pointHighlightFill: "rgba(0,255,0,0.2)",
			
	};
}

var radarDataAll = { 
		labels: ["Age N/A", "Child: 0-12 years old", "Teenager: 13-20 years old", "Adult: 21-40 years old", "Elderly: >40 years old"],		
		datasets: familiesData.slice(1,10)
		}

var radarDataAlBatsh = { 
		labels: ["Age N/A", "Child", "Teenager", "Adult", "Elderly"],		
		datasets: [oneFamilyData[9]]
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
	
	var ctx = document.getElementById("agesCanvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(agesData, {
		responsive: true, scaleShowGridLines : false, barValueSpacing : 2
	});


	window.myRadar = new Chart(document.getElementById("familiesCanvas").getContext("2d")).Radar(radarDataAll, {
			responsive: true, scaleShowLabels : false, scaleShowLine : true,  angleShowLineOut : false,
			datasetStrokeWidth : 1.3, pointDotRadius: 1.9
		});

	window.myRadar = new Chart(document.getElementById("familiesCanvasAlBatsh").getContext("2d")).Radar(radarDataAlBatsh, {
			responsive: true, scaleShowLabels : true, scaleShowLine : true,  angleShowLineOut : false,
			datasetStrokeWidth : 1, pointDotRadius: 5
		});
	
}

	

