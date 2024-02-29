//INITIALIZE MAP
const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=R5Js2wLegZ6GMYd5iN2E",
  center: [-99.86562013617491, 13.867242923198695],
  zoom: 5,
});

//CREATE VARIABLES FOR MAPLIBRE LAYERS
const lines = "data/forecasts/lines.geojson";
const cones = "data/forecasts/cones.geojson";
const landslides = "data/landslides.geojson";

//CREATE SLIDER ELEMENT
function createSliderElement(data) {
  overlay = document.createElement("div");
  overlay.id = "map-overlay";
  overlay.innerHTML =
    '<h2 id="slider-title">5 Day Forecast on 10:00 AM Sun Oct 22</h2><label id="month"></label><input id="slider" type="range" min="0" max="23" step="1" value="0" />';
  document.getElementById("map").appendChild(overlay);

  createFcMap("1");
  updateFcMap(data[0], data[1]);
}

//INVOKE FUNCTIONS
// createFcMap("1");
//createFcMap("2");
createFcMap("5");
createFcMap("9A");
//createLandslides();
//createSliderMap();

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

//UPDATE FC MAP BASED ON SLIDER INPUT
function updateFcMap(lines, cones) {
  document.getElementById("slider").addEventListener("input", (e) => {
    let advisCount = e.target.value;
    console.log("n");

      let advisNum = cones["features"][advisCount]["properties"]["ADVISNUM"];

      let advisDate = cones["features"][advisCount]["properties"]["ADVDATE"];

      console.log("advisDate", advisDate);

      advisDate = advisDate.replace("2023", "");
      advisDate = advisDate.replace("CDT", "");

      let colon = advisDate.indexOf("00");
      //fix this because it grabs "10" unintentionally
      advisDate = advisDate.slice(0, colon) + ":" + advisDate.slice(colon);

      map.setFilter("cones", ["==", "ADVISNUM", advisNum]);
      map.setFilter("lines", ["==", "ADVISNUM", advisNum]);

      document.getElementById(
        "slider-title"
      ).innerText = `5 Day Forecast on ${advisDate}`;
  });
}

// CREATE CONES OF UNCERTAINTY
function createCones(advisNum) {
  map.on("load", function () {
    map.addSource("cones", {
      type: "geojson",
      data: cones,
    });

    map.addLayer({
      id: "cones",
      type: "fill",
      source: "cones",
      paint: {
        "fill-color": "#FF0000",
        "fill-opacity": 0.7,
      },
      filter: ["==", "ADVISNUM", advisNum],
    });
  });
}

// CREATE FORECAST TRACK LINES
function createLines(advisNum) {
  map.on("load", function () {
    map.addSource("lines", {
      type: "geojson",
      data: lines,
    });

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
      filter: ["==", "ADVISNUM", advisNum],
    });
  });
}

//ADD CONES AND LINES TO MAP
function createFcMap(advisNum) {
  createCones(advisNum);
  createLines(advisNum);
}

//update FC map based on slider input
function updateMap() {}

//CREATE LANDSLIDES LAYER
function createLandslides() {
  map.on("load", function () {
    map.addSource("landslides", {
      type: "geojson",
      data: landslides,
    });

    map.addLayer({
      id: "landslides",
      type: "fill",
      source: "landslides",
      paint: {
        "fill-color": "#B22222",
      },
    });
  });
}

//   <!-- //first is 18-e; 2nd is 6hrs later, TS Otis; advis 5 = 24 hrs after first, straight for AC
//   //9A = first as hurricane. 1pm CDT on Tuesday
//   //there were 13 advis btwn first overall and first as hurricane, 10am Sun to 1pm Tues (51 hours)
//   //is this an unusual number? compare to others from that season. maybe hilary in CA -->
//   //when did Otis become a numbered storm?

//ADD SEA SURFACE TEMP ANOMALY LAYER
// map.on("load", function () {
//   map.addSource("image", {
//     type: "image",
//     url: "images/oct23anom.png",
//     coordinates: [
//       //TL -103.073486991, 17.517583078
//       //BR -93.428170510, 11.626819321
//       [-103.073486991, 17.517583078],
//       [-93.42817051, 17.517583078],
//       [-93.42817051, 11.626819321],
//       [-103.073486991, 11.626819321],
//     ],
//   });

//   map.addLayer({
//     id: "sst1",
//     source: "image",
//     type: "raster",
//     paint: {
//       "raster-opacity": 1,
//     },
//   });
// });
