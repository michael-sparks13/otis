

const windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;




//INITIALIZE MAP
const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/landscape/style.json?key=R5Js2wLegZ6GMYd5iN2E",
  center: setMapCenter(windowWidth),
  zoom: setInitialMapZoom(windowWidth),
});

function setMapCenter(windowWidth) {
  console.log('windowWidth', windowWidth)
  // create variable for map center
  let mapCenter;
  // test for various browser widths
  if (windowWidth < 500) {
    mapCenter = [-99.86562013617491, 14.867242923198695];
  } else {
    mapCenter = [-103.86562013617491, 14.867242923198695];
  }
  return mapCenter;
} //end setMapCenter

function setInitialMapZoom(windowWidth) {
  console.log('windowWidth', windowWidth)
  // create variable for map zoom level
  let mapZoom;
  // test for various browser widths
  if (windowWidth < 500) {
    mapZoom = 5;
  } else {
    mapZoom = 5.5;
  }
  return mapZoom;
} //end setInitialMapZoom


//CREATE VARIABLES FOR MAPLIBRE LAYERS
const lines = "data/forecasts/lines.geojson";
const cones = "data/forecasts/cones.geojson";
const landslides = "data/landslides.geojson";

//CREATE VARIABLES FOR SEA SURFACE TEMP ANOMALY IMG LAYER
const sstcoords = [
  //TL -103.073486991, 17.517583078
  //BR -93.428170510, 11.626819321
  [-103.073486991, 17.517583078],
  [-93.42817051, 17.517583078],
  [-93.42817051, 11.626819321],
  [-103.073486991, 11.626819321],
];

//CREATE SLIDER ELEMENT
function createSliderElement(data) {
  let overlay = document.createElement("div");
  overlay.id = "map-overlay";
  overlay.innerHTML =
    '<h2 id="slider-title">5 Day Forecast on 10:00 AM Sun Oct 22</h2><label id="month"></label><input id="slider" type="range" min="0" max="23" step="1" value="0" />';
  document.getElementById("map").appendChild(overlay);

  //createFcMap("1");
  //updateFcMap(data[0], data[1]);
}


// CREATE CONES OF UNCERTAINTY
function createCones(advisNum) {
  console.log('cones created')
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
  console.log('fc map created')
  createCones(advisNum);
  createLines(advisNum);
}



//   <!-- //first is 18-e; 2nd is 6hrs later, TS Otis; advis 5 = 24 hrs after first, straight for AC
//   //9A = first as hurricane. 1pm CDT on Tuesday
//   //there were 13 advis btwn first overall and first as hurricane, 10am Sun to 1pm Tues (51 hours)
//   //is this an unusual number? compare to others from that season. maybe hilary in CA -->
//   //when did Otis become a numbered storm?

//ADD SEA SURFACE TEMP ANOMALY LAYER

//addSSTimg();
//updateSST(2);

const SSTimages = [
  "oct21anom.png",
  "oct22anom.png",
  "oct23anom.png",
];

let mySource = map.getSource("landslides");

function addSSTimg() {
  map.on("load", function () {
    map.addSource("image", {
      type: "image",
      url: `images/${SSTimages[0]}`,
      coordinates: sstcoords,
    });
    map.addLayer({
      id: "sstimage",
      source: "image",
      type: "raster",
      paint: {
        "raster-opacity": 1,
        "raster-fade-duration": 0,

      },
    });
  });
}

function updateSST(idx) {
  let mySource = map.getSource("image");
  console.log("mySource", mySource);

  mySource.updateImage({ url: `images/${SSTimages[idx]}` });
}