const puppeteer = require('puppeteer');

const token =  process.env.VIRON_DOC_TOKEN;

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
const createPage = async (browser, url = 'https://localhost:8080/', waitFor = '.EndpointsPage') => {
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle'
  });
  await page.waitFor(waitFor);
  return page;
};

// capture用のエンドポイントを追加する。
const setEndpoints = async (browser) => {
  const page = await createPage(browser);
  return await page.evaluate(token => {
    const endpoints = {
      sampleEndpointKey01: {
        name: 'sample01',
        url: 'https://viron.camplat.net/swagger.json',
        memo: 'viron endpoint for demo.',
        thumbnail: 'https://avatars3.githubusercontent.com/u/23251378?v=3&s=200',
        token
      },
      sampleEndpointKey02: {
        name: 'sample02',
        url: 'https://viron.camplat.net/swagger.json',
        memo: 'viron endpoint for demo.',
        thumbnail: 'https://avatars3.githubusercontent.com/u/23251378?v=3&s=200',
        token
      }
    };
    localStorage.setItem('endpoints', JSON.stringify(endpoints));
  }, token);
};

// 指定要素からclip領域を算出します。
const getClipArea = async (page, selector, paddingTop = 8, paddingRight = 8, paddingBottom = 8, paddingLeft = 8) => {
  return await page.evaluate((selector, paddingTop, paddingRight, paddingBottom, paddingLeft) => {
    const elm = document.querySelector(selector);
    const rect = elm.getBoundingClientRect();
    return {
      x: rect.left - paddingLeft,
      y: rect.top - paddingTop,
      width: rect.width + (paddingLeft + paddingRight),
      height: rect.height + (paddingTop + paddingBottom)
    };
  }, selector, paddingTop, paddingRight, paddingBottom, paddingLeft);
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
    // コンポーネント操作。
    // content/user_guide/component
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/user', '.Table');
      const clipForComponent = await getClipArea(page, '.Component');
      await page.screenshot({
        path: 'content/user_guide/component/component.png',
        clip: clipForComponent
      });
      const clipForRefreshButton = await getClipArea(page, '.Component__refresh', 4, 4, 4, 4);
      await page.screenshot({
        path: 'content/user_guide/component/refresh_button.png',
        clip: clipForRefreshButton
      });
      const clipForFilterButton = await getClipArea(page, '.Component__filter', 4, 4, 4, 4);
      await page.screenshot({
        path: 'content/user_guide/component/filter_button.png',
        clip: clipForFilterButton
      });
      const filterButton = await page.$('.Component__filter');
      await filterButton.click();
      await page.waitFor('.Modal__frame');
      await delay(500);
      await filterButton.dispose();
      const clipForFilterModal = await getClipArea(page, '.Modal__frame');
      await page.screenshot({
        path: 'content/user_guide/component/filter_modal.png',
        clip: clipForFilterModal
      });
      await page.mouse.click(0, 0);
      await delay(500);
      const clipForSearchButton = await getClipArea(page, '.Component__search', 4, 4, 4, 4);
      await page.screenshot({
        path: 'content/user_guide/component/search_button.png',
        clip: clipForSearchButton
      });
      const searchButton = await page.$('.Component__search');
      await searchButton.click();
      await page.waitFor('.Modal__frame');
      await delay(500);
      await searchButton.dispose();
      const clipForSearchModal = await getClipArea(page, '.Modal__frame');
      await page.screenshot({
        path: 'content/user_guide/component/search_modal.png',
        clip: clipForSearchModal
      });
      await page.mouse.click(0, 0);
      await delay(500);
      const clipForActionButtons = await getClipArea(page, '.Component__tail', -16);
      return await page.screenshot({
        path: 'content/user_guide/component/action_buttons.png',
        clip: clipForActionButtons
      });
    })(),
    // コンポーネントTable操作。
    // content/user_guide/component_table
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/user', '.Table');
      const clipForTable = await getClipArea(page, '.Table');
      await page.screenshot({
        path: 'content/user_guide/component_table/table.png',
        clip: clipForTable
      });
      const clipForToggleButton = await getClipArea(page, '.Table__itemsOpenShutButton', 4, 4, 4, 4);
      await page.screenshot({
        path: 'content/user_guide/component_table/toggle_button.png',
        clip: clipForToggleButton
      });
      const clipForActionButton = await getClipArea(page, '.Table__itemsButton', 4, 4, 4, 4);
      await page.screenshot({
        path: 'content/user_guide/component_table/action_button.png',
        clip: clipForActionButton
      });
      const clipForCell = await getClipArea(page, '.Table__item', 2, 2, 2, 2);
      await page.screenshot({
        path: 'content/user_guide/component_table/cell.png',
        clip: clipForCell
      });
      const clipForDetailButton = await getClipArea(page, '.Table__itemsDetailButton', 4, 4, 4, 4);
      await page.screenshot({
        path: 'content/user_guide/component_table/detail_button.png',
        clip: clipForDetailButton
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
  await setEndpoints(browser);
  await capture(browser);
  browser.close();
})().catch(err => {
  console.error(err);
  browser.close();
});
