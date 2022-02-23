const puppeteer = require('puppeteer');

(async () => {
    // const browser = await puppeteer.launch({headless: false,defaultViewport: null,args: ['--start-maximized', '--kiosk','–no-sandbox',],});
    const browser = await puppeteer.launch({
        defaultViewport: null,
        // executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Chromium',
        // headless: false,   //有浏览器界面启动
        slowMo: 50,       //放慢浏览器执行速度，方便测试观察
        // args: [            //启动 Chrome 的参数，详见上文中的介绍
        //     '–no-sandbox',
        //     // '--window-size=1280,960'
        // ],
        // --start-maximized   --->   windows的全屏
        // --kiosk   ----> mac的全屏
        // '--disable-web-security', // 允许跨域
        // '--proxy-server=127.0.0.1:1080', // 代理
        // args: [
        //   '--disable-web-security', // 允许跨域
        //   '--proxy-server=127.0.0.1:1080', // 代理
        // ]
        // args: ['--start-maximized', '--kiosk','–no-sandbox',],
    });

    const pages = await browser.pages();
    const page = pages[0];
    const timeout = 5000;
    page.setDefaultTimeout(timeout);
    await page.goto('http://localhost:8080/', {waitUntil: 'networkidle0'});
    // await page.pdf({path: 'example2.pdf', margin: {left: 10, right: 10},  printBackground: true});
    await page.pdf({path: 'example3.pdf'});
    // const pdf = await page.pdf();
    await browser.close();
})();
