# Otis
*An exploration of Hurricane Otis, which devastated Acapulco, Mexico in Oct. 2023*

Hurricane Otis made landfall as a Category 5 hurricane near Acapulco, a city of one million people in southwestern Mexico, at 1:25am local time, October 25, 2023. Mere hours before, the storm was an unnamed tropical depression not expected to produce any significant hazard to the city. 

Because the storm intensified so quickly, according to the National Hurricane Center wind speeds increased by 115 mph in 24 hours,Acapulco's residents had minimal time to prepare, much less evacuate. The storm caused catastrophic damage to hundreds of buildings, including over 120 hospitals and medical clinics. Some officials report that Otis caused over $10 billion of damage to the city. 

Most tragically, the officially reported death toll stands at over 50, with at least one news outlet claiming the real toll is higher than 350.

In today's already-warmed climate, storms are not just becoming more intense. They are becoming more intense, **faster**. By using Hurricane Otis as a case study, we can begin to understand why the storm intensified so quickly, what city leaders can do to better prepare, and even how to recover faster. 

 

on oct 24, went from TS to Cat5




## Data


One pro of dealing with a lot of complicated weather data is that there are countless agencies collecting and cleaning this data. Thankfully, I *think* I have much of what I need. At least, I know how to access it, even if it isn't in the exact format I need right now. 

### Archive
[Sea Surface Temp & SST Anamoly](https://podaac.jpl.nasa.gov/dataset/MUR-JPL-L4-GLOB-v4.1#)
- This data is in raster format. Each day's files covers the entire world and, consequently, the files are huge. I'd like to write a script that utilizies the GDAL "clip raster by extent" tool so I can automate this. I could do it manually in QGIS but that isn't as fun. 
- [this](https://mhinfographics.com/2023/01/06/tutorial-visualizing-global-temperature-step-by-step/) might be an interesting way to show it?

>>SST, need to clip raster by extent in QGIS and then color 
>>need to make sure all images have the same scale... is there a way to do this other than checking each layer manually?
>>need to convert to farenheit
>>and then export as rendered image

# Raster Questions
1. can i combine the multiple days into a single raster, even though it covers the same extent? i.e. can you combine rasters on the temporal dimension?
^^ figure that out first
2. create single temp scale:
- find an existing one
- any changes to hue or blend mode etc?


15 days worth of [5 day forecasts](https://www.nhc.noaa.gov/gis/archive_forecast_results.php?id=ep18&year=2023&name=Hurricane%20OTIS)
- This will be great for showing how the forecast changed over time

Satellite imagery (very prelimary, need to look more into)
- https://earthobservatory.nasa.gov/images/151989/hurricane-otis
- nasa video: https://www.nesdis.noaa.gov/news/category-5-hurricane-otis-devastates-acapulco-mexico
- maxar: https://blog.maxar.com/earth-intelligence/2023/notable-2023-events-as-seen-from-space
- https://www.nesdis.noaa.gov/news/hurricane-otis-causes-catastrophic-damage-acapulco-mexico#:~:text=On%20Wednesday%2C%20Oct.,sustained%20winds%20of%20165%20mph.

https://en.wikipedia.org/wiki/Hurricane_Otis

[advisory archive](https://www.nhc.noaa.gov/archive/2023/OTIS.shtml) 
- I plan to use images of the NHC advisories as part of the scrollytelling format. That should be a nice design touch. I'm thinking of them as the "foreground" while the map animates in the background, illuminating whatever the advisory is... advising about. 

[Best Track](https://www.nhc.noaa.gov/gis/archive_besttrack_results.php?id=ep18&year=2023&name=Hurricane%20OTIS)
- a non-finalized map of Otis' path; represents the NHC's best estimate. Finalized best tracks take months to create. Hopefully it will be ready soon.

[Wind Speed](https://www.nhc.noaa.gov/gis/archive_besttrack_results.php?id=ep18&year=2023&name=Hurricane%20OTIS)
- same link as best track; different shapefile

[Open Street Map](https://www.openstreetmap.org/#map=14/16.8503/-99.8516)
- OSM has high coverage of Acapulco. I'd like to try using this to, in whatever way, show a before and after of buildings damaged. The Humanitarian Open Street Map completed a project after Otis, marking which buildings were damaged. That info is available with the feature query tool on the website ([example](https://www.openstreetmap.org/way/1223889847)) so hopefully I can grab it in my own queries, just need to figure that part out. 

- Landslides? 

- combined shapefiles into one geojson using geojson.io
- used QGIS field calculator to create mph

### Next to do 

- [x] format best track & wind speed into geoJson
- [ ] decide how best to format & store the 15 days worth of 5 day forecasts
- [x] write script to clip SST raster data
- [ ] query open street map for damaged building information
- [ ] continue searching for satellite imagery


### Some Notes and Resources

GES DISC Data in Action: What caused Hurricane Otis to intensify so rapidly?
- https://disc.gsfc.nasa.gov/information/data-in-action?title=What%20caused%20Hurricane%20Otis%20to%20intensify%20so%20rapidly%3F&utm_source=newsletter&utm_medium=email&utm_campaign=earthdata-discovery-012024

Acapulco After Hurricane Otis
- https://earthobservatory.nasa.gov/images/152028/acapulco-after-hurricane-otis

https://maps.disasters.nasa.gov/arcgis/apps/MinimalGallery/index.html?appid=e2d12acb9ab24ff1b579eecd2d1d46ca

Acapulco, Mexico 1 Month After Hurricane Otis Destroyed Much of City
https://www.youtube.com/watch?v=7ML1TsPt3mE

2023 Hurricane Season Ends, Marked by Storms That 'Really Rapidly Intensified'	
https://www.nytimes.com/interactive/2023/12/02/us/hurricane-season-2023-rapid-intensification.html

Hurricane Otis Map: Tracking the Storm’s Path Over Mexico - The New York Times
https://www.nytimes.com/interactive/2023/us/otis-map-path-tracker.html

'No Gas, No Water, No Food': Otis Devastates Pacific Coast of Mexico
https://www.nytimes.com/2023/10/26/world/americas/hurricane-otis-mexico.html

Hurricane tracker: Updates on the path of every storm - USA TODAY
https://www.usatoday.com/pages/interactives/storm-tracker/

https://en.wikipedia.org/wiki/Hurricane_Otis	

over 350: https://mexiconewsdaily.com/news/news-outlet-in-acapulco-says-real-hurricane-death-toll-is-over-350/


## Scrollytelling examples
[Sydney Opera House at Rest](https://stories.sydneyoperahouse.com/sydney-opera-house-at-rest/)
[The Lost Tablet](https://www.bbc.co.uk/news/extra/8iaz6xit26/the-lost-tablet-and-the-secret-documents)
[A Voice from Ukraine](https://story.internal-displacement.org/the-road-was-long-a-voice-from-ukraine/index.html)
[Belt and Road Initiative](https://nikkei.shorthandstories.com/road-to-nowhere-china-s-belt-and-road-initiative/)

## Product Documents
https://docs.google.com/document/d/1WaK-PbLPVAWRV1UYZs48VkjoPQ9TkCIjxpP0T2TBLrY/edit?usp=sharing
[Original](/product_docs) ideas and sketches


### Next to do design wise
- [ ] list all design changes to make to mapbox style
- [ ] separate out the css file
- [ ] find drone footage you can acually use
- [ ] use illustrator to make higher fidelity wireframes
- [ ] make sure you can get geojson into template (look at examples)
- [ ] OSM wiki for hospitals and medical buildings
- [ ] make sure all questions for Rich are asked / answered
- [ ] update 

SST 
- raster from nasa
- clip with qgis
- touch up with photoshop
- insert with maplibre


satellite: https://map.openaerialmap.org/#/-99.89593505859375,16.875518705107428,14/square/0233102233130130?_k=zarsyp