let countriesList = document.getElementById('countries')
let countries;
let option = document.createElement("option");
option.innerHtml = "Select a country"
countriesList.appendChild(option);







// countriesList.innerHTML = '<option value="Select a country">Select A Country</option>'

var displayCountryInfo = (iso2Code) => {
    var countryData = countries.find(country => country.alpha2Code === iso2Code)
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



    document.getElementById('currencyCode').innerHTML = countryData.currencies[0].code
    var countryCode = countryData.currencies.map(currency => currency.code)

    disease(countryData.name)
    localNews(countryData.alpha2Code)



    const exchangeRate = (countryCode) => {
        fetch('https://openexchangerates.org/api/latest.json?app_id=ff11d9995b824a64a232e936f69d91f1')
            .then((response) => response.json())
            .then((data) => {
                document.getElementById('code').innerHTML = data.rates[countryCode[0]]
                // console.log()
            })
            .catch(function (error) {
                throw (error)
            })
    }
    exchangeRate(countryCode)
    wikipedia(countryData.name)
    forecast(countryData.capital)
    statistics(countryData.name)


}



var lat = document.getElementById("lat").textContent;
var long = document.getElementById("long").textContent;

//console.log(lat, long);


fetch('https://restcountries.eu/rest/v2/all')
    .then((response) => response.json())
    .then((data) => {
        initialize(data)
    })
    .catch(function (error) {
        throw (error)
    })


const initialize = (countriesData) => {
    countries = countriesData

    let options = '<option value="Select a country">Select A Country</option>'
    for (let i = 0; i < countries.length; i++) {
        options += `<option value='${countries[i].alpha2Code}'>${countries[i].name}</option>`
    }
    document.getElementById('countries').innerHTML = options
    displayCountryInfo('GB')


}
// console.log(countries);



var popup = L.popup();

let polyStyle = {
    fillColor: '#001d3d',
    fillOpacity: 0.9,
    weight: 1,
    color: 'white',
    opacity: 1
}
let polyStyleOnclick = {
    weight: 5,
    color: '#fee440',
    dashArray: '',
    fillOpacity: 0.7
}

// Write function to set Properties of the Popup
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







// console.log(document.getElementById('countries'))





//console.log(snap)





//

const baseURL = "http://api.openweathermap.org/data/2.5/weather?"
const API_Key = '833d6bab104b69d5f1d4e30dcf52e1cd'

const wikipedia = (countryName) => {
    $.ajax({
        url: `http://api.geonames.org/wikipediaSearchJSON?formatted=true&title=${countryName}&username=Bozzle26&style=full`,
        type: 'POST',
        dataType: 'json',
        data: {
            title: $(countryName).val(),
        },
        success: function (result) {
            if (result.geonames.length != 0) {
                //  if (result.status.name == "ok") {
                console.log('what', result)

                $('#textinfo').html(result.geonames[0].summary);
                // } 
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('no way')
        }
    })
}


/*
const wikipedia = async (countryName) => {
    try {
        const dataurl = fetch(`https://api.geonames.org/wikipediaSearchJSON?formatted=true&title=${countryName}&username=Bozzle26&style=full`)
        .then ((response) => response.json())
        .then((data) => {
            console.log(data.geonames.length)
            if (data.geonames.length != 0) { 
           document.getElementById('textinfo').innerText = data.geonames[0].summary
            }
        })
    }catch(error) {
        throw(error)
    }
} */
var mymap = L.map('mapid').setView([lat, long], 2);

var options = {
    key: '9c469bb50ba04e5c8ddfce02fc12a9b8',
    limit: 10,
    proximity: '51.52255, -0.10249' // favour results near here
};
// var control = L.Control.openCageSearch(options).addTo(mymap);

/*
  var options = {
    key: '9c469bb50ba04e5c8ddfce02fc12a9b8',
    limit: 5,                  // number of results to be displayed
    position: 'topright',
    placeholder: 'Search...', // the text in the empty search box
    errorMessage: 'Nothing found.',
    showResultIcons: false,
    collapsed: true,
    expand: 'click',
    addResultToMap: true,     // if a map marker should be added after the user clicks a result
    onResultClick: undefined, // callback with result as first parameter
    resultExtension: {        // additional attributes to add to result 
        geohash: 'annotations.geohash',
        what3words: 'annotations.what3words',
        addressComponents: 'components'
   } 
}; 

 /* control.markGeocode = function(result) {
    var bbox = result.bbox;
    L.polygon([
         bbox.getSouthEast(),
         bbox.getNorthEast(),
         bbox.getNorthWest(),
         bbox.getSouthWest()
    ]).addTo(mymap);
};
*/

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',

}).addTo(mymap);







/*

fetch('./countryBorders.geo.json')
.then ((response) => response.json())
        .then((data) => {
        console.log(data)
       
      
           L.geoJSON(data).addTo(mymap);
           L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(mymap);

    
        //L.geoJson(data, {style: style}).addTo(mymap)
        
        })

     

 
 fetch('./sumOlympics.geo.json')
.then ((response) => response.json())
        .then((data) => {
        //    console.log(data)
        
           
           L.geoJson(data, {
            onEachFeature: olympicFeature
       }).addTo(mymap)
    })
let winterOl = (on) => {
    if (on) {
  fetch('./winOlympics.geo.json')
.then ((response) => response.json())
        .then((data) => {
        console.log(data)
        
        
        L.geoJson(data, {
         onEachFeature: winOlympicFeature
    }).addTo(mymap)
    }) 
} else {
    

}
}
*/


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



// L.easyButton('fa-home', function (btn, mymap) {
//     mymap.setView([54, -2], 4);
// }).addTo(mymap);









function olympicFeature(feature, layer) {
    // does this feature have a property named popupContent?

    layer.bindPopup(`City: ${feature.properties.name}` + '</br>' + `Year: ${feature.properties.year}`)



}

function winOlympicFeature(feature, layer) {
    // does this feature have a property named popupContent?

    layer.bindPopup(`City: ${feature.properties.name}` + '</br>' + `Year: ${feature.properties.year}`)


}
/*

        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
           
                layer.bindPopup(`Country: ${feature.properties.name}`);
                layer.on({
                    click : onCountrySelection
                    
                });
                
                            
        }
      
        
        function onCountrySelection(e){
            //var layer = e.target
            //console.log("Not suururue", layer.feature.properties.iso_a2)
            //displayCountryInfo(layer.feature.properties.iso_a2)
           let layer = e
           console.log(e)
            layer.setStyle(polyStyle);
       
        } 
        
        /*
         * Callback for when a country is highlighted. Will take care of the ui aspects, and it will call
         * other callbacks after done.
         * @param e
         */



const forecast = (place) => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=3f35605d09514f429bd191608210906&q=${place}&days=3&aqi=no&alerts=no`)
        .then((response) => response.json())
        .then((data) => {
            //    console.log(data)
            //    console.log(data.forecast.forecastday[1].day.condition.icon)
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

        })
}

$('#covidCases').prop('checked', false);

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
const disease = (selectedCountry) => {
    fetch(covidUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            let plab = (data.filter(country => country.country === selectedCountry))
            let mab = (data.map(country => [country.countryInfo.lat, country.countryInfo.long]))
            console.log('plab', plab)

            if (plab.length != 0) {
                document.getElementById('cases').innerHTML = plab[0].cases.toLocaleString("en-US")
                document.getElementById('casesPerOneMillion').innerHTML = plab[0].casesPerOneMillion.toLocaleString("en-US")
                document.getElementById('deaths').innerHTML = plab[0].deaths.toLocaleString("en-US")
                document.getElementById('deathsPerOneMillion').innerHTML = plab[0].deathsPerOneMillion.toLocaleString("en-US")
                document.getElementById('recovered').innerHTML = plab[0].recovered.toLocaleString("en-US")
                document.getElementById('recoveredPerOneMillion').innerHTML = plab[0].recoveredPerOneMillion.toLocaleString("en-US")
            }
        })
}

// Get the geometries data
fetch(covidUrl)
    .then((response) => response.json())
    .then((data) => {
        let group1 = L.featureGroup()
        var geojson = {
            type: "FeatureCollection",
            features: [],
        };
        let circleLayer = data.map(country => {
            let lat = country.countryInfo.lat
            let long = country.countryInfo.long
            let c = country.cases
         
            // return [[long,lat],c]
           let y = L.circle([lat,long], {
                color: 'red',
                fillColor: '#f03',
                radius: `${Math.sqrt(country.cases * 1500)}`,
                fillOpacity: 0.5,

            }).addTo(group1).bindPopup(`Cases: ${country.cases.toLocaleString("en-US")}`)

            document.getElementById('covidCases').onclick = function () {

                if (!this.checked) {
                    if (mymap.hasLayer(group1)) {
                        mymap.removeLayer(group1)
                    }

                } else {

                    mymap.addLayer(group1)

                }
            }
        })
    })

const localNews = (countryabbrev) => {

    fetch(`https://newsapi.org/v2/top-headlines?country=${countryabbrev}&apiKey=7c6fadef1bbd4d52837bfe5703166957`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

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

function openNav() {
    document.getElementById("side__menu").style.width = "300px"



}

function closeNav() {
    document.getElementById("side__menu").style.width = "0"



}

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
        console.log("these arealso::" + markers)
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
        let first = iconImageSnow.iconUrl
        console.log("these are::" + markers)
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
        console.log("these are::" + markers)
        let html =
            `<img class="first-icon-cluster" src="${first}"></img><div class="circleCapital">${markers.length}</div>`;
        return L.divIcon({
            html: html,
            className: 'mycluster',
            iconSize: L.point(10, 10)
        });
    },
});


let countryGeo = $.ajax({
    url: './countryBorders.geo.json',
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

let pointGeo = $.ajax({
    url: './sumOlympics.geo.json',
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

let pointGeoSnow = $.ajax({
    url: './winOlympics.geo.json',
    dataType: "json",
    success: console.log("Point data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})
let capital = $.ajax({
    url: './capitals.geo.json',
    dataType: "json",
    success: console.log("Capital data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

/* -------------------------------------------------------------------------- */
/*                                Main function                               */
/* -------------------------------------------------------------------------- */
$.when(countryGeo, pointGeo, pointGeoSnow, capital).done(function () {

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?

        layer.on({
            click: OnClickFeature
        })
        layer.bindPopup(`Country: ${feature.properties.name}`);
    }

    let countrylayer = countryGeo.responseJSON
    let newLayer = null

    let lastClickedLayer = null
    let group2 = L.featureGroup()

    countriesList.addEventListener('change', event => {
        displayCountryInfo(event.target.value)
        let selected = countrylayer.features.filter(place => place.properties.iso_a2 === event.target.value)

        group2.clearLayers()

        if (newLayer !== null) {
            mymap.removeLayer(newLayer)


        }
        if (lastClickedLayer !== null) {

            lastClickedLayer.setStyle(polyStyle)


        }


        function polystyle(feature) {
            return {
                weight: 5,
                color: '#fee440',
                dashArray: '',
                fillColor: '#001d3d',
                fillOpacity: 0.9,
                opacity: 1,

            }
        }

        L.geoJSON(selected, {
            style: polystyle
        }).addTo(group2)

        mymap.addLayer(group2)



    })

    // Gold points
    let pointlayer = pointGeo.responseJSON
    // Snowlake points
    let pointlayerSnow = pointGeoSnow.responseJSON

    let capitallayer = capital.responseJSON

    //let lastClickedLayer = null
    // Null layer for selected dropdown
    //let newLayer = null
    // Onclick function
    let OnClickFeature = e => {
        displayCountryInfo(e.target.feature.properties.iso_a2)
        console.log('match', e.target)
        group2.clearLayers()
        // Default style
        if (lastClickedLayer !== null) {

            lastClickedLayer.setStyle(polyStyle);
        }
        // Remove added layer from dropdown function
        if (newLayer !== null) {
            mymap.removeLayer(newLayer)

        }

        mymap.fitBounds(e.target.getBounds());

        // Set layer target
        let countrylayer = e.target;
        console.log('click', e)
        // Replace null layer
        lastClickedLayer = countrylayer;
        // Set new style when the geojson clicked
        countrylayer.setStyle(polyStyleOnclick);

        let cNcC = {}

        for (let i in countriesList.options) {
            let list = countriesList.options[i].innerText
            let val = countriesList.options[i].value
            cNcC[list] = val
        }

        let cFil = cNcC[countrylayer.feature.properties.name]
        console.log(cFil)
        displayCountryInfo(cFil);

        $("select option").filter(function () {
            //may want to use $.trim in here
            return $(this).text() == countrylayer.feature.properties.name;
        }).prop('selected', true);

    }

    console.log("This is Sparta", countrylayer, pointlayer, pointlayerSnow, capitallayer)

    let IconImage = (feature, latlng) => {
        let myIcon = L.icon(iconImage)

        return L.marker(latlng, {
            icon: myIcon

        })

    }

    let IconImageSnow = (feature, latlng) => {
        let myIcon = L.icon(iconImageSnow)
        return L.marker(latlng, {
            icon: myIcon
        })
    }

    let CapitalImage = (feature, latlng) => {
        let myIcon = L.icon(capitalImage)

        return L.marker(latlng, {
            icon: myIcon

        })
    }

    let geojson = L.geoJson(countrylayer, {
        onEachFeature: onEachFeature,
        style: polyStyle
    })

    mymap.addLayer(geojson)

    let geojsonPoint = L.geoJson(pointlayer, {
        pointToLayer: IconImage,
        onEachFeature: olympicFeature


    })

    let geojsonPointCapital = L.geoJson(capitallayer, {
        pointToLayer: CapitalImage,
        onEachFeature: capitalFeature

    })


    let geojsonPointSnow = L.geoJson(pointlayerSnow, {
        pointToLayer: IconImageSnow,
        onEachFeature: winOlympicFeature
    })


    console.log("Accesse this.. ", geojsonPoint)

     markers.addLayer(geojsonPoint)
     markersSnow.addLayer(geojsonPointSnow)
     markersCapital.addLayer(geojsonPointCapital)
    //   mymap.addLayer(markers)
    //   mymap.addLayer(markersSnow)

    mymap.addLayer(markers)
    mymap.addLayer(markersSnow)
    mymap.addLayer(markersCapital)
    document.getElementById('removelayer').onclick = function () {
        if (!this.checked) {
            if (mymap.hasLayer(geojsonPoint)) {
                mymap.removeLayer(geojsonPoint)
            } else {
                mymap.removeLayer(markers)
            }
        } else {
            if (mymap.hasLayer(geojsonPoint)) {
                mymap.addLayer(geojsonPoint)
            } else {
                mymap.addLayer(markers)
            }


        }
    }

    document.getElementById('removeCapital').onclick = function () {
        if (!this.checked) {
            if (mymap.hasLayer(geojsonPointCapital)) {
                mymap.removeLayer(geojsonPointCapital)
            }else {
                mymap.removeLayer(markersCapital)
            }
        } else {
            if (mymap.hasLayer(geojsonPointCapital)) {
                mymap.addLayer(geojsonPointCapital)
            } else {
                mymap.addLayer(markersCapital)
            }
        }
    }

    document.getElementById('removelayerSnow').onclick = function () {
        if (!this.checked) {
            if (mymap.hasLayer(geojsonPointSnow)) {
                mymap.removeLayer(geojsonPointSnow)
            }else {
                mymap.removeLayer(markersSnow)
            }
        } else {
            if (mymap.hasLayer(geojsonPointSnow)) {
                mymap.addLayer(geojsonPointSnow)
            } else {
                mymap.addLayer(markersSnow)
            }
        }
    }

})

/*       
    document.getElementById('removelayerSnow').onclick = function () {
        if (!this.checked) {
            if (mymap.hasLayer(geojsonPointSnow)) {
                mymap.removeLayer(geojsonPointSnow)
            } else {
                mymap.removeLayer(markersSnow)
            }
        } else {
            if (mymap.hasLayer(geojsonPointSnow)) {
                mymap.addLayer(geojsonPointSnow)
            } else {
                mymap.addLayer(markersSnow)
            }
        }
    }
})   
       */
$(window).load(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});



var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C%20${position.coords.longitude}&key=9c469bb50ba04e5c8ddfce02fc12a9b8&language=en&pretty=1`)
        .then((response) => response.json())
        .then((data) => {
            //x.innerHTML = ;
            let you = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
            you.bindPopup(`Current Location: ${data.results[0].formatted}`)


        })


}
getLocation()

function capitalFeature(feature, layer) {
    // does this feature have a property named popupContent?

    layer.bindPopup(`<style="font-weight: 800;">${feature.properties.ls_name}</style>` + '</br>' + `Estimated Population: ${feature.properties.pop_max.toLocaleString("en-US")}`)



}
const statistics = (countryStats) => {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/country?name=${countryStats}`,
        headers: { 'X-Api-Key': 'GxDMLyqjl2t4Q5miXapOX9nqUIO38gIHTw4fRqIV'},
        contentType: 'application/json',
        success: function(result) {
            console.log('stats,', result);
            console.log('Life Expectancy,', result[0].life_expectancy_male);
            var data = [{
                values: [result[0].employment_agriculture, result[0].employment_industry, result[0].employment_services],
                labels: ['Agriculture', 'Industry', 'Services'],
                type: 'pie',
                
              }];
              
              var layout = {
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
                plot_bgcolor:'rgba(0,0,0,0)'
              };
              
              Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
              document.getElementById('life_expectancy_male').innerHTML = result[0].life_expectancy_male
              document.getElementById('life_expectancy_female').innerHTML = result[0].life_expectancy_female
              document.getElementById('gdp').innerHTML = result[0].gdp
              document.getElementById('per_capita').innerHTML = result[0].gdp_per_capita
              document.getElementById('unemployed').innerHTML = result[0].unemployment
              document.getElementById('co2_emissions').innerHTML = result[0].co2_emissions
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    }
    
