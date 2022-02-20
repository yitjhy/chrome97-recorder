const puppeteer = require('puppeteer');

(async () => {
    // const browser = await puppeteer.launch({headless: false,defaultViewport: null,args: ['--start-maximized', '--kiosk','–no-sandbox',],});
    const browser = await puppeteer.launch({
      defaultViewport: null,
      // executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Chromium',
      headless: false,   //有浏览器界面启动
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

    async function waitForSelectors(selectors, frame, timeout) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, timeout);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function waitForSelector(selector, frame, timeout) {
      if (selector instanceof Array) {
        let element = null;
        for (const part of selector) {
          if (!element) {
            element = await frame.waitForSelector(part, { timeout });
          } else {
            element = await element.$(part);
          }
          if (!element) {
            throw new Error('Could not find element: ' + part);
          }
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('|'));
        }
        return element;
      }
      const element = await frame.waitForSelector(selector, { timeout });
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (selector instanceof Array) {
        let elements = [];
        let i = 0;
        for (const part of selector) {
          if (i === 0) {
            elements = await frame.$$(part);
          } else {
            const tmpElements = elements;
            elements = [];
            for (const el of tmpElements) {
              elements.push(...(await el.$$(part)));
            }
          }
          if (elements.length === 0) {
            return [];
          }
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
          i++;
        }
        return elements;
      }
      const element = await frame.$$(selector);
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
    // {
    //     const targetPage = page;
    //     await targetPage.setViewport({"width":1920,"height":944})
    // }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('http://localhost:3000/article');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#nest-messages > div > div:nth-child(1) > div > div.ant-table-wrapper > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(2) > td:nth-child(2) > a"]], targetPage, timeout);
        await element.click({ offset: { x: 33.125, y: 15.5} });
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('http://localhost:3000/article');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#nest-messages > div > div:nth-child(1) > div > div.ant-table-wrapper > div > div > div > div > div.ant-table-body > table > tbody > tr:nth-child(5) > td:nth-child(2) > a"]], targetPage, timeout);
        await element.click({ offset: { x: 23.125, y: 5.5} });
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('http://localhost:3000/article');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/姓名 :"],["#nest-messages_name"]], targetPage, timeout);
        await element.click({ offset: { x: 77.5, y: 23} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/姓名 :"],["#nest-messages_name"]], targetPage, timeout);
        const type = await element.evaluate(el => el.type);
        if (["textarea","select-one","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type('12312313fsdfdgfdgfd');
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "123");
        }
    }
    {
        const targetPage = page;
        debugger
        const element = await waitForSelectors([["aria/搜 索"],["#nest-messages > div > div:nth-child(1) > div > div:nth-child(1) > div > div.ant-col.ant-col-6 > div > button.ant-btn.ant-btn-primary > span"]], targetPage, timeout);
        await element.click({ offset: { x: 12, y: 12} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/年龄 :"],["#nest-messages_age"]], targetPage, timeout);
        await element.click({ offset: { x: 30.5, y: 23} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/up"],["#nest-messages > div > div:nth-child(1) > div > div:nth-child(1) > div > div.ant-col.ant-col-18 > div > div:nth-child(3) > div > div.ant-col.ant-col-15.ant-form-item-control > div > div > div > div.ant-input-number-handler-wrap > span.ant-input-number-handler.ant-input-number-handler-up > span > svg"]], targetPage, timeout);
        await element.click({ offset: { x: 2.25, y: 1.5} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/up"],["#nest-messages > div > div:nth-child(1) > div > div:nth-child(1) > div > div.ant-col.ant-col-18 > div > div:nth-child(3) > div > div.ant-col.ant-col-15.ant-form-item-control > div > div > div > div.ant-input-number-handler-wrap > span.ant-input-number-handler.ant-input-number-handler-up > span > svg"]], targetPage, timeout);
        await element.click({ offset: { x: 2.25, y: 1.5} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/up"],["#nest-messages > div > div:nth-child(1) > div > div:nth-child(1) > div > div.ant-col.ant-col-18 > div > div:nth-child(3) > div > div.ant-col.ant-col-15.ant-form-item-control > div > div > div > div.ant-input-number-handler-wrap > span.ant-input-number-handler.ant-input-number-handler-up > span > svg"]], targetPage, timeout);
        await element.click({ offset: { x: 2.25, y: 1.5} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/搜 索"],["#nest-messages > div > div:nth-child(1) > div > div:nth-child(1) > div > div.ant-col.ant-col-6 > div > button.ant-btn.ant-btn-primary"]], targetPage, timeout);
        await element.click({ offset: { x: 11, y: 18} });
    }

    await browser.close();
})();
