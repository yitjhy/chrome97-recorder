const puppeteer = require('puppeteer');

// (async () => {
//   const puppeteer = require('puppeteer');  
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://baidu.com");
//   await page.screenshot({ path: "example.png" });

//   await browser.close();
// })();

(async () => {
  const browser = await puppeteer.launch({
      headless: false,   //有浏览器界面启动
      slowMo: 100,       //放慢浏览器执行速度，方便测试观察
      defaultViewport: null,
  // args: ['--start-maximized', '--kiosk','–no-sandbox',],
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto('https://www.baidu.com');
  // await page.close();
  // await browser.close();
})();