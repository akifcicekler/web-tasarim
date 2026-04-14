const apikey = "162cd2cfef534c0e97875045250310";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const url = (city) =>
  `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;


async function lokasyonBilgisi(city) {
  const resp = await fetch(url(city));
  const respData = await resp.json();

  if (resp.error) {
    return uyariMesaji();
  } else {
    havaDurumuBilgisi(respData);
  }
}

function havaDurumuBilgisi(data) {
  const temp = data.current.temp_c;

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2><img src="${data.current.condition.icon}" /> ${temp}°C </h2>
        <small>${data.current.condition.text} - </small>
        <small><label>${data.location.country}</label>,</small>
        <small>${data.location.name}</small>
    `;

  // cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    lokasyonBilgisi(city);
  } else {
    return uyariMesaji();
  }
});

function uyariMesaji() {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = " Konum bilgisi bulunmamaktadır !!! ";
  container.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2000);
  main.innerHTML = "";
}