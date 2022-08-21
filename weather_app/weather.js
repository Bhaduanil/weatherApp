let a;
let date;
let tim;

const apikey = 'c5683b302c632e36712b8bf1043fb4ea';
getweatherdata();
function getweatherdata() {
    const serc = document.querySelector("#city");
    if (serc.value == "") {
        navigator.geolocation.getCurrentPosition((success) => {
            let { latitude, longitude } = success.coords;
            console.log(latitude, longitude);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&APPID=${apikey}&units=metric`)
                .then((data) => data.json()).then((res) => {
                    const city="Current location";
                    showweatherdata(res,city);
                });

        })
    }
    else {
        const city= document.getElementById('city');
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=${apikey}&units=metric`)
        .then((data) => data.json()).then((out) => {
            console.log(out);
            if(out.message=="city not found")
            {
                 city.value="City not found";
            }
            else{
            const latitude=out.coord.lat;
            const longitude=out.coord.lon;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&APPID=${apikey}&units=metric`)
                .then((data) => data.json()).then((res) => {
                    console.log(res);
                    showweatherdata(res,city.value);
    })}})
}}
function showweatherdata(data,city) {

    const weat = document.getElementById('weather');
    a=new Date().toLocaleString('en-US', { timeZone:data.timezone });
    weat.innerHTML="";
    weat.innerHTML = `
       <div class="container" style="background-color: rgb(15, 160, 15);border-radius:10px">
       <div class="container" style="padding:10px;text-align:center">
       <h5 style="background:#3C3C44;border-radius:10px;color:white;width:60px;justify-content:center">${new Date(data.current.dt * 1000).toString().substring(0, 3)}</h5>
       <h8 style="background:#3C3C44;border-radius:10px;padding-left:5px;padding-right:5px;">${city}</h8>
       <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">
       <h6 style="background:#3C3C44;border-radius:10px">${data.current.weather[0].main}</h6>
       <h6>Temperature:${data.current.temp}℃</h6>
       <h6>Humidity:${data.current.humidity} %</h6>
       <h6>Wind:${data.current.wind_speed} m/s</h6>
       <h6>Sunrise: ${new Date(data.current.sunrise * 1000).toString().substring(16, 21)}</h6>
       <h6>Sunset:${new Date(data.current.sunset * 1000).toString().substring(16, 21)}</h6>
       </div>
       </div>
       `;
       const hou = document.getElementById('hourly');
       hou.innerHTML="";
    data.hourly.map((element, i) => {
       
        
        if (i > 0 && i < 9)
            hou.innerHTML += `
        <div class="jumbotron" style="background:rgb(33, 198, 110); justify-content:center;border-radius:10px;margin:10px;padding:10px">
        <h6 style="background:#3C3C44;border-radius:10px">${new Date(element.dt * 1000).toString().substring(16, 21)}</h6>
        <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
        <h6 style="background:#3C3C44;border-radius:10px">${element.weather[0].main}</h6>
        <h6>Temperature:${element.temp} ℃</h6>
        <h6>Humidity:${element.humidity} %</h6>
        <h6>Wind:${element.wind_speed} m/s</h6>
        </div>
        `
    })
    const forc = document.getElementById('forcast');
    forc.innerHTML="";
    data.daily.map((element, i) => {
        
        if (i == 0 || i == 7) { }
        else
            forc.innerHTML += `
        <div class="container" id="week" style="background-color: green; text-align:center;border-radius:10px;margin:10px; color:white">
        <div class="container" style="padding:10px;justify-content:center;">
        <h5 style="background:#3C3C44;border-radius:10px;color:white;width:50px">${new Date(element.dt * 1000).toString().substring(0, 3)}</h5>
        <h8 style="background:#3C3C44;border-radius:10px;padding-left:5px;padding-right:5px;">${city}</h8>
        <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
       <h6 style="background:#3C3C44;border-radius:10px">${element.weather[0].main}</h6>
       <h6>Temperature:${element.temp.day} ℃</h6>
       <h6>Humidity:${element.humidity} %</h6>
       <h6>Wind:${element.wind_speed} m/s</h6>
       <h6>Sunrise: ${new Date(element.sunrise * 1000).toString().substring(16, 21)}</h6>
       <h6>Sunset:${new Date(element.sunset * 1000).toString().substring(16, 21)}</h6>
       </div>
       </div>
           `

    });
}
setInterval(timer, 1000);
function timer() {
    a = new Date();
    date = a.toDateString();
    tim = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
    document.getElementById("clocks").innerHTML = tim + "<br> on " + date;
}