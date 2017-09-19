const puppeteer = require('puppeteer');

// timeout
const delay = async (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

// デバッグ用にinnerHTMLを出力します。
const debugHTML = async (page, selector = 'body') => {
  const html = await page.evaluate(_selector => {
    const elm = document.querySelector(_selector);
    return elm.innerHTML;
  }, selector);
  console.log(html);
};

// 新規pageを生成します。
const createPage = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://localhost:8080/', {
    waitUntil: 'networkidle'
  });
  await page.waitFor('.EndpointsPage');
  await setEndpoints(page);
  return page;
};

// capture用のエンドポイントを追加する。
const setEndpoints = async (page) => {
  return await page.evaluate(() => {
    store.state.endpoints = {
      sampleEndpointKey01: {
        name: 'sample01',
        url: 'https://dmc.camplat.net/swagger.json',
        memo: 'viron endpoint for demo.',
        thumbnail: 'https://avatars3.githubusercontent.com/u/23251378?v=3&s=200'
      },
      sampleEndpointKey02: {
        name: 'sample02',
        url: 'https://dmc.camplat.net/swagger.json',
        memo: 'viron endpoint for demo.',
        thumbnail: 'https://avatars3.githubusercontent.com/u/23251378?v=3&s=200'
      }
    };
    store.trigger('ENDPOINTS');
  });
};

// 指定要素からclip領域を算出します。
const getClipArea = async (page, selector, padding = 8) => {
  return await page.evaluate(_selector => {
    const elm = document.querySelector(_selector);
    const rect = elm.getBoundingClientRect();
    return {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + (padding * 2),
      height: rect.height + (padding * 2)
    };
  }, selector);
};

// 指定要素をクリックします
const click = async (page, selector) => {
  return await page.evaluate(_selector => {
    const elm = document.querySelector(_selector);
    elm.click();
  }, selector);
};

// ドキュメントに必要なキャプチャ画像をまとめて書き出します。
const capture = async (browser) => {
  return Promise.all([
    // Viron全体。
    // content/overview/introduction
    (async () => {
      const page = await createPage(browser);
      return await page.screenshot({
        path: 'content/overview/introduction/full.png'
      });
    })(),
    // エンドポイント新規作成。
    // content/user_guide/endpoint_add
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.Application__menuItem:nth-child(1)');
      await page.screenshot({
        path: 'content/user_guide/endpoint_add/add_button.png',
        clip: clipForButton
      });
      const button = await page.$('.Application__menuItem:nth-child(1)');
      await button.click();
      await page.waitFor('.Modal__frame');
      await delay(300);
      const clipForModal = await getClipArea(page, '.Modal__frame');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_add/add_modal.png',
        clip: clipForModal
      });
    })(),
    // エンドポイント編集。
    // content/user_guide/endpoint_edit
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.EndpointsPage__itemTail .EndpointsPage__itemMenu:nth-child(1)');
      await page.screenshot({
        path: 'content/user_guide/endpoint_edit/edit_button.png',
        clip: clipForButton
      });
      const button = await page.$('.EndpointsPage__itemTail .EndpointsPage__itemMenu:nth-child(1)');
      await button.click();
      await page.waitFor('.Modal__frame');
      await delay(300);
      const clipForModal = await getClipArea(page, '.Modal__frame');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_edit/edit_modal.png',
        clip: clipForModal
      });
    })(),
    // エンドポイント削除。
    // content/user_guide/endpoint_remove
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.EndpointsPage__itemTail .EndpointsPage__itemMenu:nth-child(2)');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_remove/remove_button.png',
        clip: clipForButton
      });
    })(),
    // エンドポイント並び替え。
    // content/user_guide/endpoint_order
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.Application__menuItem:nth-child(4)');
      await page.screenshot({
        path: 'content/user_guide/endpoint_order/order_button.png',
        clip: clipForButton
      });
      const button = await page.$('.Application__menuItem:nth-child(4)');
      await button.click();
      await page.waitFor('.Modal__frame');
      await delay(300);
      const clipForModal = await getClipArea(page, '.Modal__frame');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_order/order_modal.png',
        clip: clipForModal
      });
    })(),
    // エンドポイントfilter。
    // content/user_guide/endpoint_filter
    (async () => {
      const page = await createPage(browser);
      const clip = await getClipArea(page, '.Application__menuItem:nth-child(6)');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_filter/filter_form.png',
        clip
      });
    })(),
    // エンドポイント共有。
    // content/user_guide/endpoint_share
    (async () => {
      const page = await createPage(browser);
      const clipForDownloadButton = await getClipArea(page, '.Application__menuItem:nth-child(2)');
      await page.screenshot({
        path: 'content/user_guide/endpoint_share/download_button.png',
        clip: clipForDownloadButton
      });
      const clipForUploadButton = await getClipArea(page, '.Application__menuItem:nth-child(3)');
      return await page.screenshot({
        path: 'content/user_guide/endpoint_share/upload_button.png',
        clip: clipForUploadButton
      });
    })(),
  ]);
};

let browser;
(async () => {
  browser = await puppeteer.launch({
    // 自己署名証明書を使用しているへアクセス可能にする。
    ignoreHTTPSErrors: true,
    headless: false
  });
  await capture(browser);
  browser.close();
})().catch(err => {
  console.error(err);
  browser.close();
});
