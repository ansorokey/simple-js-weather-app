const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=0e5e280813d9df136cbf020bd12b0446';

async function checkWeather(city='london') {
    // This is so cool!
    // We can use the query selector and psuedo elements to find the checked radio input for the specified group
    const units = document.querySelector('input[name=units]:checked').value;

    const response = await fetch(apiURL + city + '&units=' + units + apiKey);
    if(response.ok) {
        const res = await response.json();

        // update the values of these fields with the relevant information
        document.querySelector('.city').innerHTML = res.name;
        document.querySelector('.temp').innerHTML = Math.round(res.main.temp) + (units === 'imperial' ? '°f' : '°c');
        document.querySelector('.humidity').innerHTML = res.main.humidity + '%';
        document.querySelector('.wind').innerHTML = res.wind.speed + (units === 'imperial' ? 'mph' : 'km/h');

        // find the image element to change the image for the weather status
        const weatherIcon = document.querySelector('.weather-icon');
        // api returns an array of selected cities, we only need the first element
        switch(res.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = '/assets/images/clouds.png'
                break;
            case 'Clear':
                weatherIcon.src = '/assets/images/clear.png'
                break;
            case 'Rain':
                weatherIcon.src = '/assets/images/rain.png'
                break;
            case 'Drizzle':
                weatherIcon.src = '/assets/images/drizzle.png'
                break;
            case 'Mist':
                weatherIcon.src = '/assets/images/mist.png'
                break;
        }

        // if we get a city back, show the weather, hide the error
        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.err').style.display = 'none';
    } else if(response.status === 404) {
        // if we don't get a city back, show the error, hide the weather
        document.querySelector('.err').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
}

let searchBox = document.querySelector('.search input');
let searchButton = document.querySelector('.search button');
// add an event listener to the search button
searchButton.addEventListener('click', ()=> {
    checkWeather(searchBox.value);
})

// since we aren't using a form, we don't have default submit actions with enter key
// add an extra event listener that fires when enter is pressed
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
})

// there are multiple radio button, so use this to get an array of each button
// then iterate through all buttons in the group and add an evenmt listener
// Only fetches new data if a city has already been recieved
document.querySelectorAll('input[name=units]').forEach(radio => {
    radio.addEventListener('click', (e) => {
        console.log('fired');
        if(document.querySelector('.city').innerText !== '') {
            checkWeather(searchBox.value);
        }
    })
})
