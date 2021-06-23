
/* -------------------------------------------------------------------------- */
/*                                Geojson Path                                */
/* -------------------------------------------------------------------------- */
const country = 'assets/countryBorders.geo.json'
const point = 'assets/sumOlympics.geo.json'
const snowflake = 'assets/winOlympics.geo.json'

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
    let Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    });
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