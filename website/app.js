/**Description
 * https://openweathermap.org/current#zip
 * Get the weather By ZIP code
 * Please note if country is not specified then the search works for USA as a default.
 * API call: https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
 */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* Global Variables */
const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "df0d3461865ce0be174fd59d5d73da0a";

document
  .getElementById("generate")
  .addEventListener("click", generateBtnHandler);

function generateBtnHandler() {
  const country = document.getElementById("country").value;
  const zip = document.getElementById("zip").value;

  getWeatherByZibCode(baseUrl, zip, country, apiKey);
}

const getWeatherByZibCode = async (baseUrl, zipcode, countryCode, apiKey) => {
  const res = await fetch(
    `${baseUrl}${zipcode},${countryCode}&appid=${apiKey}`
  );

  try {
    const data = await res.json();
    data.date = newDate;
    data.feelings = document.getElementById("feelings").value;
    //console.log(data);
    UpdateData(data);
  } catch (error) {
    console.log(error);
  }
};

const UpdateData = async (data) => {
  const res = await fetch("/weather/save", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (data) => {
    const res = await fetch("/weather");
    try {
      waetherData = await res.json();
      console.log(waetherData);
      document.getElementById("date").innerHTML = waetherData.date;
      document.getElementById("temp").innerHTML = waetherData.temp;
      document.getElementById("content").innerHTML = waetherData.feelings;
    } catch (error) {
      console.log(error);
    }
  });
};
