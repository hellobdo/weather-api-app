const searchBar = document.getElementById("searchBar");
const submit = document.getElementById("submit");
const city = document.getElementById("location");
const temp = document.getElementById("temperature");
const tempText = document.getElementById("tempText");
const loader = document.querySelector(".loading-container");

let api_key = ""
let blankUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

async function apiFetch (url) {
    const response = await fetch(
        url,
        { mode: 'cors' }
    ); // this returns a Response object, not the actual JSON data

    const weatherData = await response.json(); // parses the response body into a JS object
    const temperatureFr = weatherData.days[0].temp
    return convertFrToCls(temperatureFr).toFixed(2); // then we can access the URL
};

async function handleClick() {
    city.textContent = "";
    tempText.textContent = "";
    temp.textContent = "";
    loader.style.display = "flex";
    let locatie = searchBar.value;
    let url = blankUrl + locatie + "?key=" + api_key;
    apiFetchTemp = await apiFetch(url);
    temp.textContent = apiFetchTemp + " celsius"
    loader.style.display = "none";
    tempText.textContent = "current temperature is"
    city.textContent = locatie;
    searchBar.value = "";
}

submit.addEventListener("click", handleClick);


function convertFrToCls (fr) {
    return (((fr - 32) * 5) / 9)
}