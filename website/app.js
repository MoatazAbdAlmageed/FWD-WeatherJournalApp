/* Global Variables */
const $generate = document.getElementById("generate");
const $zip = document.getElementById("zip");
const $feelings = document.getElementById("feelings");
const $date = document.getElementById("date");
const $temp = document.getElementById("temp");
const $content = document.getElementById("content");

const apiKey = "371a19fb807533bbc7212ae682d69f97";
const openweathermapURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

async function getData(url = "") {
  const response = await fetch(url);
  return response.json();
}
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

$generate.addEventListener("click", (e) => {
  getData(`${openweathermapURL}&zip=${$zip.value}`).then((weather) => {
    const entry = {
      temperature: weather.weather[0].main,
      date: newDate,
      feelings: $feelings.value,
    };

    postData("/add", entry).then((addData) => {
      getData("/getRecent").then((projectData) => {
        const { temperature, date, feelings } = projectData;
        $temp.innerText = temperature;
        $date.innerText = date;
        $content.innerText = feelings;
      });
    });
  });
});
