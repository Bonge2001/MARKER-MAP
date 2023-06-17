// app.js

// Create the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Define a variable to store the markers
var markers = [];

// Load markers from the server if available
fetch('/markers')
  .then(response => response.json())
  .then(data => {
    markers = data;
    markers.forEach(function (markerData) {
      var marker = L.marker(markerData.latlng).addTo(map);
      marker.bindPopup(markerData.note);
      addMarkerEvents(marker);
    });
  })
  .catch(error => {
    console.error('Error retrieving marker data:', error);
  });

// Event listener for clicking on the map
map.on('click', function (e) {
  // Create a new marker at the clicked location
  var marker = L.marker(e.latlng).addTo(map);

  // Create a text box as a popup for the marker
  var notePopup = L.popup({ closeButton: false })
    .setLatLng(e.latlng)
    .setContent(
      '<textarea class="note-textarea" rows="4" cols="30"></textarea><br>' +
      '<button onclick="saveNote()">Save Note</button>' +
      '<button onclick="deleteMarker()">Delete Marker</button>'
    )
    .openOn(map);

  // Add marker events
  addMarkerEvents(marker);

  // Store the marker data
  var markerData = { latlng: e.latlng, notePopup: notePopup };
  markers.push(markerData);
  updateMarkers();
});

// Function to add events to the marker
function addMarkerEvents(marker) {
  marker.on('click', function () {
    marker.openPopup();
  });
}

// Function to save the note
function saveNote() {
  var noteText = document.querySelector('.note-textarea').value;
  var activeMarker = markers[markers.length - 1];
  activeMarker.notePopup.setContent(noteText);
  activeMarker.notePopup.update();
  updateMarkers();
}

// Function to delete the marker
function deleteMarker() {
  var activeMarker = markers.pop();
  map.removeLayer(activeMarker.notePopup);
  map.removeLayer(activeMarker);
  updateMarkers();
}

// Function to update markers on the server
function updateMarkers() {
  fetch('/markers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(markers)
  })
    .then(response => {
      if (response.ok) {
        console.log('Markers updated on the server');
      } else {
        console.error('Error updating markers on the server');
      }
    })
    .catch(error => {
      console.error('Error updating markers on the server:', error);
    });
}
