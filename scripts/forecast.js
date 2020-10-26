const key = "kMi1u2GP5wfSJ8chbKbWm6kwGGnWWkZs";

// get weather information

const getWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get city information
const getCity = async (city) => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);

  const data = await response.json();

  return data[0];
};

// getCity('Rabat')
//     .then(data => {
//         console.log(data);
//         return getWeather(data.Key);
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
