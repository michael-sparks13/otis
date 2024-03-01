// Initialize the map using MapLibre
const map = new maplibregl.Map({
  container: 'map', // container ID
  style:
    'https://api.maptiler.com/maps/streets/style.json?key=R5Js2wLegZ6GMYd5iN2E',
  center: [-99.86562013617491, 13.867242923198695],
  zoom: 5,
});

// Wait until the map is loaded to add the data
map.on('load', function () {
  // add the cones data source
  map.addSource('cones', {
    type: 'geojson',
    data: 'data/forecasts/cones.geojson',
  });

  // add the cones layer to map
  map.addLayer({
    id: 'cones',
    type: 'fill',
    source: 'cones',
    paint: {
      'fill-color': '#FF0000',
      'fill-opacity': 0.7,
    },
    filter: ['==', 'ADVISNUM', '1'],
  });

  // add the lines data source
  map.addSource('lines', {
    type: 'geojson',
    data: 'data/forecasts/lines.geojson',
  });

  // add the lines layer to map
  map.addLayer({
    id: 'lines',
    type: 'line',
    source: 'lines',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#888',
      'line-width': 8,
    },
    filter: ['==', 'ADVISNUM', '1'],
  });
});

// Function to update map data
const updateMapData = (step) => {
  // Logic to update map based on the step
  console.log(`Updating map data for step ${step}`);
  map.setFilter('cones', ['==', 'ADVISNUM', step.toString()]);
  map.setFilter('lines', ['==', 'ADVISNUM', step.toString()]);
};

// Initialize Scrollama
const scroller = scrollama();

scroller
  .setup({
    step: '.scroll-text section', // Select your steps
    offset: 0.5, // Trigger at halfway point of the viewport
    debug: false, // Set to true to see debug lines
  })
  .onStepEnter((response) => {
    // response = { element, index, direction }
    updateMapData(response.index + 1); // Update the map data
  });

// Handle resize
window.addEventListener('resize', scroller.resize);
