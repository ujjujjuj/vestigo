let map;

function loadMarkers(){
    data.forEach(e => {
        console.log({lat:parseInt(e.coords[0]),lng:parseInt(e.coords[1])})
        let loc = {lat:parseInt(e.coords[0]),lng:parseInt(e.coords[1])}
        let content = (`
            <div id="content">
                <div class="firstHeading">${e.name} (${e.category})</div>
                <div id="bodyContent">
                    &nbsp;&nbsp;There are currently ${e.people} people here out of ${e.capacity}<br>
                    &nbsp;&nbsp;<a href='${e.url}'>Visit website</a><br>
                </div>
            </div>
        `)
        let infowindow = new google.maps.InfoWindow({
            content: content
        });
        let marker = new google.maps.Marker({
            position: loc,
            map,
            title: e.name
        });
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    });
}


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center:{lat:20.5937,lng:78.9629}
      });
    loadMarkers()
}