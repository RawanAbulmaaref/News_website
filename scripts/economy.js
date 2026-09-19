// ================================================
// ================Data Section====================
// ================================================
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






    

let economicHeadlines = [];
const getEconomicHeadlines = async () => {
    try {
        let res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_2667674e0e7f49d68db1b630c5c0a2af&category=business&language=ar`)
        let Edata = await res.json()
        economicHeadlines = Edata.results.filter(Ed => Ed.image_url != null)
            return economicHeadlines

    } catch (err) {
        console.error(err);
    }
}

let globalEconomyNews=[]
const getGlobalEconomyNews = async () => {
    try {
        let res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_2667674e0e7f49d68db1b630c5c0a2af&category=business&language=ar`)
        let Edata = await res.json()
        globalEconomyNews = Edata.results.filter(Ed => Ed.image_url != null)
        return globalEconomyNews

    } catch (err) {
        console.error(err);
    }
}

let egxNews = [];
const getEgxNews = async () => {
    try {
        let res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_2667674e0e7f49d68db1b630c5c0a2af&category=business&language=ar&country=eg`)
        let Edata = await res.json()
        egxNews = Edata.results.filter(Ed => Ed.image_url != null)
        return egxNews

    } catch (err) {
        console.error(err);
    }
}

let usMarketsNews = [];
const getUsMarketsNews = async () => {
    try {
        let res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_2667674e0e7f49d68db1b630c5c0a2af&category=business&language=ar&country=us`)
        let Edata = await res.json()
        usMarketsNews = Edata.results.filter(Ed => Ed.image_url != null)
        return usMarketsNews

    } catch (err) {
        console.error(err);
    }
}



// ================================================
// ================Slider Section==================
// ================================================

let currentSlide = 0;
const dots = document.querySelectorAll('.dot')
const slider = document.querySelector('.slider');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close');


getEconomicHeadlines().then(() => {
    economicHeadlines.slice(0,5).forEach((element, i) => {
        let slide = document.createElement('div');
        slide.classList.add('slide')
        if (i === 0) slide.classList.add('active');
        slide.style.backgroundImage = `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.9)
    ),
    url(${element.image_url})`;
        // ================================
        slide.innerHTML = `<div class="content">
      <span class="category">${element.category[0]||'اخبار'}</span>
      <h2>${element.title}</h2>
      <p>${element.description.slice(0,60)+'...'}</p>
      <button class="readmore">اقرأ المزيد</button>
    </div>`

        slider.appendChild(slide)
        dots[currentSlide].classList.add('active')

        document.querySelectorAll('.readmore').forEach(btn => {
            btn.onclick = () => {
                modal.style.display = 'flex';
                modalImg.src = economicHeadlines[currentSlide].image_url;
                modalTitle.textContent = economicHeadlines[currentSlide].title;
                modalText.textContent = economicHeadlines[currentSlide].description;
            };
        });
    });
})

const nxt = document.getElementById('nxt')
const pre = document.getElementById('pre')
const changeDir = (dir) => {
    const slides = document.querySelectorAll('.slide');

    let len = slides.length
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active')

    currentSlide = (currentSlide + len + dir) % len;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active')

}
nxt.onclick = () => changeDir(1)
pre.onclick = () => changeDir(-1)

setInterval(() => {
    changeDir(1)
}, 2000)


closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';

    }
};

// ================================================
// ================globalEconomyNews Section=======
// ================================================

getGlobalEconomyNews().then(() => {
    const global = document.querySelector('.global-cards');
    globalEconomyNews.slice(0,6).forEach((element, i) => {
        let card = document.createElement('div');
        card.classList.add('global-card');
        card.innerHTML = `<div class="global-card-content"><p>${element.title}</p></div>
    
    <button>اقرأ المزيد</button>
    `
        card.style.backgroundImage = `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.7)
    ),
    url(${element.image_url})`;
        global.append(card);
        let cardBtn = card.querySelector('button');

        card.onmouseover = () => {
            cardBtn.style.display = 'block';
            card.style.backgroundImage = `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 1)
    ),
    url(${element.image_url})`;
        };

        card.onmouseout = () => {
            cardBtn.style.display = 'none';
            card.style.backgroundImage = `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
    ),
    url(${element.image_url})`;
        };

        cardBtn.onclick = () => {
            modal.style.display = 'flex';
            modalImg.src = element.image_url;
            modalTitle.textContent = element.title;
            modalText.textContent = element.description;
        };
    })
})

// ================================================
// ================usMarketsNews&egxNews Section===
// ================================================

let EgyptMarket = document.querySelector('.EgyptMarket')
let USMarket = document.querySelector('.USMarket')
getEgxNews().then(() => {
    egxNews.slice(0,3).forEach((item) => {
        const marketCard = document.createElement('div');
        marketCard.classList.add('market-card');

        marketCard.innerHTML = `
        <div class="image-wrapper">
            <img src="${item.image_url}" alt="">
            <span class="percent">${item.change||'5'}</span>
        </div>
        <div class="info">
            <h3>${item.title}</h3>
            <p>${item.description.slice(0, 60) + '...'}</p>
        </div>
    `;
        EgyptMarket.appendChild(marketCard);
        marketCard.onclick = () => {
            modal.style.display = 'flex';
            modalImg.src = item.image_url;
            modalTitle.textContent = item.title;
            modalText.textContent = item.description;
        }
    });
})
getUsMarketsNews().then(() => {
    usMarketsNews.forEach((item) => {
        const marketCard = document.createElement('div');
        marketCard.classList.add('market-card');

        marketCard.innerHTML = `
        <div class="image-wrapper">
            <img src="${item.image_url}" alt="">
            <span class="percent">${item.change || '5'}</span>
        </div>
        <div class="info">
            <h3>${item.title}</h3>
            <p>${item.description.slice(0, 60) + '...'}</p>
        </div>
    `;
        USMarket.appendChild(marketCard);
        marketCard.onclick = () => {
            modal.style.display = 'flex';
            modalImg.src = item.image_url;
            modalTitle.textContent = item.title;
            modalText.textContent = item.content;
        }
    });
})
// ================================================
// ================usdExchangeData&goldPriceData===
// ================================================
// Gold price data for the last 3 months
const goldPriceData = [
    { month: 'أكتوبر', value: 1920 },
    { month: 'نوفمبر', value: 1985 },
    { month: 'ديسمبر', value: 2045 },
    { month: 'يناير', value: 2130 },
];

// USD to EGP exchange rate data for the last 3 months
const usdExchangeData = [
    { month: 'أكتوبر', value: 30.85 },
    { month: 'نوفمبر', value: 30.92 },
    { month: 'ديسمبر', value: 30.88 },
    { month: 'يناير', value: 30.95 },
];

let goldChart = document.getElementById('goldChart')
let goldChartValues = goldPriceData.map(e => e.value)
let usdChart = document.getElementById('usdChart')
let usdChartValues = usdExchangeData.map(e => e.value)
// =============================================
let ctx1 = goldChart.getContext('2d');
new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير'],
        datasets: [{
            label: '',
            data: goldChartValues,
            borderColor: '#d4af37',
            backgroundColor: '#d4af37',
            tension: 0.3,
            pointBackgroundColor: '#d4af37',
            pointRadius: 5,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                grid: { color: '#eee' },
                ticks: { color: '#555', font: { size: 13 } }
            },
            y: {
                grid: { color: '#eee' },
                ticks: { color: '#555', font: { size: 12 } }
            }
        }
    }
});
// =============================================
let ctx2 = usdChart.getContext('2d');
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير'],
        datasets: [{
            label: 'سعر الدولار',
            data: usdChartValues,
            borderColor: '#007bff',
            backgroundColor: '#007bff',
            tension: 0.3,
            pointBackgroundColor: '#007bff',
            pointRadius: 5,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },

        scales: {
            x: {
                grid: { color: '#eee' },
                ticks: { color: '#555', font: { size: 13 } }
            },
            y: {
                grid: { color: '#eee' },
                ticks: { color: '#555', font: { size: 12 } }
            }
        }
    }
});
