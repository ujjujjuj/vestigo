const shopContainer = document.querySelector(".shopContainer");
const restaurantContainer = document.querySelector(".restaurantContainer");
const hotelContainer = document.querySelector(".hotelContainer");
const searchtext = document.querySelector(".search input");
const searchcategory = document.querySelector(".extraSearch select")

let cntr,cnth,cnts;
cntr=cnth=cnts=0

function renderData(data){
    data.forEach(place => {
        let color = place.people/place.capacity > 0.6 ? "#FB6A6A" : "#80DCC4";
        let isSafe = place.people/place.capacity > 0.6 ? "Unsafe" : "Safe";
        if(place.category == "Restaurant"){
            let src="img/restaurant.jpg"
            if(place.pic){
                src = `data:image/jpg;base64, ${place.pic}`
            }
            out = (`
                <div class='cardWrapper'>
                    <div class='card'>
                        <img src="${src}" onclick='window.location.href="${place.url}"'>
                        <h2>${place.name}</h2>
                        <span class="isSafe" style="background-color:${color};">${isSafe}</span>
                        <h3>There are ${place.people} people here</h3>
                    </div>
                </div>
            `)
            restaurantContainer.innerHTML += out
            cntr +=1
        }else if(place.category == "Hotel"){
            let src="img/hotel.jpg"
            if(place.pic){
                src = `data:image/jpg;base64, ${place.pic}`
            }
            out = (`
                <div class='cardWrapper'>
                    <div class='card'>
                        <img src="${src}" onclick='window.location.href="${place.url}"'>
                        <h2>${place.name}</h2>
                        <span class="isSafe" style="background-color:${color};">${isSafe}</span>
                        <h3>There are ${place.people} people here</h3>
                    </div>
                </div>
            `)
            hotelContainer.innerHTML += out
            cnth +=1
        }else{
            let src="img/mall.jpg"
            if(place.pic){
                src = `data:image/jpg;base64, ${place.pic}`
            }
            out = (`
                <div class='cardWrapper'>
                    <div class='card'>
                        <img src="${src}" onclick='window.location.href="${place.url}"'>
                        <h2>${place.name}</h2>
                        <span class="isSafe" style="background-color:${color};">${isSafe}</span>
                        <h3>There are ${place.people} people here</h3>
                    </div>
                </div>
            `)
            shopContainer.innerHTML += out
            cnts +=1
        }
    });
    if(cntr==0){
        restaurantContainer.parentElement.remove()
    }
    if(cnts==0){
        shopContainer.parentElement.remove()
    }
    if(cnth==0){
        hotelContainer.parentElement.remove()
    }
}

function search(){
    window.location.search = `?name=${searchtext.value}&category=${searchcategory.value}`
}

renderData(data)
console.log(data)