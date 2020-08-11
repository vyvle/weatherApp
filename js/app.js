window.addEventListener('load', () => {
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let locationWeather = document.querySelector("img");
    let button = document.querySelector('#button');
    let degreeSection = document.querySelector(".temperature");
    let userInput = document.querySelector('#userInput');
    let history = document.querySelector('#hist');
    const temperatureSpan = document.querySelector(".temperature span");

        button.onclick = function () {
        const inputText = userInput.value;
        console.log(inputText)
        history.textContent = "Last searched: " + localStorage.getItem('city');

        const key = '90dabef470cc7f3bb34688823ae1d104'
        const api = `http://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${key}`;
        fetch(api).then(function (response) {
            return response.json();
        }).then(data => {
            console.log(data);
            const {temp} = data.main;
            const city = data.name;
            localStorage.setItem('city',city);
            sessionStorage.setItem('city',city);

            const {icon, description} = data.weather[0];
            let celsius = Math.floor(temp - 273.15);
            temperatureDegree.textContent = celsius;
            locationWeather.src = "img/icons/" + icon + ".png"
            temperatureDescription.textContent = description;
            locationTimeZone.textContent = city;
            
            let fahr = Math.floor(((temp - 273.15) * (9 / 5)) + 32);
            
            degreeSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === "°C") {
                    temperatureSpan.textContent = "°F";
                    temperatureDegree.textContent = fahr;
                } else {
                    temperatureSpan.textContent = "°C";
                    temperatureDegree.textContent = celsius;
                }
            });
        })


    }
});
