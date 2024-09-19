const apikey = "cb6bc69c377a03925c4b8012522df3e1";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-img");  // Select the weather icon image
const weatherContainer = document.querySelector(".weather");  // Select the weather container

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        var data = await response.json();

        // Update weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        // Show the weather container (previously hidden)
        weatherContainer.style.display = "block";

        // Update the weather icon based on the conditions
        if (data.weather[0].main === "Clouds") {
            WeatherIcon.src = "images1/cloudy.jpeg";
        } else if (data.weather[0].main === "Rain") {
            WeatherIcon.src = "images1/rain1.jpeg";
        } else if (data.weather[0].main === "Mist") {
            WeatherIcon.src = "images1/mist.jpeg";
        } else if (data.weather[0].main === "Clear") {
            WeatherIcon.src = "images1/sunny.jpg";
        }
         else {
            WeatherIcon.src = "images1/rain2.jpeg";  // Fallback image if needed
        }

    } catch (error) {
        alert(error.message);
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "--Km/h";
        // weatherContainer.style.display = "none";  // Hide weather data if not found
    }
}

// Event listener for search button click
SearchBtn.addEventListener("click", () => {
    const city = SearchBox.value.trim();  // Trim whitespace
    if (city) {
        checkweather(city);
    }
});
