# Map Marker Application

This is a web application called "GeoMarker" that allows users to interactively mark and take notes on a map. It provides features for searching locations, placing markers on the map, and associating notes with each marker.

## Getting Started

To use this application, follow these steps:

1. Clone the repository or download the source code.
2. Open the `index.html` file in a web browser.

## Features

### Map View

The application displays an interactive map powered by [Leaflet](https://leafletjs.com/), an open-source JavaScript library for mapping.

### Searching for Locations

You can search for a location by entering a place name or address in the search input field. Clicking the "Search" button will trigger a geocoding service to retrieve the coordinates of the searched location. The map view will then be updated to focus on the searched location.

### Placing Markers

Clicking anywhere on the map will place a marker at the clicked location. Each marker represents a specific location and can be customized with an icon.

### Adding Notes to Markers

When you place a marker or click on an existing marker, a popup window will open. This popup allows you to view and add notes associated with the marker. Existing notes are displayed in a list format, and a text input field is provided to add new notes. Clicking the "Add Note" button will append the entered note to the list of existing notes.

### Persistence

All markers and their associated notes are stored in the browser's local storage. This means that your markers and notes will be preserved even if you close the application or refresh the page.

## Customization

You can customize various aspects of the application by modifying the provided CSS and image files. Here are some elements you can customize:

- Map container size and position
- Top dashboard appearance and layout
- Sidebar appearance and content
- Marker icon and shadow images

## Dependencies

The application relies on the following libraries and frameworks:

- [Leaflet](https://leafletjs.com/) - For displaying the interactive map.
- [jQuery](https://jquery.com/) - For simplifying DOM manipulation and AJAX requests.
- [MDBootstrap](https://mdbootstrap.com/) - For CSS styling and components.

Make sure to include the necessary CDN links in the `<head>` section of your HTML file to load these dependencies.

## License

This application is licensed under the MIT License. You can find the details in the [LICENSE](LICENSE) file.

## Acknowledgements

- The map tiles used in this application are provided by [OpenStreetMap](https://www.openstreetmap.org/).
- The marker icons used in this application are from the [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) plugin.
- The marker icon and shadow images are included in the source code.

Feel free to explore and enhance this map marker application to suit your needs. Happy mapping!