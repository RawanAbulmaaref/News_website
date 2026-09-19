// const tickerNews = [
//     'الأهلي يتأهل لنهائي دوري أبطال أفريقيا',
//     'ارتفاع أسعار الذهب عالمياً',
//     'الرئيس يفتتح مشروع تنموي جديد',
//     'منتخب مصر يستعد لمواجهة حاسمة',
//     'تطورات جديدة في الأوضاع الاقتصادية',
//     'افتتاح معرض القاهرة الدولي للكتاب',
// ];

let tickerNews = [];
const getTickerNews = async () => {
    try {
        let res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_2667674e0e7f49d68db1b630c5c0a2af&language=ar&country=eg`)
        let Edata = await res.json()
        tickerNews = Edata.results.filter(Ed => Ed.image_url != null).map(e=>e.title)
        return tickerNews

    } catch (err) {
        console.log(err);
    }
}

getTickerNews().then(() => {
    console.log(tickerNews)
})

getTickerNews().then(() => {

    const tickerTrack = document.getElementById('newsMarquee');
    if (!tickerTrack) return;

    tickerNews.forEach(newsItem => {
        const span = document.createElement('span');
        span.textContent = newsItem;
        tickerTrack.appendChild(span);
    });
})