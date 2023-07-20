const weather_3day = document.querySelector("#weather-3day");
const endpoint = "https://api.openweathermap.org/data/2.5/forecast?zip=97060&appid=4d9f17ef42374d8bec405fcc33edb96a&units=imperial";

async function apiFetchForecast() {
    try {
        const response = await fetch(endpoint);
        if(response.ok) {
            const data = await response.json()
            displayForecastResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecastResults(forecast_data) {
    let filtered_forecast = forecast_data.list.filter(forecast => forecast.dt_txt.includes(" 03:00:00"));
    filtered_forecast.shift();
    console.log("filtered_forcast: " + JSON.stringify(filtered_forecast));
    filtered_forecast.slice(0, 3).forEach(forecast_day => {
        console.log("forcast_day: " + JSON.stringify(forecast_day));
        let week_day = new Date(forecast_day.dt * 1000).toLocaleDateString("en", {weekday: "long"});
        const weather_icon = forecast_day.weather[0].icon;
        const icon_src = `https://openweathermap.org/img/w/${weather_icon}.png`;
        const temp = forecast_day.main.temp.toFixed(0);

        // create elements
        let forecast_day_div = document.createElement('div');
        forecast_day_div.className = "forecast-day";
        let day_name_para = document.createElement('p');
        day_name_para.className = "bold";
        day_name_para.textContent = week_day;
        let icon_img = document.createElement('img');
        icon_img.src = icon_src;
        icon_img.alt = "weather icon";
        let temp_div = document.createElement('div');
        temp_div.className = "forecast-day-temp";
        temp_div.textContent = `${temp}°F`;
        forecast_day_div.appendChild(day_name_para);
        forecast_day_div.appendChild(icon_img);
        forecast_day_div.appendChild(temp_div);
        weather_3day.appendChild(forecast_day_div);
    });
}

apiFetchForecast()