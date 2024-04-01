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

// search for available width property and set as windowWidth
const windowWidth =
	window.innerWidth ||
	document.documentElement.clientWidth ||
	document.body.clientWidth;

	console.log('ww', windowWidth)
// Initialize Scrollama for landslide map
const lsScroller = scrollama();
// Initialize Scrollama for advisory map
const advisScroller = scrollama();
// Initialize Scrollama for slider / best track map
const btScroller = scrollama();


//INITIALIZE ADVISORY MAP
const map = new maplibregl.Map({
	container: "map",
	style:
		"https://api.maptiler.com/maps/landscape/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setMapCenter(windowWidth),
	zoom: setInitialMapZoom(windowWidth),
});

//INITIALIZE ADVISORY MAP
const btmap = new maplibregl.Map({
	container: "bt-map",
	style:
		"https://api.maptiler.com/maps/landscape/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setMapCenter(windowWidth),
	zoom: setInitialMapZoom(windowWidth),
});


//INITIALIZE LANDSLIDES MAP
const lsmap = new maplibregl.Map({
	container: "ls-map",
	style:
		"https://api.maptiler.com/maps/satellite/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setMapCenter(windowWidth),
	zoom: setInitialMapZoom(windowWidth),
});
lsmap.scrollZoom.disable();

// add forecast data to advis map on load
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
			"fill-opacity": 0.8,
		},
		filter: ["==", "ADVISNUM", "1"], //filter for first forecast only on load
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
			"line-width": 2,
		},
		filter: ["==", "ADVISNUM", "1"], //filter for first forecast only on load
	});
});


// Wait until the map is loaded to add the data
btmap.on("load", function () {
	// add the cones data source
	btmap.addSource("cones", {
		type: "geojson",
		data: "data/forecasts/cones.geojson",
	});

	// add the cones layer to map
	btmap.addLayer({
		id: "cones",
		type: "fill",
		source: "cones",
		paint: {
			"fill-color": "#FF0000",
			"fill-opacity": 0.8
		},
		filter: ["==", "ADVISNUM", "1"], //filter for first forecast only on load
	});

	// add the lines data source
	btmap.addSource("lines", {
		type: "geojson",
		data: "data/forecasts/lines.geojson",
	});

	// add the lines layer to map
	btmap.addLayer({
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
		filter: ["==", "ADVISNUM", "1"], //filter for first forecast only on load
	});

	btmap.addSource("best_track", {
		type: "geojson",
		data: "data/best_track/lines.geojson",
	});

	// add the best_track layer to map
	btmap.addLayer({
		id: "best_track",
		type: "line",
		source: "best_track",
		paint: {
			"line-color": [
				"match", //match the color scale: https://en.wikipedia.org/wiki/Template:Storm_colour
				["get", "SS"],
				0,
				"#4DFFFF", // coral blue
				1,
				"#FFFFD9", //sand
				2,
				"#FFD98C", //light orange
				3,
				"#FF9E59", //orange
				4,
				"#FF738A", //salmon
				5,
				"#A188FC", //purple
				"rgb(255,255,255)", // Default color
			],
			"line-width": 8,
		},
	});

	btmap.addLayer({
		id: "strength-labels",
		type: "symbol",
		source: "best_track",
		layout: {
			"text-field": ["get", "LABEL"], // Use the LABEL property for text
			"text-size": 16,
			"text-offset": [0.5,-2], // Adjust as needed
			"text-anchor": "top",
		},
		paint: {
			"text-color": "black", // Change label color as desired
		},
	});
});

//CREATE LANDSLIDES LAYER
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
			"fill-color": "red",
			"fill-outline-color": "red",
		},
	});

	lsmap.addLayer({
		id: "landslides-outline",
		type: "line",
		source: "landslides",
		paint: {
			"line-color": "red",
			"line-width": 1
		},
	});
});


//BEGIN FUNCTIONS SECTION
function setMapCenter(windowWidth) {
	// create variable for map center
	let mapCenter;
	// test for various browser widths
	if (windowWidth < 500) {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	} else {
		mapCenter = [-99.86562013617491, 14.867242923198695];
	}
	return mapCenter;
} //end setMapCenter

function setInitialMapZoom(windowWidth) {
	// create variable for map zoom level
	let mapZoom;
	// test for various browser widths
	if (windowWidth < 500) {
		mapZoom = 5;
	} else {
		mapZoom = 6;
	}
	return mapZoom;
} //end setInitialMapZoom


//advis functions
advisScroller
	.setup({
		step: ".advisory-section section", // Select triggers steps
		offset: 0.8,
		debug: false,
	})
	.onStepEnter((response) => {
		// response = { element, index, direction }
		updateMapData(response.index + 1); // Update the map data
	});

// Handle resize
window.addEventListener("resize", advisScroller.resize);

// Function to update advisory map data on scroll
const updateMapData = (step) => {
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

function filterForecast(advisNum) {
	map.setFilter("cones", ["==", "ADVISNUM", advisNum]);
	map.setFilter("lines", ["==", "ADVISNUM", advisNum]);
}

//slider map functions
function createSliderMap() {
	Promise.all([
		fetch("data/forecasts/lines.geojson"),
		fetch("data/forecasts/cones.geojson"),
	])
		.then((responses) => {
			return Promise.all(
				responses.map((response) => {
					return response.json();
				})
			);
		})
		.then((data) => {
			createSliderElement(data);
		})
		.catch((error) => {
			console.error("Something went wrong:", error);
		});
}

function createSliderElement(data) {

		overlay = document.getElementById("bt2");
		overlay.innerHTML =
			'<h2 id="slider-title">Forecast on 10:00 AM Sun Oct 22</h2><label id="month"></label><input id="slider" type="range" min="0" max="23" step="1" value="0" />';
			overlay.style.opacity = 0.8
		updateFcMap(data[0], data[1]);
	
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
		btmap.setFilter("cones", ["==", "ADVISNUM", advisNum]);
		btmap.setFilter("lines", ["==", "ADVISNUM", advisNum]);

		document.getElementById(
			"slider-title"
		).innerText = `Forecast on ${advisDate}`;
	});
}


function landslideZoom() {
	lsmap.flyTo({
		center: [-99.91285749868301, 16.907181458697703],
		zoom: 12,
		speed: 2,
		curve: 1,
		pitch: 40,
		easing(t) {
			return t;
		},
	});
}

lsScroller
	.setup({
		step: ".landslide-section section", // Select your steps
		offset: 0.7,
		debug: false, // Set to true to see debug lines
	})
	.onStepEnter((response) => {
		// response = { element, index, direction }
		landslideScroll(response.index + 1); // Update the map data
	});

const landslideScroll = (step) => {
	// Logic to update map based on the step
	if (step === 1) {
		landslideZoom();
		return;
	}
};

// Handle resize
window.addEventListener("resize", lsScroller.resize);

btScroller
	.setup({
		step: ".bt-section section", // Select your steps
		offset: 0.7,
		debug: false, // Set to true to see debug lines
	})
	.onStepEnter((response) => {
		// response = { element, index, direction }
		btScroll(response.index + 1); // Update the map data
	});

	// Handle resize
window.addEventListener("resize", btScroller.resize);

const btScroll = (step) => {
	// Logic to update map based on the step
	if (step === 1) {
		createSliderMap();
		return;
	}
};

