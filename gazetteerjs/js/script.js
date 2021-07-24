let countriesList = document.getElementById('countries')
let countries;
let option = document.createElement("option");
option.innerHtml = "Select a country"
countriesList.appendChild(option);

var border;

var polyStyle = {
    fillColor: '#001d3d',
    fillOpacity: 0.4,
    weight: 1,
    color: 'white',
    opacity: 1
}



let group2 = L.featureGroup()
fetch('https://restcountries.eu/rest/v2/all')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        initialize(data)
    })
    .catch(function (error) {
        throw (error)
    })



// }


$.ajax({
    url: "php/countrySelector.php",
    type: 'POST',
    dataType: 'json',


    success: function (result) {

        //  if (result.status.name == "ok") {


        for (let i = 0; i < result.data.length; i++) {
            $('#countries').append($('<option>', {
                value: result.data[i].code,
                text: result.data[i].name
            }))

        }
        // } 


    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
})

$('#countries').change(function () {
    $.ajax({
        url: "php/borderSelector.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#countries').val(),
        },

        success: function (result) {

            //  if (result.status.name == "ok") {
            console.log(result)

            // console.log(result.data.features[i])
            
            
            let styleBorder = L.geoJSON(result.data, {
                style: polyStyle
            }).addTo(group2)
          //  mymap.addLayer(group2)
            
            mymap.addLayer(group2)
            mymap.fitBounds(styleBorder.getBounds())
            

          /*  let newLayer1 = L.featureGroup();
            L.geoJSON(result.data, {
                style: myStyle
            }).addTo(newLayer1)

            /*
            let border = L.geoJSON(result.data[0], {
                style: myStyle
            }).addTo(newLayer1) 

            if (border.getLayers().length > 0) {
                border.clearLayers()
            }

            // newLayer1.addLayer(chance)
            mymap.addLayer(border)

            //    
            // }


            // } 

                */
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('didnt work')
        }
    })
})




// countriesList.innerHTML = '<option value="Select a country">Select A Country</option>'

let displayCountryInfo = (iso2Code) => {


    let countryData = countries.find(country => country.alpha2Code === iso2Code)
    disease(iso2Code)
    document.getElementById('countryName').innerHTML = countryData.name
    document.querySelector('#flag__container img').alt = `Flag of ${countryData.name}`
    document.getElementById('capital').innerHTML = countryData.capital
    document.getElementById('dialingcode').innerHTML = '+' + countryData.callingCodes[0]
    document.getElementById('population').innerHTML = countryData.population.toLocaleString("en-US")
    document.getElementById('currencies').innerHTML = countryData.currencies.map(currency => `${currency.name} (${currency.symbol})`)
    document.getElementById('region').innerHTML = countryData.region
    document.querySelector('#flag__container img').src = countryData.flag
    document.getElementById('lat').innerText = countryData.latlng[0]
    document.getElementById('long').innerText = countryData.latlng[1]
    mymap.setView([countryData.latlng[0], countryData.latlng[1]], 4)
    document.getElementById('cityWeather').innerHTML = countryData.capital
    document.getElementById('currCode').innerHTML = countryData.currencies[0].code



    document.getElementById('currencyCode').innerHTML = countryData.currencies[0].code
    let countryCode = countryData.currencies.map(currency => currency.code)


    // localNews(countryData.alpha2Code)



    const exchangeRate = (countryCode) => {
        fetch('https://openexchangerates.org/api/latest.json?app_id=ff11d9995b824a64a232e936f69d91f1')
            .then((response) => response.json())
            .then((data) => {
                document.getElementById('code').innerHTML = data.rates[countryCode[0]]

            })
            .catch(function (error) {
                throw (error)
            })
    }
    exchangeRate(countryCode)
    wikipedia(countryData.nativeName)
    forecast(countryData.capital)
    statistics(countryData.name)
    airports(countryData.name)



}



let lat = document.getElementById("lat").textContent;
let long = document.getElementById("long").textContent;






const initialize = (countriesData) => {
    countries = countriesData

}




let popup = L.popup();




// Write function to set Properties of the Popup

var sunShine = L.ExtraMarkers.icon({
    icon: 'fa-sun-o',
    markerColor: 'yellow',
    shape: 'circle',
    prefix: 'fa'
});
var snowFlake = L.ExtraMarkers.icon({
    icon: 'fa-tint',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});
var capitalExtra = L.ExtraMarkers.icon({
    icon: 'fa-university',
    markerColor: 'red',
    shape: 'square',
    prefix: 'fa'
});
var earthQuakeExtra = L.ExtraMarkers.icon({
    icon: 'fa-exclamation-triangle',
    markerColor: 'green',
    shape: 'star',
    prefix: 'fa'
});
var airportExtra = L.ExtraMarkers.icon({
    icon: 'fa-plane',
    markerColor: 'black',
    shape: 'penta',
    prefix: 'fa'
});


let iconImage = {
    iconUrl: 'assets/icon/gold-medal.png',
    iconSize: [30, 30], // width and height of the image in pixels
    shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
}
let capitalImage = {
    iconUrl: 'assets/icon/capital-city.png',
    iconSize: [15, 15], // width and height of the image in pixels
    shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
}
let earthquakeImage = {
    iconUrl: 'assets/icon/earthy.png',
    iconSize: [20, 20], // width and height of the image in pixels
    shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
}



const baseURL = "http://api.openweathermap.org/data/2.5/weather?"
const API_Key = '833d6bab104b69d5f1d4e30dcf52e1cd'

const wikipedia = (countryName) => {
    $.ajax({
        url: "php/wikipedia.php",
        type: 'POST',
        dataType: 'json',
        data: {
            title: countryName.replace(/\s/g, '+'),
        },
        success: function (result) {
            if (result.data[0] !== undefined) {


                $('#textinfo').html(result.data[0].summary);

            } else {
                $('#textinfo').html(`<p>N/A</p>`)
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    })
}


let mymap = L.map('mapid').setView([lat, long], 2);



let basemapone = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

let watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});







let iconImageSnow = {
    iconUrl: 'assets/icon/snowflake.png',
    iconSize: [30, 30], // width and height of the image in pixels
    shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
}


$("round").click(function () {
    $(layer2()).toggle();
});




function earthquakeFeature(feature, layer) {

    layer.bindPopup(`<h3> ${feature.properties.place} </h3><hr><p> ${new Date(feature.properties.time)} </p>`);
}




function olympicFeature(feature, layer) {
    // does this feature have a property named popupContent?

    layer.bindPopup(`City: ${feature.properties.name}` + '</br>' + `Year: ${feature.properties.year}`)



}

function winOlympicFeature(feature, layer) {


    layer.bindPopup(`City: ${feature.properties.name}` + '</br>' + `Year: ${feature.properties.year}`)


}



const forecast = (place) => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=3f35605d09514f429bd191608210906&q=${place}&days=3&aqi=no&alerts=no`)
        .then((response) => response.json())
        .then((data) => {

            document.getElementById('max').innerText = data.forecast.forecastday[0].day.maxtemp_c
            document.getElementById('maxtomorrow').innerText = data.forecast.forecastday[1].day.maxtemp_c
            document.getElementById('max2').innerText = data.forecast.forecastday[2].day.maxtemp_c
            document.getElementById('min').innerText = data.forecast.forecastday[0].day.mintemp_c
            document.getElementById('mintomorrow').innerText = data.forecast.forecastday[1].day.mintemp_c
            document.getElementById('min2').innerText = data.forecast.forecastday[2].day.mintemp_c
            document.getElementById('weather').innerText = data.forecast.forecastday[0].day.condition.text
            document.querySelector('#icon').src = data.forecast.forecastday[0].day.condition.icon
            document.getElementById('weathertomo').innerText = data.forecast.forecastday[1].day.condition.text
            document.querySelector('#icontomo').src = data.forecast.forecastday[1].day.condition.icon
            document.getElementById('weathernext').innerText = data.forecast.forecastday[2].day.condition.text
            document.querySelector('#iconnext').src = data.forecast.forecastday[2].day.condition.icon
            document.getElementById('tomorrowDate').innerText = Date.parse("tomorrow").toString("d-MMM")
            document.getElementById('datDate').innerText = Date.today().add({ days: 2 }).toString("d-MMM")

        })
}

// $('#covidCases').prop('checked', false);

/* function style(feature) {
     return {
         fillColor: 'hidden',
         color: 'black',
         opacity: 0.7
                    }
 } */
$(document).ready(function () {
    $('.accordion > li > .accordion__panel').hide();
    $('.accordion > li').click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").find('.accordion__panel').slideUp();
        } else {
            $(".accordion > li.active .accordion__panel").slideUp();
            $(".accordion > li.active").removeClass("active");

            $(this).addClass("active").find(".accordion__panel").slideDown();
        }
        return false
    })
})

const covidUrl = "https://disease.sh/v3/covid-19/countries"

// Filter Covid data by clicked feature
const disease = (selectedCountryIso) => {
    fetch(covidUrl)
        .then((response) => response.json())
        .then((data) => {



            // let plab = (data.filter(country => country.country === selectedCountry))
            let two = (data.filter(country => country.countryInfo.iso2 === selectedCountryIso))
            let mab = (data.map(country => [country.countryInfo.lat, country.countryInfo.long]))



            document.getElementById('cases').innerHTML = two[0].cases.toLocaleString("en-US")
            document.getElementById('casesPerOneMillion').innerHTML = two[0].casesPerOneMillion.toLocaleString("en-US")
            document.getElementById('deaths').innerHTML = two[0].deaths.toLocaleString("en-US")
            document.getElementById('deathsPerOneMillion').innerHTML = two[0].deathsPerOneMillion.toLocaleString("en-US")
            document.getElementById('recovered').innerHTML = two[0].recovered.toLocaleString("en-US")
            document.getElementById('recoveredPerOneMillion').innerHTML = two[0].recoveredPerOneMillion.toLocaleString("en-US")

        })
}

// Get the geometries data
let group1 = L.featureGroup()
let group3 = L.featureGroup()
let group5 = L.featureGroup()

var circleLayer = {
    "type": "FeatureCollection",
    "features": ''
};

fetch(covidUrl)
    .then((response) => response.json())
    .then((data) => {

        let ty = data.map(country => {
            let lat = country.countryInfo.lat
            let long = country.countryInfo.long
            let c = country.cases

            return {
                "type": "Feature", "geometry": { "type": "Point", "coordinates": [long, lat] }, "properties": { "country": country.country, "cases": c }
            }
            // return [[long,lat],c]





            /* document.getElementById('covidCases').onclick = function () {
   
                   if (!this.checked) {
                       if (mymap.hasLayer(group1)) {
                           mymap.removeLayer(group1)
                       }
   
                   } else {
   
                       mymap.addLayer(group1)
   
                   }
               } */


        })
        circleLayer.features = ty
    })

/*
 const localNews = (countryabbrev) => {

    fetch(`https://newsapi.org/v2/top-headlines?country=${countryabbrev}&apiKey=7c6fadef1bbd4d52837bfe5703166957`)
        .then((response) => response.json())
        .then((data) => {
       

            if (data.totalResults != 0) {
                document.getElementById('headline').innerHTML = data.articles[0].title
                document.querySelector('#news__link').href = data.articles[0].url
                if (data.articles[0].title != null) {
                    document.querySelector('#news__container img').src = data.articles[0].urlToImage
                }
                document.getElementById('headline1').innerHTML = data.articles[1].title
                document.querySelector('#news__link1').href = data.articles[1].url
                if (data.articles[1].urlToImage != null) {
                    document.querySelector('#news__container1 img').src = data.articles[1].urlToImage
                }
                document.getElementById('headline2').innerHTML = data.articles[2].title
                document.querySelector('#news__link2').href = data.articles[2].url
                if (data.articles[2].urlToImage != null) {
                    document.querySelector('#news__container2 img').src = data.articles[2].urlToImage
                }
            }
        })
}

const localNews = (countryabbrev) => {
    $.ajax({
        url: 'php/news.php',
        type: 'POST',
        dataType: 'json',
        data: {
            results: countryabbrev,
        },
        success: function (result) {
            {
                //  if (result.status.name == "ok") {
            

                if (result.data != 0) {
                    document.getElementById('headline').innerHTML = result.data[0].title
                    document.querySelector('#news__link').href = result.data[0].link

                    if (result.data[0].image_url != null) {
                        document.querySelector('#news__container img').src = result.data[0].image_url
                    }
                }
                if (result.data != 0) {
                    document.getElementById('headline1').innerHTML = result.data[1].title
                    document.querySelector('#news__link1').href = result.data[1].link

                    if (result.data[1].image_url != null) {
                        document.querySelector('#news__container1 img').src = result.data[1].image_url
                    }
                }
                if (result.data != 0) {
                    document.getElementById('headline2').innerHTML = result.data[2].title
                    document.querySelector('#news__link2').href = result.data[2].link

                    if (result.data[2].image_url != null) {
                        document.querySelector('#news__container2 img').src = result.data[2].image_url
                    }
                }

                // } 
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('no way')
        }
    })
}


const localNews = (countryabbrev) => {
fetch(`https://newsdata.io/api/1/news?apikey=${newsAPI}&country=${countryabbrev}`)
.then((response) => response.json())
.then((data) => {
console.log('newsAPI', data)
})
} 
function openNav() {
    if (document.getElementById('countries').innerHTML != 'Select A Country') {
        document.getElementById("side__menu").style.width = "100%"

    }

}

function closeNav() {
    document.getElementById("side__menu").style.width = "0"



}
*/
let markers = new L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: false,
    disableClusteringAtZoom: 8,
    showCoverageOnHover: false,
    maxClusterRadius: 40,
    animateAddingMarkers: true,
    iconCreateFunction: cluster => {
        let markers = cluster.getAllChildMarkers();
        let first = iconImage.iconUrl

        let html =
            `<img class="first-icon-cluster" src="${first}"></img><div class="circleGold">${markers.length}</div>`;
        return L.divIcon({
            html: html,
            className: 'mycluster',
            iconSize: L.point(10, 10)
        });
    },
})

let markersSnow = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: false,
    disableClusteringAtZoom: 8,
    showCoverageOnHover: false,
    maxClusterRadius: 70,
    animateAddingMarkers: true,
    iconCreateFunction: cluster => {
        let markers = cluster.getAllChildMarkers();
        let first = ''

        let html =
            `<img class="first-icon-cluster" src="${first}"></img><div class="circleSnow">${markers.length}</div>`;
        return L.divIcon({
            html: html,
            className: 'mycluster',
            iconSize: L.point(10, 10)
        });
    },
});

let markersCapital = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: false,
    disableClusteringAtZoom: 8,
    showCoverageOnHover: false,
    maxClusterRadius: 70,
    animateAddingMarkers: true,
    iconCreateFunction: cluster => {
        let markers = cluster.getAllChildMarkers();
        let first = capitalImage.iconUrl

        let html =
            `<img class="first-icon-cluster" src="${first}"></img><div class="circleCapital">${markers.length}</div>`;
        return L.divIcon({
            html: html,
            className: 'mycluster',
            iconSize: L.point(10, 10)
        });
    },
});
let markersEarthquake = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: false,
    disableClusteringAtZoom: 8,
    showCoverageOnHover: false,
    maxClusterRadius: 70,
    animateAddingMarkers: true,
    iconCreateFunction: cluster => {
        let markers = cluster.getAllChildMarkers();
        let first = ''

        let html =
            `<img class="first-icon-cluster" src="${first}"></img><div class="circleEarthquake">${markers.length}</div>`;
        return L.divIcon({
            html: html,
            className: 'mycluster',
            iconSize: L.point(15, 15)
        });
    },
});

let airportCluster = new L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: false,
    disableClusteringAtZoom: 8,
    showCoverageOnHover: false,
    maxClusterRadius: 40,
    animateAddingMarkers: true,
    iconCreateFunction: cluster => {
        let markers = cluster.getAllChildMarkers();
        let first = ''

        let html =
            `<img class="first-icon-cluster" src="${first}"></img><div class="circleAirport">${markers.length}</div>`;
        return L.divIcon({
            html: html,
            className: 'mycluster',
            iconSize: L.point(10, 10)
        });
    },
})

let countryGeo = $.ajax({
    url: './data/countryBorders.geo.json',
    dataType: "json",
    success: console.log("Country data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
}) 

let pointGeo = $.ajax({
    url: './data/sumOlympics.geo.json',
    dataType: "json",
    success: console.log("Summer data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

let pointGeoSnow = $.ajax({
    url: './data/winOlympics.geo.json',
    dataType: "json",
    success: console.log("Point data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})
let capital = $.ajax({
    url: './data/capitals.geo.json',
    dataType: "json",
    success: console.log("Capital data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

let earthquake = $.ajax({
    url: queryUrl,
    dataType: "json",
    success: function (result) {





    },
    error: function (xhr) {
        alert(xhr.statusText)
    }
})
var airportUrl = 'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'

let airports = (airportCountry) => {
    $.ajax({
        url: airportUrl,
        dataType: "json",
        success: function (result) {

            var array = result
            if (airportCountry === "United States of America") {
                airportCountry = "United States"
            }
            if (airportCountry === 'United Kingdom of Great Britain and Northern Ireland') {
                airportCountry = "United Kingdom"
            }

            for (var i = 0; i < array.length; i++) {

                if (array[i].country === airportCountry) {

                    airportCluster.addLayer(L.marker([array[i].lat, array[i].lon], { icon: airportExtra }).bindPopup(`<h3> ${array[i].name} </h3><hr><p> ${array[i].city} </p>`))



                    group5.addLayer(airportCluster)
                }


            }


        },
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
}
/* -------------------------------------------------------------------------- */
/*                                Main function                               */
/* -------------------------------------------------------------------------- */
$.when(countryGeo, pointGeo, pointGeoSnow, capital, earthquake).done(function () {

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?

        layer.on({
            click: OnClickFeature
        })
        layer.bindPopup(`Country: ${feature.properties.name}`);
    }


    let countrylayer = countryGeo.responseJSON
    let newLayer = null


    let listCount = countrylayer.features.map(a => {
        let prop = a.properties
        let name = prop.name
        let iso = prop.iso_a2

        let opt = `<option value='${iso}'>${name}</option>`
        // let opt = document.createElement('options')
        // opt.innerText = name
        // opt.value = iso

        return opt
    })

    // countriesList.innerHTML = listCount.join("")

    let ff = []

    let covCase = circleLayer
    // Gold points
    let pointlayer = pointGeo.responseJSON
    // Snowlake points
    let pointlayerSnow = pointGeoSnow.responseJSON

    let capitallayer = capital.responseJSON

    let earthquakelayer = earthquake.responseJSON

    //  let airportlayer = airports.responseJSON



    let SplitPoints = (cCode) => {
        let selected = cCode

        group2.clearLayers()


        if (newLayer !== null) {
            mymap.removeLayer(newLayer)
        }

        if (lastClickedLayer !== null) {
            lastClickedLayer.setStyle(polyStyle)

        }

        let IconImage = (feature, latlng) => {
            let myIcon = L.icon(iconImage)

            return L.marker(latlng, {
                icon: sunShine

            })
        }

        let IconImageSnow = (feature, latlng) => {
            let myIcon = L.icon(iconImageSnow)

            return L.marker(latlng, {
                icon: snowFlake
            })
        }

        let CapitalImage = (feature, latlng) => {
            let myIcon = L.icon(capitalImage)

            return L.marker(latlng, {
                icon: capitalExtra

            })
        }
        let EarthquakeImage = (feature, latlng) => {
            //  let myIcon = L.icon(earthquakeImage)

            return L.marker(latlng, {
                icon: earthQuakeExtra

            })
        }

        let AirportImage = (feature, latlng) => {
            let myIcon = L.icon(earthquakeImage)

            return L.marker(latlng, {
                icon: airportExtra

            })
        }




        let pol = L.geoJSON(null, {
            style: polystyle
        })



        pol.addData(selected)


        pol.eachLayer(function (layer) {

            let coords = layer.feature.geometry.coordinates;

            let polygon = null

            if (coords.length > 1) {
                polygon = turf.multiPolygon(coords);
            } else {
                polygon = turf.polygon(coords);
            }

            let polygon2 = L.geoJson(polygon, { color: 'red' });

            let pointWithin1 = turf.within(pointlayer, polygon2.toGeoJSON());
            let pointWithin2 = turf.within(pointlayerSnow, polygon2.toGeoJSON());

            let pointWithin3 = turf.within(capitallayer, polygon2.toGeoJSON());
            let pointWithin4 = turf.within(covCase, polygon2.toGeoJSON());
            let pointWithin5 = turf.within(earthquakelayer, polygon2.toGeoJSON());
            let pointWithin6 = turf.within(group5, polygon2.toGeoJSON());



            // alert("results "+JSON.stringify(ptsWithin4));
            let geojsonPoint = L.geoJson(pointWithin1, {
                pointToLayer: IconImage,
                onEachFeature: olympicFeature,
            })

            let geojsonPointSnow = L.geoJson(pointWithin2, {
                pointToLayer: IconImageSnow,
                onEachFeature: winOlympicFeature
            })

            let geojsonPointCapital = L.geoJson(pointWithin3, {
                pointToLayer: CapitalImage,
                onEachFeature: capitalFeature
            })
            let geojsonPointEarthquake = L.geoJson(pointWithin5, {
                pointToLayer: EarthquakeImage,
                onEachFeature: earthquakeFeature


            })

            let geojsonPointAirport = L.geoJson(pointWithin6, {
                pointToLayer: AirportImage,
                onEachFeature: earthquakeFeature



            })

            let earthCircle = L.geoJSON(pointWithin6, {
                pointToLayer: function (feature, latlng) {

                    return L.circle(latlng, {
                        color: 'blue',
                        fillColor: 'blue',
                        radius: 2000,
                        fillOpacity: 0.5,
                    }).addTo(group5)

                }
            })

            // var geojsonMarkerOptions = 
            // `${Math.sqrt(pointWithin4.features[0].properties.cases * 1500)}`
            // L.circle(pointWithin4).addTo(group1)
            let newCircle = L.geoJSON(pointWithin4, {
                pointToLayer: function (feature, latlng) {

                    return L.circle(latlng, {
                        color: 'red',
                        fillColor: '#f03',
                        radius: `${Math.sqrt(feature.properties.cases * 1500)}`,
                        fillOpacity: 0.5,
                    }).addTo(group1)

                }
            })
            newCircle.on('click', function (e) {
                $('#covidModal').modal('show')
            })

         /*   let styleBorder = L.geoJSON(selected, {
                style: polystyle
            }).addTo(group2)
            mymap.fitBounds(styleBorder.getBounds())

            mymap.addLayer(group2) */

            if (markers.getLayers().length > 0 ||
                markersSnow.getLayers().length > 0 ||
                markersCapital.getLayers().length > 0 ||
                markersEarthquake.getLayers().length ||
                airportCluster.getLayers().length ||
                group1.getLayers().length > 0) {
                markers.clearLayers()
                markersSnow.clearLayers()
                markersCapital.clearLayers()
                group1.clearLayers()
                markersEarthquake.clearLayers()
                airportCluster.clearLayers()
                //  airportCluster.clearLayers()

            }

            markers.addLayer(geojsonPoint)
            markersSnow.addLayer(geojsonPointSnow)
            markersCapital.addLayer(geojsonPointCapital)
            group1.addLayer(newCircle)
            markersEarthquake.addLayer(geojsonPointEarthquake)
            group5.addLayer(geojsonPointAirport)

            //group3.addLayer(geojsonPointEarthquake)

        })
    }
    function polystyle(feature) {
        return {
            weight: 5,
            color: '#fee440',
            dashArray: '',
            fillColor: '#001d3d',
            fillOpacity: 0.4,
            opacity: 1,
    
        }
    
    }
   

    let lastClickedLayer = null
  //  let group2 = L.featureGroup()


    let c = []
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);

        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }



    //    L.marker([51.941196,4.512291], {icon: redMarker}).addTo(mymap);




    function showPosition(position) {

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C%20${position.coords.longitude}&key=9c469bb50ba04e5c8ddfce02fc12a9b8&language=en&pretty=1`)
            .then((response) => response.json())
            .then((data) => {


                $('#countries').val(data.results[0].components.country_code.toUpperCase()).change()
                // let you = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
                // you.bindPopup(`Current Location: ${data.results[0].formatted}`)
                let first = countrylayer.features.filter(place => place.properties.iso_a2 === data.results[0].components.country_code.toUpperCase())
                ff.push(first)
                
                displayCountryInfo(data.results[0].components.country_code.toUpperCase())
                disease(data.results[0].components.country_code.toUpperCase())
                SplitPoints(first)
                airports(data.results[0].components.country)

            })
    }
    getLocation()

    countriesList.addEventListener('change', event => {
        displayCountryInfo(event.target.value)
        let selected = countrylayer.features.filter(place => place.properties.iso_a2 === event.target.value)

        SplitPoints(selected)
    })

})

$(window).load(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});



let x = document.getElementById("demo");



function capitalFeature(feature, layer) {
    // does this feature have a property named popupContent?

    layer.bindPopup(`<style="font-weight: 800;">${feature.properties.ls_name}</style>` + '</br>' + `Estimated Population: ${feature.properties.pop_max.toLocaleString("en-US")}`)



}
const statistics = (countryStats) => {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/country?name=${countryStats}`,
        headers: { 'X-Api-Key': 'GxDMLyqjl2t4Q5miXapOX9nqUIO38gIHTw4fRqIV' },
        contentType: 'application/json',
        success: function (result) {

            let data = [{
                values: [result[0].employment_agriculture, result[0].employment_industry, result[0].employment_services],
                labels: ['Agriculture', 'Industry', 'Services'],
                type: 'pie',

            }];

            let layout = {
                height: 200,
                width: 200,
                autosize: false,
                margin: {
                    l: 20,
                    r: 50,
                    t: 15,
                    b: 100
                },
                showLegend: false,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)'
            };

            Plotly.newPlot('myDiv', data, layout, { displayModeBar: false });
            document.getElementById('life_expectancy_male').innerHTML = result[0].life_expectancy_male
            document.getElementById('life_expectancy_female').innerHTML = result[0].life_expectancy_female
            document.getElementById('gdp').innerHTML = result[0].gdp.toLocaleString("en-US")
            document.getElementById('per_capita').innerHTML = result[0].gdp_per_capita.toLocaleString("en-US")
            document.getElementById('unemployed').innerHTML = result[0].unemployment
            document.getElementById('co2_emissions').innerHTML = result[0].co2_emissions
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

mymap.addLayer(markers)
mymap.addLayer(markersSnow)
mymap.addLayer(markersCapital)
mymap.addLayer(markersEarthquake)
mymap.addLayer(group5)


let baseMaps = {
    'Original': basemapone,
    'Water Colour': watercolor
}
let overlayMaps = {
    'Summer Olympics': markers,
    'Winter Olympics': markersSnow,
    'Capital Cities': markersCapital,
    'Covid Cases': group1,
    'Earthquakes': markersEarthquake,
    'Airports': group5

}

L.control.layers(baseMaps, overlayMaps).addTo(mymap)



