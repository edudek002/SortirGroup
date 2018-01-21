//PSUEDOCODE
//=========================

//===================EDYTA==========================

//Global variables - Edyta

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


//Grab search items from forms and save a variables
//====================================================

//Use variables in Eventful API 

//AND - Pull AJAX request for nearby events

//AND - Display responses from Eventful in table 

//AND - Save information from table as new variables to use in GoogleMaps API 

//AND - Use new variables in GoogleMaps API 

//====================================================
//Use lodash for error handling
function parseLodash(str){
  return _.attempt(JSON.parse.bind(null, str));
}

// click function for AJAX Call
$("#find-event").on("click", function(event) {

  // prevent event default behavior
  event.preventDefault();

  //wait x seconds until the data from Ajax loads and then show the map

  setTimeout(initMap, 4000);
 

  // store search input in variable
  var location = $("#location-input").val();

  var date = $("#date-input").val();

  //check if the date uploads correctly

  //alert(date);

  // construct our URL using location and date from Jquery drop-down menus

  $(document).ready(function() {
    $('select').material_select();
  });

  var queryURL = "https://cors-anywhere.herokuapp.com/api.eventful.com/json/events/search?app_key=54CPdHQQ4wTp4fM7&location=" + location+ "&date="+ date + "&limit=10";

  // queryURL using $ajax

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    for (var i=0; i<3; i++){

      console.log(JSON.parse(response));
      
      //Find Longitude and Latitude of the event

      eventLat[i] = parseLodash(response).events.event[i].latitude;
      console.log("Lat of event " + [i+1] + " = " + eventLat[i]);
      eventLat.push(eventLat[i]);

      eventLng[i] = parseLodash(response).events.event[i].longitude;
      console.log("Lng of event " + [i+1] + " = " + eventLng[i]);
      eventLng.push(eventLng[i]);


      //Print the Date of the the event 

      dateSelector[i] = parseLodash(response).events.event[i].start_time;

      $("#eventDate").text(dateSelector[i]);

      //Print URL of the event

      moreInfo[i]= parseLodash(response).events.event[i].venue_url;

      $("#moreInfo").text(moreInfo[i]);

      //Print the Name of the event

      eventName[i]= parseLodash(response).events.event[i].title;

      $("#eventName").text(eventName[i]);

    }

  });

  //print arrays of Lattitude and Longitude

  console.log("Latitude array = " + eventLat);
  console.log("Longitude array = " + eventLng);

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

    $("#myLat").html(myLat);
    $("#myLng").html(myLng);
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

  }
   
}

//Checking if information from the maps is available after x seconds 

function getMapCoor() {
  console.log("Event 1 lattitude = " + eventLat[0]);
  console.log("Event 1 longitude = " + eventLng[0]);
  console.log("My latitude = " + myLat);
  console.log("My longitude = " + myLng);
  }

setTimeout(getMapCoor, 10000);

//STRETCH GOAL
//Implement Lyft fare estimator
//=========================

//Save selected event as a new variable
//=========================

//Use variable in Lyft API and pull AJAX request
//=========================DANI======================

//Global variables from Dani


//eventLat[0] = 44.9735; //- GoogleMap finds location of the event above using an array = eventLat[]
//eventLng[0] = -93.2575; //- GoogleMap finds location of the event above using an array = myLat[]
//myLat = 44.973990; //- GoogleMap finds My location above using the same variables = myLat
//myLng = -93.227729; //- GoogleMap finds My location above using variable = myLng


function displayLyft(){

  //Checking if the information from the Map is used by the function displayLyft

  console.log("Lyft Event 1 lattitude = " + eventLat[0]);
  console.log("Lyft Event 1 longitude = " + eventLng[0]);
  console.log("Lyft My latitude = " + myLat);
  console.log("Lyft My longitude = " + myLng);

	console.log("Display Lyft Function running");
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

 setTimeout(displayLyft, 12000);

 

//Display fare estimate to page
//=======================








