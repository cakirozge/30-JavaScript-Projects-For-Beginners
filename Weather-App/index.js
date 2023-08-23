const apiKey = "783d09a7cca4a28ba6a279e6a87ff7da"; //open weather da oluşturduğum api key
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //api url

const searchBox = document.querySelector(".search input"); //3- searchBox ile input giriş alanındaki veriyi almak için bir değişken oluşturduk.
const searchBtn = document.querySelector(".search button"); //4- searchBtn ile butona tıklandığında inputu göndermesi için değişken oluşturduk.
const weatherIcon = document.querySelector(".weather-icon"); //7- hava durumu icon değiştirmek için değişkenimizi oluşturduk.

async function checkWeather(city) {
  //1- şehrin hava durumunu çağırmasını istiyoruz
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`); //2-şekrin hava durumunun fetch edilmesini sağlıyoruz. (kontrol)

  //12- hata mesajını oluşturuyoruz.
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block"; // status 404 ise .error gelir.
    document.querySelector(".weather").style.display = "none"; // .weather (hiç olmaz) gizlensin
  } else { //13- hata mesajı gelmez ise response.status == 404 e eşit olmadığında yalnızca verileri günceller.
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    //6- (0. dizi olduğu için) response.json dan aldığımız icon verilerini gösterebilmek için oluşturuyoruz.
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png"; //7-src ile kaynak dosyasından güncellenecek
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    //9- css de ekranı gizledik. bu özellikle inputa girdi girince .weather yeniden görüntülenebilecek.
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none"; // status== 404 olmadığında veriler güncellenir .error gizlenir. 
  }
}

searchBtn.addEventListener("click", () => {
  //5- tıklama olduğunda şehir hava durumunun olup olmadığını kontrol eder.
  checkWeather(searchBox.value);
});
