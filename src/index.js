import "./style.css";

// async function currentWeatherFunc() {
//   const response = await fetch(
//     "https://api.weatherapi.com/v1/current.json?key=316de150a21a4c8eb5b62257231210&q=jakarta",
//   );
//   const currentWeatherData = await response.json();
//   return currentWeatherData;
// }

async function forecastWeatherFunc(name) {
  const response2 = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=316de150a21a4c8eb5b62257231210&q=${name}&days=4`,
  );
  const forecastWeatherData = await response2.json();
  return forecastWeatherData;
}



class Weather {
    constructor(areaName, todayCondition, todayCurrentTemp, todayFeelsLike, todayHumidity,
                tomorrowDate, tomorrowMaxTemp, tomorrowMinTemp, tomorrowAvgTemp){
        this.areaName = areaName;
        this.today = {
            condition: todayCondition,
            currentTemp: todayCurrentTemp,
            feelsLike: todayFeelsLike,
            humidity: todayHumidity
        }
        this.forecast1day = {
            date: tomorrowDate,
            maxTemp: tomorrowMaxTemp,
            minTemp: tomorrowMinTemp,
            avgTemp: tomorrowAvgTemp
        }
    }
}

function processForecast(result) {

    const weatherData = new Weather(result.location.name,
                                   result.current.condition.text,
                                   result.current.temp_c,
                                   result.current.feelslike_c,
                                   result.current.humidity,
                                   result.forecast.forecastday[1].date,
                                   result.forecast.forecastday[1].day.maxtemp_c,
                                    result.forecast.forecastday[1].day.mintemp_c,
                                    result.forecast.forecastday[1].day.avgtemp_c )
    // console.log(result);
    // console.log(result.current.condition.text);
    // console.log(result.current.temp_c)
    // console.log(`feels like = ${result.current.feelslike_c}`);
    // console.log(`humidity = ${result.current.humidity}`);

    // console.log(`date = ${result.forecast.forecastday[1].date}`);
    // console.log(`maxTemp = ${result.forecast.forecastday[1].day.maxtemp_c}`);
    // console.log(`minTemp = ${result.forecast.forecastday[1].day.mintemp_c}`);
    // console.log(`avgTemp = ${result.forecast.forecastday[1].day.avgtemp_c}`)

    // console.log(`date = ${result.forecast.forecastday[2].date}`);
    // console.log(`maxTemp = ${result.forecast.forecastday[2].day.maxtemp_c}`);
    // console.log(`minTemp = ${result.forecast.forecastday[2].day.mintemp_c}`);
    // console.log(`avgTemp = ${result.forecast.forecastday[2].day.avgtemp_c}`);

    // console.log(`date = ${result.forecast.forecastday[3].date}`);
    // console.log(`maxTemp = ${result.forecast.forecastday[3].day.maxtemp_c}`);
    // console.log(`minTemp = ${result.forecast.forecastday[3].day.mintemp_c}`);
    // console.log(`avgTemp = ${result.forecast.forecastday[3].day.avgtemp_c}`);
    return weatherData;
}

forecastWeatherFunc("jakarta").then(result => processForecast(result))

   

const form = document.querySelector("form");
const searchBar = document.querySelector(".search")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    forecastWeatherFunc(searchBar.value).then(result => processForecast(result))
    form.reset();
})
