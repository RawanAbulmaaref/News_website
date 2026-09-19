// global economy grid — same data source and rendering logic as scripts/economy.js
let globalEconomyNews = [];
const getGlobalEconomyNews = async () => {
    try {
        const res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_2667674e0e7f49d68db1b630c5c0a2af&category=business&language=ar`);
        const data = await res.json();
        globalEconomyNews = (data.results || []).filter(item => item.image_url);
    } catch (err) {
        console.log(err);
    }
    return globalEconomyNews;
};

getGlobalEconomyNews().then(() => {
    const global = document.querySelector('.global-cards');
    if (!global) return;

    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close');

    globalEconomyNews.slice(0, 6).forEach(element => {
        const card = document.createElement('div');
        card.classList.add('global-card');
        card.innerHTML = `<div class="global-card-content"><p>${element.title}</p></div>
        <button>اقرأ المزيد</button>`;

        card.style.backgroundImage = `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.7)
        ),
        url(${element.image_url})`;

        global.append(card);
        const cardBtn = card.querySelector('button');

        card.onmouseover = () => { cardBtn.style.display = 'block'; };
        card.onmouseout = () => { cardBtn.style.display = 'none'; };

        cardBtn.onclick = () => {
            if (!modal) return;
            modal.style.display = 'flex';
            modalImg.src = element.image_url;
            modalTitle.textContent = element.title;
            modalText.textContent = element.description;
        };
    });

    if (closeBtn && modal) {
        closeBtn.onclick = () => modal.style.display = 'none';
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
});
