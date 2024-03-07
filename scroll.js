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
    filterForecast("1");
    return;
  } else if (step === 2) {
    filterForecast("2");
    return;
  } else if (step === 3) {
    filterForecast("5");
    return;
  } else if (step === 4) {
    filterForecast("9A");
    return;
  } else if (step === 5) {
    createSliderMap();
    return;
  }
};

function createSliderMap() {
  Promise.all([fetch(lines), fetch(cones)])
    .then((responses) => {
      return Promise.all(
        responses.map((response) => {
          return response.json();
        })
      );
    })
    .then((data) => {
      console.log(data); // An array of results.
      createSliderElement(data);
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

function createSliderElement(data) {
  let i = document.getElementById("map-overlay");
  if (i) {
    i.remove();
  } else {
    overlay = document.createElement("div");
    overlay.id = "map-overlay";
    overlay.innerHTML =
      '<h2 id="slider-title">5 Day Forecast on 10:00 AM Sun Oct 22</h2><label id="month"></label><input id="slider" type="range" min="0" max="23" step="1" value="0" />';
    document.getElementById("map").appendChild(overlay);

    createFcMap("1");
    updateFcMap(data[0], data[1]);
  }
}

function filterForecast(advisNum) {
  map.setFilter("cones", ["==", "ADVISNUM", advisNum]);
  map.setFilter("lines", ["==", "ADVISNUM", advisNum]);
}

//UPDATE FC MAP BASED ON SLIDER INPUT
function updateFcMap(lines, cones) {
  document.getElementById("slider").addEventListener("input", (e) => {
    let advisCount = e.target.value;

    //grab advisory number and corresponding date
    let advisNum = cones["features"][advisCount]["properties"]["ADVISNUM"];
    let advisDate = cones["features"][advisCount]["properties"]["ADVDATE"];

    //format date
    advisDate = advisDate.replace("2023", "");
    advisDate = advisDate.replace("CDT", "");
    let doubleZero = advisDate.lastIndexOf("00");
    advisDate =
      advisDate.slice(0, doubleZero) + ":" + advisDate.slice(doubleZero);

    //filter by advisory number
    map.setFilter("cones", ["==", "ADVISNUM", advisNum]);
    map.setFilter("lines", ["==", "ADVISNUM", advisNum]);

    document.getElementById(
      "slider-title"
    ).innerText = `5 Day Forecast on ${advisDate}`;
  });
}

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
