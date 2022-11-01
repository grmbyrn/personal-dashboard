async function getBackground(){
    await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })
}
getBackground()

async function getNews(){
    await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=VDF5SRrA6EbC6IR3iZxFZAfAWAuiajCW')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < 3; i++){
            
            try{
                document.querySelector('#news').innerHTML += `
                    <a href='${data.results[i].url}' class='news-link'><p>${data.results[i].title}</p></a>
                `
            }
            catch(err){
                console.log(err)
            }
        }
    })
}
getNews()

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})

    document.getElementById("date").textContent = date.toDateString()
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

async function getQuote(){
    await fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => {
            document.querySelector('#quote').innerHTML += `
                <p>${data.content}</p>
                <p>${data.author}</p>
            `
        })
}
getQuote()