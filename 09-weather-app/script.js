// Function to fetch weather data from the API
async function getWeatherData(location) {
    try {
        const apiKey = 'bdade00e143b8fc836092c42e933efb7';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data); // For now, just log the data
        return data;
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

// Function to process the JSON data and return required information
function processWeatherData(data) {
    return {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    };
}

// Function to display the weather information on the webpage
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.location}</h2>
        <img src="${data.icon}" alt="${data.description}">
        <p>${data.temperature}°C</p>
        <p>${data.description}</p>
    `;
}

// Form submission handler
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    
    document.getElementById('loading').style.display = 'block';
    const weatherData = await getWeatherData(location);
    document.getElementById('loading').style.display = 'none';
    
    if (weatherData && weatherData.cod === 200) {
        const processedData = processWeatherData(weatherData);
        displayWeather(processedData);
    } else {
        console.error('Location not found');
    }
});
