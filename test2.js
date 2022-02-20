const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const page = pages[0];
  await page.goto('http://localhost:3000/article?name=123&page=1&pageSize=50&age=3');
})();
