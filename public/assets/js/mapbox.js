$document.ready(()=>{
  mapboxgl.accessToken = 'pk.eyJ1Ijoia2ltamluc3V6IiwiYSI6ImNqc25uYTMzdTAydWIzeXJ1bHRwN2tnbHUifQ.VQGmM5y9FGWEuJBBZFeTpQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-73.98567, 40.758213],
    zoom: 13
  });
  
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  });
  
  map.addControl(geocoder);
  
  // After the map style has loaded on the page, add a source layer and default
  // styling for a single point.
  map.on('load', function () {
    map.addSource('single-point', {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });
  
    map.addLayer({
      "id": "point",
      "source": "single-point",
      "type": "circle",
      "paint": {
        "circle-radius": 10,
        "circle-color": "#007cbf"
      }
    });
  
    // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on('result', function (ev) {
      //create an object to get the results
      let result = ev.result;
  
      console.log(ev.result);
      map.getSource('single-point').setData(ev.result.geometry);
      const placeName = ev.result.place_name;
      const address = ev.result.properties.address;
      const category = ev.result.properties.category;
      const location = ev.result.geometry.coordinates[0] + "-" + ev.result.geometry.coordinates[1];
      const zipcode = ev.result.context[0].text;
      const city = ev.result.context[1].text;
      const state = ev.result.context[2].text;
      const country = ev.result.context[3].text;
      console.log("here we go:");
      console.log(placeName);
      console.log(address);
      console.log(category);
      console.log(location);
      console.log(zipcode);
      console.log(city);
      console.log(state);
      console.log(country);
  
  
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', 'point', function (e) {
        console.log(e)
        e.features[0].properties.description=`<strong>${placeName}</strong><br><p>Leave a review for this place <a href="./places">Leave a review</a></p>`;
  
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
  
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
  
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });
  
  
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'point', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
  
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'point', function () {
        map.getCanvas().style.cursor = '';
      });
    });
  
  });
});