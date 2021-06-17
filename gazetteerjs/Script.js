const countriesList = document.getElementById('countries')
let countries;
let option = document.createElement("option");
option.innerHtml = "Select a country"
countriesList.appendChild(option);


// countriesList.innerHTML = '<option value="Select a country">Select A Country</option>'

var displayCountryInfo = (iso2Code) => {
 var countryData = countries.find(country => country.alpha2Code === iso2Code)   
    document.querySelector('#flag__container img' ).alt = `Flag of ${countryData.name}`
    document.getElementById('capital').innerHTML= countryData.capital
    document.getElementById('dialingcode').innerHTML= '+' + countryData.callingCodes[0]
    document.getElementById('population').innerHTML= countryData.population.toLocaleString("en-US")
    document.getElementById('currencies').innerHTML=  countryData.currencies.map(currency => `${currency.name} (${currency.symbol})`)
    document.getElementById('region').innerHTML= countryData.region
    document.querySelector('#flag__container img').src =countryData.flag
    document.getElementById('lat').innerText = countryData.latlng[0]
    document.getElementById('long').innerText = countryData.latlng[1]
    map.setView([countryData.latlng[0], countryData.latlng[1]], 4)
    document.getElementById('currencyCode').innerHTML = countryData.currencies[0].code
    var countryCode = countryData.currencies.map(currency => currency.code)
    
    disease(countryData.name)
    localNews(countryData.alpha2Code)
    
    
    
    const exchangeRate = (countryCode) => {
        fetch('https://openexchangerates.org/api/latest.json?app_id=ff11d9995b824a64a232e936f69d91f1')
        .then((response) => response.json())
        .then ((data) => {
            document.getElementById('code').innerHTML = data.rates[countryCode[0]]
            // console.log()
        })
        .catch(function(error) {
            throw(error) })
    }
    exchangeRate(countryCode)
    wikipedia(countryData.name)
    forecast(countryData.capital)

    
}

countriesList.addEventListener('change', event =>{
    displayCountryInfo(event.target.value);
})

var lat = document.getElementById("lat").textContent;
var long = document.getElementById("long").textContent;

//console.log(lat, long);


let Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

fetch('https://restcountries.eu/rest/v2/all')
.then((response) => response.json())
 .then((data) => {
     initialize(data)
 })
 .catch(function(error) {
    throw(error)
})


const initialize = (countriesData) => {
countries = countriesData

let options = '<option value="Select a country">Select A Country</option>'
for(let i=0; i<countries.length; i++){
    options += `<option value='${countries[i].alpha2Code}'>${countries[i].name}</option>`
}
document.getElementById('countries').innerHTML= options
displayCountryInfo('GB')

}
// console.log(countries);



var popup = L.popup();

// Write function to set Properties of the Popup








// console.log(document.getElementById('countries'))

$('#countries').change(function() {

    $.ajax({
        url: "php/countryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#countries').val(),
        },
        success: function(result) {

            // console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                
                $('#txtCurrency').html(result['data'][0]['currencyCode']);
               

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});


//console.log(snap)





//

    const baseURL = "http://api.openweathermap.org/data/2.5/weather?"
    const API_Key = '833d6bab104b69d5f1d4e30dcf52e1cd'

    

  

    
 
const wikipedia = async (countryName) => {
    try {
        const dataurl = fetch(`http://api.geonames.org/wikipediaSearchJSON?formatted=true&title=${countryName}&username=Bozzle26&style=full`)
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
}
   



     

 


      
     

       

        var x = document.getElementById("demo");

        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
        }
        
        function showPosition(position) {
          x.innerHTML = "Latitude: " + position.coords.latitude + 
          "<br>Longitude: " + position.coords.longitude;
         
        }
        getLocation()
        function olympicFeature(feature, layer) {
            // does this feature have a property named popupContent?
           
                layer.bindPopup(`City: ${feature.properties.name}` + '</br>' +
                `Year: ${feature.properties.year}`)
                            
        }
       

        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
           
                layer.bindPopup(`Country: ${feature.properties.name}`);
                layer.on({
                    click : onCountrySelection
                    
                });
                
                            
        }
      
        
        function onCountrySelection(e){
            var layer = e.target;
            console.log(layer.feature.properties.iso_a2)
            displayCountryInfo(layer.feature.properties.iso_a2)
           
        
            layer.setStyle({
                weight: 2,
                color: 'white',
                dashArray: '',
                fillOpacity: 0.6
            });
        //callback for clicking inside a polygon
        }
        
        /**
         * Callback for when a country is highlighted. Will take care of the ui aspects, and it will call
         * other callbacks after done.
         * @param e
         */
     
        
        const forecast = (place) => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=3f35605d09514f429bd191608210906&q=${place}&days=3&aqi=no&alerts=no`)
        .then ((response) => response.json())
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
           
    

      /* function style(feature) {
           return {
               fillColor: 'hidden',
               color: 'black',
               opacity: 0.7
                          }
       } */
$(document).ready(function(){
    $('.accordion > li > .accordion__panel').hide();
    $('.accordion > li').click(function() {
        if($(this).hasClass("active")) {
            $(this).removeClass("active").find('.accordion__panel').slideUp();
        } else {
            $(".accordion > li.active .accordion__panel").slideUp();
            $(".accordion > li.active").removeClass("active");

    $(this).addClass("active").find(".accordion__panel").slideDown();
        }
        return false
    })
})
const disease = (selectedCountry) => {
fetch("https://disease.sh/v3/covid-19/countries")
.then((response) => response.json())
.then((data) => {
    console.log(data)
    
     
  let plab = (data.filter(country => country.country === selectedCountry ))
  
  if (plab.length !=0) {
    document.getElementById('cases').innerHTML = plab[0].cases.toLocaleString("en-US")
  document.getElementById('casesPerOneMillion').innerHTML = plab[0].casesPerOneMillion.toLocaleString("en-US")
  document.getElementById('deaths').innerHTML = plab[0].deaths.toLocaleString("en-US")
  document.getElementById('deathsPerOneMillion').innerHTML = plab[0].deathsPerOneMillion.toLocaleString("en-US")
  document.getElementById('recovered').innerHTML = plab[0].recovered.toLocaleString("en-US")
  document.getElementById('recoveredPerOneMillion').innerHTML = plab[0].recoveredPerOneMillion.toLocaleString("en-US") }
    
})
}

  
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

function openNav(){
    document.getElementById("side__menu").style.width = "300px"
    

}
function closeNav(){
    document.getElementById("side__menu").style.width = "0"
    
    
}
/* -------------------------------------------------------------------------- */
/*                                Geojson Path                                */
/* -------------------------------------------------------------------------- */
const country = './countryBorders.geo.json'
const point = './sumOlympics.geo.json'
const snowflake = './winOlympics.geo.json'

/* -------------------------------------------------------------------------- */
/*                               Styling section                               */
/* -------------------------------------------------------------------------- */

let polyStyle = {
    fillColor: '#001d3d',
    fillOpacity: 0.9,
    weight:1,
    color: 'white',
    opacity: 1
}

let polyStyleOnclick = {
    weight: 5,
    color: '#fee440',
    dashArray: '',
    fillOpacity: 0.7
}

let defaultDropdownStyle = {
    weight: 5,
    color: '#fee440',
    dashArray: '',
    fillOpacity: 0.1
}

let geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#e63946",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

let iconImage = {
    iconUrl: 'assets/icon/gold-medal.png',
    iconSize: [30, 30], // width and height of the image in pixels
    shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
}

let iconImageSnow = {
    iconUrl: 'assets/icon/snowflake.png',
    iconSize: [30, 30], // width and height of the image in pixels
    shadowSize: [35, 20], // width, height of optional shadow image
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
}

/* -------------------------------------------------------------------------- */
/*                                  AJAX Call                                 */
/* -------------------------------------------------------------------------- */
let countryGeo = $.ajax({
    url: country,
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

let pointGeo = $.ajax({
    url: point,
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

let pointGeoSnow = $.ajax({
    url: snowflake,
    dataType: "json",
    success: console.log("Point data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

/* -------------------------------------------------------------------------- */
/*                                Main function                               */
/* -------------------------------------------------------------------------- */
$.when(countryGeo, pointGeo, pointGeoSnow).done(function () {
    /* -------------------------------------------------------------------------- */
    /*                               Basemap section                              */
    /* -------------------------------------------------------------------------- */
    

    document.getElementById('ZoomIn').onclick = function () {
        map.zoomIn()
    }
    document.getElementById('ZoomOut').onclick = function () {
        map.zoomOut()
    }

    let map = L.map('map', {
        center: [39.73, -104.99],
        zoom: 10,
        zoomControl:false,
        layers: [Esri_WorldStreetMap]
    });

    /* -------------------------------------------------------------------------- */
    /*                             Catch response json                            */
    /* -------------------------------------------------------------------------- */
    // Polygon
    let countrylayer = countryGeo.responseJSON
    // Gold points
    let pointlayer = pointGeo.responseJSON
    // Snowlake points
    let pointlayerSnow = pointGeoSnow.responseJSON

    /* -------------------------------------------------------------------------- */
    /*                            Interactive function                            */
    /* -------------------------------------------------------------------------- */
    // Null layer for clicked layer 
    let lastClickedLayer = null
    // Null layer for selected dropdown
    let newLayer = null
    // Onclick function
    let OnClickFeature = e => {
        // Default style
        if (lastClickedLayer !== null) {
            lastClickedLayer.setStyle(polyStyle);
        }
        // Remove added layer from dropdown function
        if (newLayer !== null) {
            map.removeLayer(newLayer)
        }

        map.fitBounds(e.target.getBounds());

        // Set leyer target
        let countrylayer = e.target;
        // Replace null layer
        lastClickedLayer = countrylayer;
        // Set new style when the geojson clicked
        countrylayer.setStyle(polyStyleOnclick);
        // Popup section
        let popup = L.popup()
            .setContent(`Country: ${countrylayer.feature.properties.name}`);

        countrylayer.bindPopup(popup).openPopup();
    }

    // Set function to the 'layer on' 
    function onEachFeature(feature, layer) {
        layer.on({
            click: OnClickFeature
        });
    }
    
    // Set the icon for gold points
    let IconImage = (feature, latlng) => {
        let myIcon = L.icon(iconImage)
        return L.marker(latlng, {
            icon: myIcon
        })
    }

    // Set the icon for snowlake points
    let IconImageSnow = (feature, latlng) => {
        let myIcon = L.icon(iconImageSnow)
        return L.marker(latlng, {
            icon: myIcon
        })
    }

    // Formating data to geojson
    let geojson = L.geoJson(countrylayer, {
        onEachFeature: onEachFeature,
        style: polyStyle
    })
    map.addLayer(geojson)
    let geojsonPoint = L.geoJson(pointlayer, {
        pointToLayer: IconImage
    })

    let geojsonPointSnow = L.geoJson(pointlayerSnow, {
        pointToLayer: IconImageSnow
    })

    // Cluster options for gold point    
    let markers = L.markerClusterGroup({
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
    });

    // Cluster options for snowlake point    
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
            console.log(markers)
            let html =
                `<img class="first-icon-cluster" src="${first}"></img><div class="circleSnow">${markers.length}</div>`;
            return L.divIcon({
                html: html,
                className: 'mycluster',
                iconSize: L.point(10, 10)
            });
        },
    });

    // Add cluster points and polygon to the layer
    markers.addLayer(geojsonPoint)
    markersSnow.addLayer(geojsonPointSnow)

    map.addLayer(markers)
    map.addLayer(markersSnow)
    map.fitBounds(geojson.getBounds())

    // Checkbox function for gold points
    document.getElementById('removelayer').onclick = function () {
        if (!this.checked) {
            if (map.hasLayer(geojsonPoint)) {
                map.removeLayer(geojsonPoint)
            } else {
                map.removeLayer(markers)
            }
        } else {
            if (map.hasLayer(geojsonPoint)) {
                map.addLayer(geojsonPoint)
            } else {
                map.addLayer(markers)
            }

        }
    }

    // Checkbox function for snowlake points
    document.getElementById('removelayerSnow').onclick = function () {
        if (!this.checked) {
            if (map.hasLayer(geojsonPointSnow)) {
                map.removeLayer(geojsonPointSnow)
            } else {
                map.removeLayer(markersSnow)
            }
        } else {
            if (map.hasLayer(geojsonPointSnow)) {
                map.addLayer(geojsonPointSnow)
            } else {
                map.addLayer(markersSnow)
            }

        }
    }

    // Get the country name from country geojson polygon
    let filcount = countrylayer.features.map(a => {
        return a.properties.name
    })

    // Sort the name
    filcount.sort()

    // Creating a new options refers to list of the country names
    let dropdown = document.getElementById('inlineFormCustomSelectCountry')

    for (let i in filcount) {
        let opt = document.createElement('option')
        opt.value = filcount[i]
        opt.innerHTML = filcount[i]
        dropdown.appendChild(opt)
    }

    // Select function from drop down options
    document.getElementById('inlineFormCustomSelectCountry').onchange = function () {
        // Relpace null layer
        if (lastClickedLayer !== null) {
            lastClickedLayer.setStyle(polyStyle);
        }
        // Relpace null layer
        if (newLayer !== null) {
            newLayer.setStyle(polyStyle);
            map.removeLayer(newLayer)
        }
        // Filter country polygon by selected name
        let countFilter = countrylayer.features.filter(a => {
            return a.properties.name == this.value
        })
        // Formatting to geojson
        let geojson = L.geoJson(countFilter, {
            onEachFeature: onEachFeature,
        })
        // Replace null layer
        newLayer = geojson

        lastClickedLayer = geojson;

        newLayer.setStyle(defaultDropdownStyle)

        map.fitBounds(geojson.getBounds())
        // Add filtered polygon to the layer
        map.addLayer(geojson)
    }

    document.getElementById('fitbound').onclick = function () {
        map.fitBounds(geojson.getBounds())
        lastClickedLayer.setStyle(polyStyle)
        newLayer.setStyle(polyStyle)
    }
});
