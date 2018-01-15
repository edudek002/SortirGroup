//PSUEDOCODE
//=========================

//Grab search items from forms and save a variables
//=========================

//Use variables in Eventful API and pull AJAX request for nearby events
//=========================

//Display responses from Eventful in table
//=========================

//Save information from table as new variables to use in GoogleMaps API
//=========================

//Use new variables in GoogleMaps API and pull AJAX request
//=========================

//Display results on GoogleMap display (including current location)
//=========================

//STRETCH GOAL
//Implement Lyft fare estimator
//=========================

//Save selected event as a new variable
//=========================

//Use variable in Lyft API and pull AJAX request
//=========================
var eventLat = 44.9735
var eventLong = 93.2575
// var pickUp = 

function displayLyft(){
	console.log("Display Lyft Function running");
  var OPTIONS = {
    scriptSrc: 'assets/lyft/dist/lyftWebButton.min.js',
    namespace: '',
    clientId: 'ttOsHDUkxRyS',
    clientToken: 'mTjSJFlEwRRmoMVo/loVl70RVsu/m2fkSlb6aeFp94q9ovNq9FRkTttsluEbv6Fv35Q2pSH41W/MjK8GG8iutze2x5MMB8+YPHXHr9Yief/gzJQN8kdXcHA=',
    location: {
      pickup: {}, 
      destination: {
        latitude: eventLat,
        longitude: eventLong,
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
displayLyft();





