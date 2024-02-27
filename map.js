//   const slider = document.getElementById("slider");
//   //let advisNum = "1";

const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=R5Js2wLegZ6GMYd5iN2E",
  center: [-99.86562013617491, 13.867242923198695],
  zoom: 5,
});

//   //   function createSlider() {
//   //     overlay = document.createElement('div');
//   //     overlay.setAttribute("id", "map-overlay");
//   //     overlay.innerHTML = '<h2 id="slider-title">5 Day Forecast on 10:00 AM Sun Oct 22</h2><label id="month"></label><input id="slider" type="range" min="0" max="23" step="1" value="0" />';
//   //   }

//   function createOverallFcMap() {
//     fetch("data/forecasts/cones.geojson")
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (cones) {
//         createForecastSliderMap(cones);

//         return fetch("data/forecasts/lines.geojson");
//       })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (lines) {
//         createLinesMap(lines);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     function createLinesMap(lines) {
//       map.addSource("lines", {
//         type: "geojson",
//         data: lines,
//       });

//       map.addLayer({
//         id: "lines",
//         type: "line",
//         source: "lines",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#888",
//           "line-width": 8,
//         },
//         filter: ["==", "ADVISNUM", "1"],
//       });
//     }

//     //need to add forecast line to go with cone of uncertainty
//     function createForecastSliderMap(cones) {
//       map.addSource("cones", {
//         type: "geojson",
//         data: cones,
//       });

//       map.addLayer({
//         id: "cones",
//         type: "fill",
//         source: "cones",
//         paint: {
//           "fill-color": "#FF0000",
//           "fill-opacity": 0.7,
//         },
//         filter: ["==", "ADVISNUM", "1"],
//       });

//       slider.addEventListener("input", (e) => {
//         let advisCount = e.target.value;
//         let advisNum =
//           cones["features"][advisCount]["properties"]["ADVISNUM"];
//         let advisDate =
//           cones["features"][advisCount]["properties"]["ADVDATE"];
//         advisDate = advisDate.replace("2023", "");
//         advisDate = advisDate.replace("CDT", "");
//         let colon = advisDate.indexOf("00");
//         //fix this because it grabs "10" unintentionally
//         advisDate =
//           advisDate.slice(0, colon) + ":" + advisDate.slice(colon);

//         map.setFilter("cones", ["==", "ADVISNUM", advisNum]);
//         map.setFilter("lines", ["==", "ADVISNUM", advisNum]);

//         document.getElementById(
//           "slider-title"
//         ).innerText = `5 Day Forecast on ${advisDate}`;
//       });
//     }
//   }

//   map.on("load", function () {
//     // createOverallFcMap();
//     //createDayOne();
//     //createLandslides();
//     //createSlider();
//     createAdvisNineA();
//   });

//   function createLandslides() {
//     fetch("data/landslides.geojson")
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (landslides) {
//         createLandslidesMap(landslides);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     function createLandslidesMap(landslides) {
//       map.addSource("landslides", {
//         type: "geojson",
//         data: landslides,
//       });

//       map.addLayer({
//         id: "landslides",
//         type: "fill",
//         source: "landslides",
//         paint: {
//           "fill-color": "#B22222",
//         },
//       });
//     }
//   }

//   function createAdvisOne() {
//     fetch("data/forecasts/cones.geojson")
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (cones) {
//         createConeMap(cones);

//         return fetch("data/forecasts/lines.geojson");
//       })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (lines) {
//         createLineMap(lines);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     function createLineMap(lines) {
//       map.addSource("lines", {
//         type: "geojson",
//         data: lines,
//       });

//       map.addLayer({
//         id: "lines",
//         type: "line",
//         source: "lines",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#888",
//           "line-width": 8,
//         },
//         filter: ["==", "ADVISNUM", "1"],
//       });
//     }

//     function createConeMap(cones) {
//       map.addSource("cones", {
//         type: "geojson",
//         data: cones,
//       });

//       map.addLayer({
//         id: "cones",
//         type: "fill",
//         source: "cones",
//         paint: {
//           "fill-color": "#FF0000",
//           "fill-opacity": 0.7,
//         },
//         filter: ["==", "ADVISNUM", "1"],
//       });
//     }
//   }

//   function createAdvisTwo() {
//     fetch("data/forecasts/cones.geojson")
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (cones) {
//         createConeMap(cones);

//         return fetch("data/forecasts/lines.geojson");
//       })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (lines) {
//         createLineMap(lines);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     function createLineMap(lines) {
//       map.addSource("lines", {
//         type: "geojson",
//         data: lines,
//       });

//       map.addLayer({
//         id: "lines",
//         type: "line",
//         source: "lines",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#888",
//           "line-width": 8,
//         },
//         filter: ["==", "ADVISNUM", "2"],
//       });
//     }

//     function createConeMap(cones) {
//       map.addSource("cones", {
//         type: "geojson",
//         data: cones,
//       });

//       map.addLayer({
//         id: "cones",
//         type: "fill",
//         source: "cones",
//         paint: {
//           "fill-color": "#FF0000",
//           "fill-opacity": 0.7,
//         },
//         filter: ["==", "ADVISNUM", "2"],
//       });
//     }
//   }

//   function createAdvisFive() {
//     fetch("data/forecasts/cones.geojson")
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (cones) {
//         createConeMap(cones);

//         return fetch("data/forecasts/lines.geojson");
//       })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (lines) {
//         createLineMap(lines);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     function createLineMap(lines) {
//       map.addSource("lines", {
//         type: "geojson",
//         data: lines,
//       });

//       map.addLayer({
//         id: "lines",
//         type: "line",
//         source: "lines",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#888",
//           "line-width": 8,
//         },
//         filter: ["==", "ADVISNUM", "5"],
//       });
//     }

//     function createConeMap(cones) {
//       map.addSource("cones", {
//         type: "geojson",
//         data: cones,
//       });

//       map.addLayer({
//         id: "cones",
//         type: "fill",
//         source: "cones",
//         paint: {
//           "fill-color": "#FF0000",
//           "fill-opacity": 0.7,
//         },
//         filter: ["==", "ADVISNUM", "5"],
//       });
//     }
//   }

//   function createAdvisNineA() {
//     fetch("data/forecasts/cones.geojson")
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (cones) {
//         createConeMap(cones);

//         return fetch("data/forecasts/lines.geojson");
//       })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (lines) {
//         createLineMap(lines);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     function createLineMap(lines) {
//       map.addSource("lines", {
//         type: "geojson",
//         data: lines,
//       });

//       map.addLayer({
//         id: "lines",
//         type: "line",
//         source: "lines",
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#888",
//           "line-width": 8,
//         },
//         filter: ["==", "ADVISNUM", "9A"],
//       });
//     }

//     function createConeMap(cones) {
//       map.addSource("cones", {
//         type: "geojson",
//         data: cones,
//       });

//       map.addLayer({
//         id: "cones",
//         type: "fill",
//         source: "cones",
//         paint: {
//           "fill-color": "#FF0000",
//           "fill-opacity": 0.7,
//         },
//         filter: ["==", "ADVISNUM", "9A"],
//       });
//     }
//   } -->

//   <!-- //first is 18-e; 2nd is 6hrs later, TS Otis; advis 5 = 24 hrs after first, straight for AC
//   //9A = first as hurricane. 1pm CDT on Tuesday
//   //there were 13 advis btwn first overall and first as hurricane, 10am Sun to 1pm Tues (51 hours)
//   //is this an unusual number? compare to others from that season. maybe hilary in CA -->
//   //when did Otis become a numbered storm?

map.on("load", function () {
  map.addSource("image", {
    type: "image",
    url: "images/oct23anom.png",
    coordinates: [
      //TL -103.073486991, 17.517583078
      //BR -93.428170510, 11.626819321
      [-103.073486991, 17.517583078],
      [-93.42817051, 17.517583078],
      [-93.42817051, 11.626819321],
      [-103.073486991, 11.626819321],
    ],
  });

  map.addLayer({
    id: "sst1",
    source: "image",
    type: "raster",
    paint: {
      "raster-opacity": 1,
    },
  });
});
