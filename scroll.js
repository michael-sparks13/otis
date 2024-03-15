//CREATE VARIABLES FOR MAPLIBRE LAYERS
const lines = "data/forecasts/lines.geojson";
const cones = "data/forecasts/cones.geojson";
const landslides = "data/landslides.geojson";

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
	console.log("windowWidth", windowWidth);
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
	console.log("windowWidth", windowWidth);
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
			"line-width": 4,
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
		//changeMapPosition();
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

function changeMapPosition() {
	let m = document.getElementById("map-container");
	console.log(m);
	m.style.position = "static";
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
		document.querySelector("#placeholder").appendChild(overlay);

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

const lsmap = new maplibregl.Map({
	container: "ls-map",
	style:
		"https://api.maptiler.com/maps/satellite/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setMapCenter(windowWidth),
	zoom: setInitialMapZoom(windowWidth),
});
lsmap.scrollZoom.disable();

//CREATE LANDSLIDES LAYER
function createLandslides() {
	lsmap.on("load", function () {
		lsmap.addSource("landslides", {
			type: "geojson",
			data: "data/landslides.geojson",
		});

		lsmap.addLayer({
			id: "landslides",
			type: "fill",
			source: "landslides",
			paint: {
				"fill-color": "#fff",
			},
		});
	});
}

createLandslides();

let btn = document.querySelector("button");

function lsz() {
	lsmap.flyTo({
		center: [-99.91285749868301, 16.907181458697703],
		zoom: 12,
		speed: 0.8,
		curve: 1,
		pitch: 40,
		easing(t) {
			return t;
		},
	});
}

const lsScroller = scrollama();

lsScroller
	.setup({
		step: ".landslide-section section", // Select your steps
		offset: 0.7,
		debug: false, // Set to true to see debug lines
	})
	.onStepEnter((response) => {
		console.log(response);
		// response = { element, index, direction }
		z(response.index + 1); // Update the map data
	});

const z = (step) => {
	// Logic to update map based on the step
	if (step === 1) {
		lsz();
		return;
	}
};

// Initialize Scrollama
const advisScroller = scrollama();

advisScroller
	.setup({
		step: ".advisory-section section", // Select your steps
		offset: 0.7,
		debug: false, // Set to true to see debug lines
	})
	.onStepEnter((response) => {
		console.log(response);
		// response = { element, index, direction }
		updateMapData(response.index + 1); // Update the map data
	});

// Handle resize
window.addEventListener("resize", advisScroller.resize);


//CREATE VARIABLES FOR SEA SURFACE TEMP ANOMALY IMG LAYER
const sstcoords = [
  //TL -103.073486991, 17.517583078
  //BR -93.428170510, 11.626819321
  [-103.073486991, 17.517583078],
  [-93.42817051, 17.517583078],
  [-93.42817051, 11.626819321],
  [-103.073486991, 11.626819321],
];

const SSTimages = ["oct21anom.png", "oct22anom.png", "oct23anom.png"];




// let mySource = map.getSource("landslides");

// function addSSTimg() {
// 	map.on("load", function () {
// 		map.addSource("image", {
// 			type: "image",
// 			url: `images/${SSTimages[0]}`,
// 			coordinates: sstcoords,
// 		});
// 		map.addLayer({
// 			id: "sstimage",
// 			source: "image",
// 			type: "raster",
// 			paint: {
// 				"raster-opacity": 1,
// 				"raster-fade-duration": 0,
// 			},
// 		});
// 	});
// }

// function updateSST(idx) {
// 	let mySource = map.getSource("image");
// 	console.log("mySource", mySource);

// 	mySource.updateImage({ url: `images/${SSTimages[idx]}` });
// }