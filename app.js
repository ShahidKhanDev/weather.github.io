// sidebar toggler
let menuBtn = document.querySelector('.menu');
let sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  hideSidebar(mediaWindow);
  mediaWindow.addListener(hideSidebar);
});

// automatically hide sidebar when the max-width is 768px
var mediaWindow = window.matchMedia('(max-width: 768px)');

function hideSidebar(mediaWindow) {
  if (mediaWindow.matches) {
    sidebar.classList.remove('active');
  }
}

// sound button
let sound = document.querySelector('.sound');
let soundIcon = document.querySelector('.sound-icon');
let volumeOffIcon = document.querySelector('.volume-off');
let volumeOnIcon = document.querySelector('.volume-on');
let soundText = document.querySelector('.sound-text');

const API_KEY = `6cbb713e07f1c0b625e373dc0d3889ca`;
const form = document.querySelector('#form');
const searchInput = document.querySelector('.search-input');
const errorContainer = document.querySelector('.error-container');
const errorOkBtn = document.querySelector('.ok-btn');

// const API = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

// const IMG_URL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

const getWeather = async (city) => {
  let cityText = document.querySelector('.city');
  let weatherNumb = document.querySelector('.numb');
  let weatherType = document.querySelector('.weather-type');
  let feelLike = document.querySelector('.feel');
  let sunrise = document.querySelector('.sunrise');
  let sunset = document.querySelector('.sunset');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  cityText.textContent = 'getting weather info';

  if (response.status === 404) {
    cityText.textContent = '';
    weatherNumb.textContent = '--';
    weatherType.textContent = 'unknown';
    feelLike.textContent = 'Feels Like';
    sunrise.innerHTML = `<i class="ri-sun-fill"></i> Sunrise`;
    sunset.innerHTML = `<i class="ri-moon-fill"></i> Sunset`;
    weatherMain.style.backgroundImage = '';
    errorContainer.classList.add('active');
  } else {
    const data = await response.json();
    console.log(data);
    return showWeather(data);
  }
};

const weatherImages = [
  {
    image_path: 'images/clear.jpg',
  },
  {
    image_path: 'images/cloud.jpg',
  },
  {
    image_path: 'images/drizzle.jpg',
  },
  {
    image_path: 'images/rain.jpg',
  },
  {
    image_path: 'images/snow.jpg',
  },
  {
    image_path: 'images/thunder.jpg',
  },
  {
    image_path: 'images/mist.jpg',
  },
];

// let mainWeather = document.querySelector('.main');

let weatherMain = document.querySelector('.main');
let backgroundImg = document.querySelector('.main .bg-img');
let weatherMore = document.querySelector('.weather-more');

const showWeather = (data) => {
  let sunRise = data.sys.sunrise;
  let datesunRise = new Date(sunRise * 1000);
  let timeRise = datesunRise.toLocaleTimeString();

  let sunSet = data.sys.sunset;
  let dateSunset = new Date(sunSet * 1000);
  let timeSet = dateSunset.toLocaleTimeString();

  let weatherTypeMain = data.weather[0].main;
  let weatherTypeID = data.weather[0].id;

  weatherMain.innerHTML = `
          <div class="weather-details active">
            <h2 class="city">${data.name}, ${data.sys.country}</h2>
            <div class="weather-data">
              <h3 class="numb">${Math.floor(data.main.temp)}</h3>
              <div class="weather-degree">
                <span class="cel active">C</span>
                <span class="far">F</span>
              </div>
            </div>
              <h2 class="weather-type">${data.weather[0].main}</h2>

            <div class="weather-more">
              <ul>
                <li class="feel">Feels Like ${data.main.feels_like}</li>
              </ul>
              <ul class="flex-row">
              <li class="sunrise"><i class="ri-sun-fill"></i> Sunrise ${timeRise}</li>
              <li class="sunset"><i class="ri-moon-fill"></i> Sunset ${timeSet}</li>
              </ul>
            </div>
          </div>`;

  // background image will change according to the weather type
  const backImage = () => {
    if (weatherTypeMain == 'Clear') {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[0].image_path})`;
    } else if (weatherTypeMain == 'Clouds') {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[1].image_path})`;
    } else if (weatherTypeMain == 'Drizzle') {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[2].image_path})`;
    } else if (weatherTypeMain == 'Rain') {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[3].image_path})`;
    } else if (weatherTypeMain == 'Snow') {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[4].image_path})`;
    } else if (weatherTypeMain == 'Thunderstorm') {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[5].image_path})`;
    } else if (weatherTypeID >= 701 <= 781) {
      weatherMain.style.backgroundImage = `linear-gradient(to bottom ,rgb(0,0,0,0.5),rgb(0,0,0,0.7)),url(${weatherImages[6].image_path})`;
    }
  };

  backImage();

  const weatherToSpeech = () => {
    var weather = new SpeechSynthesisUtterance();

    weather.text = `The weather in ${data.name} is ${
      data.weather[0].main
    } , and the temprature is ${Math.floor(data.main.temp)} degree celsius`;
    window.speechSynthesis.speak(weather);
  };

  weatherToSpeech();

  // degree unit conversion
  let weatherDegree = document.querySelector('.weather-degree');
  let far = document.querySelector('.far');
  let cel = document.querySelector('.cel');

  // <-- celsius to fahrenheit
  far.addEventListener('click', () => {
    let tempNum = document.querySelector('.numb');
    let cTemp = Math.floor((data.main.temp * 9) / 5 + 32);
    tempNum.textContent = cTemp;

    weatherDegree.classList.add('active');
    far.classList.add('active');
    cel.classList.remove('active');
  });

  // <-- fahrenheit to celsius
  cel.addEventListener('click', () => {
    let tempNum = document.querySelector('.numb');
    let fTemp = Math.floor(data.main.temp);
    tempNum.textContent = fTemp;

    weatherDegree.classList.remove('active');
    cel.classList.add('active');
    far.classList.remove('active');
  });
};

// back button
let backBtn = document.querySelector('.back');

backBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchWrapper.classList.remove('active');
});

// search button
let searchBtn = document.querySelector('.search');
let searchWrapper = document.querySelector('.search-wrapper');

//when user click on search icon it will search the weather
searchBtn.addEventListener('click', () => {
  if (searchInput.value == '') {
    searchWrapper.classList.toggle('active');
  } else {
    getWeather(searchInput.value);
  }
});

//when user hit the enter button in search box it will search the weather

searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    getWeather(searchInput.value);
  }
});

// sound button
sound.addEventListener('click', () => {
  if (soundText.textContent == 'Sound Off') {
    volumeOffIcon.style.display = 'none';
    volumeOnIcon.style.display = 'block';
    soundText.textContent = 'Sound On';
  } else if (soundText.textContent == 'Sound On') {
    volumeOnIcon.style.display = 'none';
    volumeOffIcon.style.display = 'block';
    soundText.textContent = 'Sound Off';
  }
});

// error message
errorOkBtn.addEventListener('click', () => {
  errorContainer.classList.remove('active');
});

// show search suggestions

import { countries } from './countries.js';

const suggetionsList = document.querySelector('.suggestions-list');

searchInput.addEventListener('keyup', function () {
  suggetionsList.style.display = 'block';
  const input = searchInput.value;
  suggetionsList.innerHTML = '';
  const suggestions = countries.filter(function (country) {
    return country.name.toLowerCase().startsWith(input);
  });
  suggestions.forEach((suggested) => {
    let regx = new RegExp(`^${searchInput.value}`, 'gi');
    const suggestion = document.createElement('li');
    suggestion.classList.add('suggestion');
    suggestion.innerHTML = suggested.name.replace(
      regx,
      (match) => `<mark>${match}</mark>`
    );
    suggetionsList.appendChild(suggestion);
    suggestion.addEventListener('click', function () {
      searchInput.value = suggestion.textContent;
      getWeather(searchInput.value);
      suggetionsList.style.display = 'none';
    });
  });
  if (input === '') {
    suggetionsList.innerHTML = '';
  }
});
