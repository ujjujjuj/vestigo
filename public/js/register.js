form = document.querySelector("form");
lat = document.getElementById("lat");
long = document.getElementById("long");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            lat.value = pos.coords.latitude
            long.value = pos.coords.longitude
        });
    } 
}
window.onload = () => { 
    getLocation();
}
