const form = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;

  //update deatails template

  details.innerHTML = `
                <h5 class="my-3">${cityDets.EnglishName}</h5>
                 <div class="my-3">${weather.WeatherText}</div>
                 <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                 </div>
    `;

  //update the night/day & icons
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }

  time.setAttribute("src", timeSrc);

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets: cityDets,
    weather: weather,
  };
};

form.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  // get the city value
  const city = form.city.value.trim();
  form.reset();

  // upadate the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // set a local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

// const result = true ? 'value1 ' : 'value 2';
// console.log(result );
