// Initialize the map
var map = L.map('map').setView([40.0573, -76.288], 16);

// Add OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data and add features to the map
fetch('grandview_parcels.geojson')
    .then(response => response.json())
    .then(data => {
        // Add polygons to the map
        L.geoJSON(data, {
            style: {
                color: 'blue',
                fillColor: 'lightblue',
                weight: 2
            },
            onEachFeature: function (feature, layer) {
                // Bind a popup with information to each polygon
                layer.bindPopup(
                    "Parcel: " + feature.properties.account + "<br>" +
                    "Address: " + feature.properties.owneradd1 + "<br>" +
                    "City: " + feature.properties.owner_city + "<br>" +
                    "ZIP: " + feature.properties.owner_zip
                );

                // Add click event to each polygon
                layer.on('click', function (event) {
                    // Open the popup on click
                    event.target.openPopup();
                });
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });
