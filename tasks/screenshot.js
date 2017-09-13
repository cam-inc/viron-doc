const puppeteer = require('puppeteer');

// timeout
const delay = async (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

// capture用のエンドポイントを追加する。
const setEndpoints = async (page) => {
  return await page.evaluate(() => {
    store.state.endpoints = {
      sampleEndpointKey01: {
        url: 'https://dmc.camplat.net/swagger.json',
        memo: 'viron endpoint for demo.',
        thumbnail: 'https://avatars3.githubusercontent.com/u/23251378?v=3&s=200'
      },
      sampleEndpointKey02: {
        url: 'https://dmc.camplat.net/swagger.json',
        memo: 'viron endpoint for demo.',
        thumbnail: 'https://avatars3.githubusercontent.com/u/23251378?v=3&s=200'
      }
    };
    store.trigger('ENDPOINTS');
  });
};

// 指定要素からclip領域を算出します。
const getClipArea = async (page, selector) => {
  return await page.evaluate(_selector => {
    const elm = document.querySelector(_selector);
    const rect = elm.getBoundingClientRect();
    const padding = 8;
    return {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + (padding * 2),
      height: rect.height + (padding * 2)
    };
  }, selector);
};

// ドキュメントに必要なキャプチャ画像をまとめて書き出します。
const capture = async (page) => {
  return Promise.all([
    (async () => {
      return await page.screenshot({
        path: 'content/overview/introduction/full.png'
      });
    })(),
    (async () => {
      const clip = await getClipArea(page, '.Application__menuItem');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_add/button.png',
        clip
      });
    })()
  ]);
};

let browser;
(async () => {
  browser = await puppeteer.launch({
    // 自己署名証明書を使用しているへアクセス可能にする。
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://localhost:8080/');
  await page.waitFor('.EndpointsPage');
  await setEndpoints(page);
  await capture(page);
  browser.close();
})().catch(err => {
  console.error(err);
  browser.close();
});
