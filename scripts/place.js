// Footer dates
const yearSpan = document.getElementById("year");
const modifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
modifiedSpan.textContent = document.lastModified;

// Weather values (STATIC for now)
const temperature = 18; // °C
const windSpeed = 12;   // km/h

document.getElementById("temp").textContent = temperature;
document.getElementById("speed").textContent = windSpeed;

// Wind Chill function (metric)
function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

// Conditions check
let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
  windChill = `${calculateWindChill(temperature, windSpeed)} °C`;
}

document.getElementById("windchill").textContent = windChill;
