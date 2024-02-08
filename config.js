var config = {
  style: "mapbox://styles/michaelsparks13/clm3m8d79024l01qifs1af524",
  accessToken:
    "pk.eyJ1IjoibWljaGFlbHNwYXJrczEzIiwiYSI6ImNsMmRoczNjMDAwMWkzYm10dzRyb3gxenQifQ.56aTkg40fV3OsQibg27VEA",
  showMarkers: false,
  markerColor: "#3FB1CE",
  //projection: 'equirectangular',
  //Read more about available projections here
  //https://docs.mapbox.com/mapbox-gl-js/example/projections/
  inset: false,
  theme: "dark",
  use3dTerrain: false, //set true for enabling 3D maps.
  auto: false,
  title: "Otis' Sudden Fury",
  subtitle:
    "Otis transformed from an unremarkable storm into a devastating category five hurricane in a matter of hours, catching Acacpulco's resisdents off guard",
  byline: "By Michael Sparks",
  footer:
    'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
  chapters: [
    {
      id: "slug-style-id",
      alignment: "left",
      hidden: false,
      title: "Display Title",
      image: "https://www-it.fmi.uni-sofia.bg/courses/maten/module1/image1.gif",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      location: {
        center: [-99.860125400525816, 16.877427780382117],
        zoom: 6,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "points",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
            layer: 'points',
            opacity: 0
        }
      ],
    },
    {
      id: "second-identifier",
      alignment: "right",
      hidden: false,
      title: "Second Title",
      image: "./path/to/image/source.png",
      description: "Copy these sections to add to your story.",
      location: {
        center: [-99.860125400525816, 16.877427780382117],
        zoom: 6,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [
        {
          layer: "points",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
            layer: 'points',
            opacity: 0
        }
      ],
    },
    {
      id: "third-identifier",
      alignment: "left",
      hidden: false,
      title: "Third Title",
      image: "./path/to/image/source.png",
      description: "Copy these sections to add to your story.",
      location: {
        center: [6.15116, 46.20595],
        zoom: 12.52,
        pitch: 8.01,
        bearing: 0.0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "fourth-chapter",
      alignment: "fully",
      hidden: false,
      title: "Third Title",
      image: "./path/to/image/source.png",
      description: "Copy these sections to add to your story.",
      location: {
        center: [-58.54195, -34.716],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
};
