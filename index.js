const express = require('express');
const app = express();
const port = process.env.PORT;
const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const cors = require('cors');

app.use(cors());

function renew() {
    try {
        (async() => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
        
            await page.goto('https://naver.com');
            await page.waitForSelector('.ah_k',{timeout:1000});
            const result = await page.evaluate(() => {
                const Rank = Array.from(document.querySelectorAll('.ah_k'));
                return Rank.map(Rank => Rank.textContent);
            })
            let ArrayRank = new Array();
            for(let i = 0;i<10;i++){
                ArrayRank.push({rank:i+1,title:result[i]});
            }
            let JsonRank = JSON.stringify(ArrayRank);
            fs.writeFileSync('./ranking.json', JsonRank);
            await browser.close();
        })();
    }   catch (err) {
        console.log(err);
    }
}

app.get('/',(req,res) => {
    res.send('Hi I am API')
})

app.get('/naver/ranking',async(req, res) => {
    await fs.readFile('./ranking.json','utf8',(err,body) => {
         res.end(body);
     })
});

app.get('/naver/news',(req,res) => {
    let target = req.query.search ? encodeURI(req.query.search) : encodeURI("코로나바이러스");
    const url1 = `https://search.naver.com/search.naver?where=news&query=${target}&sm=tab_srt&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Add%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0`
    request(url1,function(err,res1,body) {
        if(err) throw err;
        const $ = cheerio.load(body);
        let news = [[],[],[],[]];
        $('a._sp_each_title').each(function(i){
            news[0][i] = $(this).text();
        })
        $('span._sp_each_source').each(function(i){
            news[1][i] = $(this).text();
        })
        $('a._sp_each_title').each(function(i){
            news[2][i] = $(this).attr('href');
        })
        let count = 0;
        $('img').each(function(i){
            if($(this).attr('width') == 80 && $(this).attr('height')== 80) {
                news[3][count] = $(this).attr('src');
                count += 1;
            }
        })
        var return_json = new Array();
        for(let i = 0;i<9;i++){
            let json = new Object();
            json.title = news[0][i];
            json.report = news[1][i];
            json.link = news[2][i];
            json.src = news[3][i];
            return_json.push(json);
        }
        res.send(JSON.stringify(return_json));
    })
})

app.get('/weather/seoul' , (req,res) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&appid=989addf791efe036126dcdfebe0e8107';
    request(url,(err,res1,body) => {
        if(err) throw err;
        res.send(body);
    })
})

app.get('/korea/infect',(req,res) => {
    let url = `https://ko.wikipedia.org/wiki/%EB%82%98%EB%9D%BC%EB%B3%84_%EC%BD%94%EB%A1%9C%EB%82%98%EB%B0%94%EC%9D%B4%EB%9F%AC%EC%8A%A4%EA%B0%90%EC%97%BC%EC%A6%9D-19_%EC%9C%A0%ED%96%89_%ED%98%84%ED%99%A9`;
    request(url,(error,response,body) => 
    {
    if(error) throw error;
    let $ = cheerio.load(body);
    var count = 0; //$(this).find('td').text()
    let data = [];
    $('table.wikitable > tbody > tr').each(function(post) {
        ($(this).find('td').attr('align') == "left" ?  
            $(this).find('td > a').attr('title') == "대한민국" ? data = $(this).text().split('\n') : null
        : null);
    })
    let korea_infection = new Array();
    korea_infection.push({name:data[1],infect:data[3],die:data[5],cure:data[7]});
    korea_infection_json = JSON.stringify(korea_infection);
    res.send(korea_infection_json);
    })
})

renew();
setInterval(renew,1000*60*60);

app.listen(port,()=>console.log(`listen at ${port}`));