// instagram profile url which needs to be scraped
const INSTAGRAM_PROFILE_USERNAME = "dummy";

const HEADLESS = true;

const SLOW_MO = 0;

// instagram profile username which will be used for the scraping
const SCRAPING_ACCOUNT_USERNAME = "";

// instagram profile password which will be used for the scraping
const SCRAPING_ACCOUNT_PASSWORD = "";

const OUTPUT_DIR = "data";


// ---------------------------------------------------------------------------

const puppeteer = require('puppeteer');

const fs = require('fs');
const https = require('https');

var totalImages = 0;

var imgData = new Set();


(async () => {

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }


    var SCRAPE_URL = `https://www.instagram.com/accounts/login/?hl=en&next=${INSTAGRAM_PROFILE_USERNAME}&source=desktop_nav`;


    const browser = await puppeteer.launch({ headless: HEADLESS, slowMo: SLOW_MO });
    const page = await browser.newPage();
    await page.goto(SCRAPE_URL, {
        waitUntil: 'networkidle2',
    });

    await page.keyboard.press('Tab');

    await page.keyboard.press('Tab');

    await page.keyboard.type(SCRAPING_ACCOUNT_USERNAME);

    await page.keyboard.press('Tab');

    await page.keyboard.type(SCRAPING_ACCOUNT_PASSWORD);

    await page.keyboard.press('Enter'); // this completes the login part

    await page.waitForTimeout(10000);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');

    await page.waitForTimeout(8000);

    await autoScroll(page); // for scroll dynamically until end or on user click

    elem = await page.$$('._aagt');

    console.log(`Found ${imgData.size} posts`);

    for (let i of elem) {

        imgData.add(i);

    }

    for (let i of imgData) {

        try {

            totalImages++;

            let imageLink = await page.evaluate(el => el.src, i);

            await download(imageLink, `${totalImages}.jpg`);

        } catch (e) {
            console.log(e);
            continue;
        }

    }

    console.log('Scraping ended');

    await browser.close();

})();


const download = (url, destination) => new Promise((resolve, reject) => {

    destination = `./${OUTPUT_DIR}/` + destination;

    const file = fs.createWriteStream(destination);

    https.get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close(resolve(true));
        });

    }).on('error', error => {
        fs.unlink(destination);

        reject(error.message);
    });

});




const autoScroll = async (page) => {


    await page.evaluate(async () => {

        await new Promise((resolve, reject) => {

            var distance = 100;

            var timer = setInterval(() => {

                window.scrollBy(0, distance);

            }, 300);

            window.addEventListener('click', () => {

                clearInterval(timer);
                resolve();

            });


        });



    });

}