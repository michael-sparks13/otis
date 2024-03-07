
// Wait until the map is loaded to add the data
map.on("load", function () {
  // add the cones data source
  map.addSource("cones", {
    type: "geojson",
    data: "data/forecasts/cones.geojson",
  });

  // add the cones layer to map
  map.addLayer({
    id: "cones",
    type: "fill",
    source: "cones",
    paint: {
      "fill-color": "#FF0000",
      "fill-opacity": 0.7,
    },
    filter: ["==", "ADVISNUM", "1"],
  });

  // add the lines data source
  map.addSource("lines", {
    type: "geojson",
    data: "data/forecasts/lines.geojson",
  });

  // add the lines layer to map
  map.addLayer({
    id: "lines",
    type: "line",
    source: "lines",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 8,
    },
    filter: ["==", "ADVISNUM", "1"],
  });
});



// Function to update map data
const updateMapData = (step) => {
  // Logic to update map based on the step
  if (step === 1) {
    map.setFilter("cones", ["==", "ADVISNUM", "1"]);
    map.setFilter("lines", ["==", "ADVISNUM", "1"]);
    return;
  } else if (step === 2) {
    map.setFilter("cones", ["==", "ADVISNUM", "2"]);
    map.setFilter("lines", ["==", "ADVISNUM", "2"]);
    return;
  } else if (step === 3) {
    map.setFilter("cones", ["==", "ADVISNUM", "5"]);
    map.setFilter("lines", ["==", "ADVISNUM", "5"]);
    return;
  } else if (step === 4) {
    map.setFilter("cones", ["==", "ADVISNUM", "9A"]);
    map.setFilter("lines", ["==", "ADVISNUM", "9A"]);
    return;
    
  }
};


// Initialize Scrollama
const scroller = scrollama();

scroller
  .setup({
    step: ".scroll-text section", // Select your steps
    offset: 0.5, // Trigger at halfway point of the viewport
    debug: false, // Set to true to see debug lines
  })
  .onStepEnter((response) => {
    console.log(response);
    // response = { element, index, direction }
    updateMapData(response.index + 1); // Update the map data
  });

// Handle resize
window.addEventListener("resize", scroller.resize);
