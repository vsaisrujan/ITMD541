document.getElementById("geolocationBtn").addEventListener("click", getLocation);

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        document.getElementById("emptyresponse").innerHTML=""
        clearTodayData();
        clearTomorrowData();
        todayData(latitude,longitude)
        tomorrowData(latitude,longitude);
       // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
       },
      (error) => {
        document.getElementById("emptyresponse").innerHTML="Error getting location:"+ error.message
  
        //console.error("Error getting location:", error.message);
        
      }
    );
  } else {
    console.log("Geolocation is not supported in this browser");
   
  }
}




async function sendRequest() {
    var query = encodeURI(document.getElementById("location").value);

    // Check if the query is empty or contains only numbers and special characters
  if (!query || /^[0-9\W_]+$/.test(query)) {
    clearTodayData();
    clearTomorrowData();
    document.getElementById("emptyresponse").innerHTML = "Your search location is not  valid. Please provide a valid search location.";
    return;
  }


    const response = await fetch("https://geocode.maps.co/search?q="+query);
    const data = await response.json();
    //console.log(data);
    if(data.length>0){
        const latitude= data[0].lat;
        const longitude= data[0].lon;
        document.getElementById("emptyresponse").innerHTML=""
        todayData(latitude,longitude);
        //console.log(latitude+" "+longitude);
        tomorrowData(latitude,longitude);
        
    }
    else{
        clearTodayData();
        clearTomorrowData();
        document.getElementById("emptyresponse").innerHTML="Your search query is not a valid. Please provide a valid search query."
    }
}

async function todayData(latitude,longitude){
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        document.getElementById("todaySunrise").innerHTML=data.results.sunrise;
        document.getElementById("todaySunset").innerHTML=data.results.sunset;
        document.getElementById("todayDawn").innerHTML=data.results.dawn;
        document.getElementById("todayDusk").innerHTML=data.results.dusk;
        document.getElementById("todayDayLength").innerHTML=data.results.day_length;
        document.getElementById("todaySolarNoon").innerHTML=data.results.solar_noon;
        document.getElementById("todayTimeZone").innerHTML=data.results.timezone;
      })
      .catch(error => console.error('Error:', error))
}

async function tomorrowData(latitude,longitude){
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=tomorrow`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        document.getElementById("tomorrowSunrise").innerHTML=data.results.sunrise;
        document.getElementById("tomorrowSunset").innerHTML=data.results.sunset;
        document.getElementById("tomorrowDawn").innerHTML=data.results.dawn;
        document.getElementById("tomorrowDusk").innerHTML=data.results.dusk;
        document.getElementById("tomorrowDayLength").innerHTML=data.results.day_length;
        document.getElementById("tomorrowSolarNoon").innerHTML=data.results.solar_noon;
        document.getElementById("tomorrowTimeZone").innerHTML=data.results.timezone;
      })
      .catch(error => console.error('Error:', error))
}

function clearTodayData(){
        document.getElementById("todaySunrise").innerHTML=""
        document.getElementById("todaySunset").innerHTML="";
        document.getElementById("todayDawn").innerHTML="";
        document.getElementById("todayDusk").innerHTML=""
        document.getElementById("todayDayLength").innerHTML="";
        document.getElementById("todaySolarNoon").innerHTML="";
        document.getElementById("todayTimeZone").innerHTML="";
}

function clearTomorrowData(){
        document.getElementById("tomorrowSunrise").innerHTML="";
        document.getElementById("tomorrowSunset").innerHTML="";
        document.getElementById("tomorrowDawn").innerHTML="";
        document.getElementById("tomorrowDusk").innerHTML="";
        document.getElementById("tomorrowDayLength").innerHTML="";
        document.getElementById("tomorrowSolarNoon").innerHTML="";
        document.getElementById("tomorrowTimeZone").innerHTML="";
}