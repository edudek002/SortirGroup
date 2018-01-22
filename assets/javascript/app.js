
var eventLat=[];
var eventLng=[];
var dateSelector=[];
var moreInfo=[];
var eventName=[];
var coords=[];
var map;
var latLng;
var marker;
var myLat;
var myLng;
var infoWindow;


//================== Lodash Error Handling ==================================
function parseLodash(str){
 return _.attempt(JSON.parse.bind(null, str));
}

//================== on-click AJAX Call ==================================
$("#find-event").on("click", function(event) {
  // prevent event default behavior
  event.preventDefault();
  //wait x seconds until the data from Ajax loads and then show the map
  setTimeout(initMap, 4000);
 

//=============== Search Form Inputs  ============================
var location = $("#location-input").val().trim();
console.log(location)

var date = $("#event-date").val();
// console.log(date)

var category = $("#event-category").val();
// console.log(category)

 
//============ Search Form Jquery Menus  =========================
$(document).ready(function() {
  $('select').material_select();
});


// ================  queryURL using $ajax ======================

var queryURL = "https://cors-anywhere.herokuapp.com/api.eventful.com/json/events/search?app_key=54CPdHQQ4wTp4fM7&location=" + location+ "&date="+ date + "&category" + category + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    for (var i=0; i<5; i++){

      console.log(JSON.parse(response));
      
      //Find Longitude and Latitude of the event

      eventLat[i] = parseLodash(response).events.event[i].latitude;
      // console.log("Lat of event " + [i+1] + " = " + eventLat[i]);
      eventLat.push(eventLat[i]);

      eventLng[i] = parseLodash(response).events.event[i].longitude;
      // console.log("Lng of event " + [i+1] + " = " + eventLng[i]);
      eventLng.push(eventLng[i]);


      //================ Table Population ===============================

      //Print date
      dateSelector[i] = parseLodash(response).events.event[i].start_time;
      $("#eventDate").text("Event date information for the table:  " + dateSelector[i]);

      //Print URL of the event -CHANGE TO LINK?
      moreInfo[i]= parseLodash(response).events.event[i].venue_url;
      $("#moreInfo").text("Event URL information for the table:  " + moreInfo[i]);

      //Event Name
      eventName[i]= parseLodash(response).events.event[i].title;

      $("#eventName").text("Event name information for the table:  " + eventName[i]);

      $("#event-table > tbody").append("<tr><td>" + dateSelector[i] + "</td><td>" + dateSelector[i] + "</td><td>" +
    + "</td><td>" + eventName[i] + "</td><td>" + moreInfo[i]+"</td><td>" + "hello" + "</td></tr>");

    }

  });

  //print arrays of Lattitude and Longitude

  // console.log("Latitude array = " + eventLat);
  // console.log("Longitude array = " + eventLng);

});

//================== Display events on GoogleMap =============================


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(eventLat[0], eventLng[0]),
    //mapTypeId: 'terrain'
  });

  for (var i=0; i<3; i++){
  latLng = new google.maps.LatLng(eventLat[i], eventLng[i]);
  marker = new google.maps.Marker({
      position: latLng,
      map: map
  });
  }

//================== Display current location on GoogleMap ====================
  infoWindow = new google.maps.InfoWindow;

  // HTML5 geolocation.
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude

    };

    myLat = position.coords.latitude;
    myLng = position.coords.longitude;

    $("#myLat").html("My location latitude: " + myLat);
    $("#myLng").html("My location longitude: " + myLng);
    //======this shows My location on the map
    
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
  // when Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
  };  
};

//Checking if information from the maps is available after x seconds 

function getMapCoor() {
  // console.log("Event 1 lattitude = " + eventLat[0]);
  // console.log("Event 1 longitude = " + eventLng[0]);
  // console.log("My latitude = " + myLat);
  // console.log("My longitude = " + myLng);
  };
setTimeout(getMapCoor, 12000);


//===================  Lyft API and AJAX request ========================

function displayLyft(){
  //Checking if the information from the Map is used by the function displayLyft
  // console.log("Lyft Event 1 lattitude = " + eventLat[0]);
  // console.log("Lyft Event 1 longitude = " + eventLng[0]);
  // console.log("Lyft My latitude = " + myLat);
  // console.log("Lyft My longitude = " + myLng);

	// console.log("Display Lyft Function running");
  var OPTIONS = {
    scriptSrc: 'assets/lyft/dist/lyftWebButton.min.js',
    namespace: '',
    clientId: 'ttOsHDUkxRyS',
    clientToken: 'mTjSJFlEwRRmoMVo/loVl70RVsu/m2fkSlb6aeFp94q9ovNq9FRkTttsluEbv6Fv35Q2pSH41W/MjK8GG8iutze2x5MMB8+YPHXHr9Yief/gzJQN8kdXcHA=',
    location: {
      pickup: {
        latitude: myLat,
        longitude: myLng,
      }, 
      destination: {
        latitude: eventLat[0],
        longitude: eventLng[0],
      },
    },
    parentElement: document.getElementById('lyft-web-button-parent'),
    queryParams: {
      credits: ''
    },
    theme: 'multicolor large',
  };
  (function(t) {
    var n = this.window,
    e = this.document;
    n.lyftInstanceIndex = n.lyftInstanceIndex || 0;
    var a = t.parentElement,
    c = e.createElement("script");
    c.async = !0, c.onload = function() {
    n.lyftInstanceIndex++;
    var e = t.namespace ? "lyftWebButton" + t.namespace + n.lyftInstanceIndex : "lyftWebButton" + n.lyftInstanceIndex;
    n[e] = n.lyftWebButton, t.objectName = e, n[e].initialize(t)
  }, c.src = t.scriptSrc, a.insertBefore(c, a.childNodes[0])
  }).call(this, OPTIONS);
};
//Display fare estimate to page
//=======================
 setTimeout(displayLyft, 14000);


// ===============  Old Pseudocode Repo  =================

//Grab search items from forms and save a variables
//====================================================

//Use variables in Eventful API 

//AND - Pull AJAX request for nearby events

//AND - Display responses from Eventful in table 

//AND - Save information from table as new variables to use in GoogleMaps API 

//AND - Use new variables in GoogleMaps API 

//Save selected event as a new variable

// construct our URL using location and date from Jquery drop-down menus






//STRETCH GOAL
//Implement Lyft fare estimator


