/* globals google */

(function () {
  'use strict';

  var capitals = [
    'Sofia',
    'London',
    'Paris',
    'Berlin',
    'Madrid'
  ];

  var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('component_wrapper'), mapOptions);

    var capitalListEl = document.createElement('ul');
    capitalListEl.id = 'capital_list';

    capitals.forEach(function (capital) {
      var capitalEl = document.createElement('li');
      capitalEl.textContent = capital;
      capitalListEl.appendChild(capitalEl);
    });

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(capitalListEl);

    showCapital(capitals[0]);
  }

  function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        new google.maps.InfoWindow({
          content: '<iframe src=http://en.m.wikipedia.org/wiki/' + address + '></iframe>'
        }).open(map, marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function showCapital(capital) {
    codeAddress(capital);
  }

  google.maps.event.addDomListener(window, 'load', initialize);
  google.maps.event.addDomListener(document, 'click', function (event) {
    var isCapitalElement = event.target.tagName.toLowerCase() === 'li' &&
      event.target.parentElement && event.target.parentElement.id === 'capital_list';

    if (!isCapitalElement) {
      return;
    }

    showCapital(event.target.textContent);
  });
})();
