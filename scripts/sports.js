// weather api 
const weatherCity = `Cairo`
const countryCode = `EG`
const weatherKey = 'ab3199dbf67ac8107e758cc858527b99'
const weatherEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity},${countryCode}&appid=${weatherKey}&units=metric&lang=ar`
fetch(weatherEndPoint).then(response =>
    response.json())
    .then(data => {
        const temp = data.main.temp;
        const cityName = data.name
        const humidity = data.main.humidity
        const description = data.weather[0].description
        document.getElementById("temp").innerHTML = `درجة الحرارة ℃${temp}`
        document.getElementById("humidity").innerHTML = ` الرطوبة ${humidity}`
        document.getElementById("description").innerHTML = ` حالة الطقس: (${description}) `
        document.getElementById("city").innerHTML = data.name
    }).catch(Error => console.log(Error))

// currency api 
const currencyKey = '3c8da38fe19cd241bfa47fcc'
const currencyEndPoint = `https://v6.exchangerate-api.com/v6/3c8da38fe19cd241bfa47fcc/latest/USD`
fetch(currencyEndPoint).then(response =>
    response.json()
)
    .then(data => {
        const egp = data.conversion_rates.EGP;
        document.querySelector("#currency").innerHTML = egp

    }).catch(Error => console.log(Error))















let matchesBtns = document.querySelectorAll(".matches-btn");
let yesterdayBtn = document.querySelector(".yesterday-btn");
let todayBtn = document.querySelector(".today-btn");
let tommorowBtn = document.querySelector(".tommorow-btn");
let matchesView = document.querySelector(".matches-view");


matchesBtns[1].classList.add("active");
matchesBtns.forEach((btn) => {
    btn.addEventListener("click", function() {
        matchesBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
    
});

let numberOfMatches = 3;


let competitorOne = "";
competitorOne = ["الأهلي", "الزمالك", "إنبي", "سيراميكا",  "المقاولون", "طلائع الجيش"];
let competitorTwo = "";
competitorTwo = ["غزل المحلة", "المصري", "الاسماعيلي", "الجونة", "بيراميدز"];


function randomMatches() {
    for (let i = 0; i < numberOfMatches; i++) {
        let div = document.createElement("div");
        div.classList.add("match-card");
        let competitorsDiv = document.createElement("div");
        matchesView.appendChild(div);
        div.appendChild(competitorsDiv);
        competitorsDiv.style.display = "flex";
        competitorsDiv.innerHTML = `
        <div class="comp-div">
            <img src="../sports images/ball.jpg" alt="ball image" class="ball-image">
            <p>${competitorOne[Math.floor(Math.random() * competitorOne.length)]}</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
            <p style="color: #3c3e41ff;">VS</p>
            <p style="color: #333;">17:00</p>
        </div>
        <div class="comp-div">
            <img src="../sports images/ball.jpg" alt="ball image" class="ball-image">
            <p>${competitorTwo[Math.floor(Math.random() * competitorTwo.length)]}</p>
        </div>
        `
    }
}

randomMatches();

matchesBtns.forEach((btn) => {
    btn.onclick = function () {
        matchesView.innerHTML = "";
        randomMatches();
    }
})


let newCards = document.querySelector(".sports-news-cards");
let numberOfSportsNews = 4;
let newsTitles = ["صلاح يسجل هدفاً رائعاً في الدوري الإنجليزي", "الزمالك يتأهل لنصف نهائي كأس مصر", "بيراميدز يعزز صدارة جدول الترتيب", "الأهلي يستعد لمواجهة الزمالك في القمة"]

for (let i = 0; i < numberOfSportsNews; i++) {
    let div = document.createElement("div");
    let readMoreBtn = document.createElement("button");
    div.classList.add("sports-news-card");
    div.innerHTML = `
        <img src="../sports images/ball.jpg" alt="ball image">
        <span>${newsTitles[i]}</span>
        <button class="readmore-btn">اقرأ المزيد</button>
    `
    newCards.appendChild(div);
}


let teamsTable = document.querySelector(".teams-table");
let firstFourTeams = 4;
let rankedTeams = ["الأهلي", "الزمالك", "بيراميدز", "إنبي"];
for (let i = 1; i <= firstFourTeams; i++) {
    let div = document.createElement("div");
    div.classList.add("table");
    let team = document.createElement("div");
    team.classList.add("team")
    team.style.display = "flex";
    team.innerHTML = `
        <span>${i}</span>
        <span style="display: flex; gap: 30px; align-items: center;">
            ${rankedTeams[i - 1]}
            <span style="display: flex; flex-direction: column;">
                <span>م</span>
                <span>20</span>
            </span>
            <span style="display: flex; flex-direction: column;">
                <span>ف</span>
                <span>${17 - i}</span>
            </span>
            <span style="display: flex; flex-direction: column;">
                <span>خ</span>
                <span>${i}</span>
            </span>
            <span style="display: flex; flex-direction: column;">
                <span>ن</span>
                <span>${45 - i}</span>
            </span>
        </span>
    `
    div.appendChild(team);
    teamsTable.appendChild(div);
}