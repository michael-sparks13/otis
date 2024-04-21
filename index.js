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

	
// Initialize Scrollama for landslide map
const lsScroller = scrollama();
// Initialize Scrollama for advisory map
const advisScroller = scrollama();


//INITIALIZE ADVISORY MAP
const map = new maplibregl.Map({
	container: "map",
	style:
		"https://api.maptiler.com/maps/c85cf4b0-3050-41a2-affa-af73c48426ca/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setAdvisCenter(windowWidth),
	zoom: setAdvisZoom(windowWidth),
});



//INITIALIZE ADVISORY MAP
const btmap = new maplibregl.Map({
	container: "bt-map",
	style:
		"https://api.maptiler.com/maps/c85cf4b0-3050-41a2-affa-af73c48426ca/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setBtCenter(windowWidth),
	zoom: setBtZoom(windowWidth),
});


//INITIALIZE LANDSLIDES MAP
const lsmap = new maplibregl.Map({
	container: "ls-map",
	style:
		"https://api.maptiler.com/maps/satellite/style.json?key=R5Js2wLegZ6GMYd5iN2E",
	center: setBtCenter(windowWidth),
	zoom: setBtZoom(windowWidth),
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
			"fill-color": "#fff",
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
			"line-width": 3,
		},
		filter: ["==", "ADVISNUM", "1"], //filter for first forecast only on load
	});
});


// Wait until the map is loaded to add the data
btmap.on("load", function () {

	btmap.addSource("acmx", {
		type: "geojson",
		data: "data/acapulco_label.geojson",
	});

	btmap.addLayer({
		id: "acmx-base",
		type: "circle",
		source: "acmx",
		paint: {
			"circle-color": "black",
			"circle-radius": 10,
		},
	});

	btmap.addLayer({
		id: "acmx-top",
		type: "circle",
		source: "acmx",
		paint: {
			"circle-color": "white",
			"circle-radius": 6,
		},
	});

	btmap.addLayer({
		id: "acmx-labels",
		type: "symbol",
		source: "acmx",
		layout: {
			"text-field": ["get", "name"], 
			"text-size": 14,
			"text-offset": [0.6, -0.6], 
			"text-anchor": "bottom-left",
			"text-font": ["Open Sans Bold"],
		},
		paint: {
			"text-color": "black", 
		},
	});
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
			"fill-color": "#fff",
			"fill-opacity": 0.8,
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
			"line-width": 3,
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
			"text-size": 20,
			"text-offset": [-1.5,-0.5], // Adjust as needed
			"text-anchor": "bottom-left",
		},
		paint: {
			"text-color": "black", // Change label color as desired
		},
	});

});

const lsColor = "#D73328";
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
			"fill-color": lsColor,
			"fill-outline-color": lsColor,
		},
	});

	lsmap.addLayer({
		id: "landslides-outline",
		type: "line",
		source: "landslides",
		paint: {
			"line-color": lsColor,
			"line-width": 5.5,
		},
	});
});

//create slider map after layers loaded
createSliderMap();


function isiPhone() {
	return /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

//BEGIN FUNCTIONS SECTION
function isiPhone() {
	return /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroid() {
	return /Android/.test(navigator.userAgent) && !window.MSStream;
}


function setAdvisZoom(windowWidth) {
	let mapZoom;
	if (isiPhone() | isAndroid()) {
		mapZoom = 6.2;
	} else if (windowWidth > 1500) {
		mapZoom = 5.5;
	} else if (windowWidth > 500) {
		mapZoom = 7;
	} else {
		mapZoom = 8;
	}
	return mapZoom;
}

function setAdvisCenter(windowWidth) {
	let mapCenter;

	if (isiPhone() | isAndroid()) {
		mapCenter = [-98.86562013617491, 11.367242923198695];
	} else if (windowWidth > 1500) {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	} else if (windowWidth > 500) {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	} else {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	}
	return mapCenter;
}

function setBtZoom(windowWidth) {
	let mapZoom;

	if (isiPhone() | isAndroid()) {
		mapZoom = 6;
	} else if (windowWidth > 1500) {
		mapZoom = 5.5;
	} else if (windowWidth > 500) {
		mapZoom = 4;
	} else {
		mapZoom = 8;
	}
		return mapZoom
}


function setBtCenter(windowWidth) {
	let mapCenter;

	if (isiPhone() | isAndroid()) {
		mapCenter = [-97.86562013617491, 11.867242923198695];
	} else if (windowWidth > 1500) {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	} else if (windowWidth > 500) {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	} else {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	}
	return mapCenter;
}

function setMapCenter(windowWidth) {
	// create variable for map center
	let mapCenter;
	// test for various browser widths
	if ((windowWidth < 500) && (isiPhone())) {
		mapCenter = [-99.86562013617491, 13.867242923198695];
	} else {
		mapCenter = [-99.86562013617491, 14.067242923198695];
	}
	return mapCenter;
} //end setMapCenter

function setInitialMapZoom(windowWidth) {
	
	// create variable for map zoom level
	let mapZoom;
	// test for various browser widths
	if (windowWidth < 500 && isiPhone()) {
		mapZoom =8;
	} else if (isiPhone()) {
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
			'<h2 id="slider-title">Forecast on 10:00 AM Sun Oct 22</h2><label id="month"></label><input id="slider" type="range" min="0" max="23" step="1" value="0"/><p><em>compared to actual path and strength category<em></p>';
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
		center: [-99.91285749868301, 16.900181458697703],
		zoom: 13,
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
		offset: 1,
		debug: false, // Set to true to see debug lines
	})
	.onStepEnter((response) => {
		// response = { element, index, direction }
		btScroll(response.index + 1); // Update the map data
	});

	// Handle resize
window.addEventListener("resize", btScroller.resize);

