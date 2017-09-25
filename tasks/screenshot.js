const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// 認証用JWT
const token =  process.env.VIRON_DOC_TOKEN;
// 既に存在する画像は上書きしない
const safety = !!process.env.CAPTURE_SAFETY;

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

// スクリーンショットを撮影します。
const screenshot = async (page, _path, _clip) => {
  if (safety && fs.existsSync(path.join(__dirname, '..', _path))) {
    console.log('file exists. skip:', _path);
    return;
  }
  console.log('take screenshot.', _path);
  return await page.screenshot({path: _path, clip: _clip});
}

// ドキュメントに必要なキャプチャ画像をまとめて書き出します。
const capture = async (browser) => {
  return Promise.all([
    // Viron全体。
    // content
    (async () => {
      const page = await createPage(browser);
      await screenshot(page, 'content/full.png');
      page.close();
      return;
    })(),
    // 用語集。
    // content/overview/terminology
    (async () => {
      const page = await createPage(browser);
      const clipForEndpointCard = await getClipArea(page, '.EndpointsPage__item');
      await screenshot(page, 'content/overview/terminology/endpoint_card.png', clipForEndpointCard);
      page.close();
      return;
    })(),
    // 用語集。
    // content/overview/terminology
    (async () => {
      const page = await createPage(browser);
      const clipForEndpointCard = await getClipArea(page, '.EndpointsPage__item');
      await screenshot(page, 'content/overview/terminology/endpoint_card.png', clipForEndpointCard);
      page.close();
      return;
    })(),
    // 用語集。サインイン後。
    // content/overview/terminology
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/user', '.Table');
      const clipForMenu = await getClipArea(page, '.Menu');
      await screenshot(page, 'content/overview/terminology/menu.png', clipForMenu);
      const clipForComponent = await getClipArea(page, '.Component');
      await screenshot(page,'content/overview/terminology/component.png', clipForComponent);
      const actionButton = await page.$('.Component__action .Button');
      await actionButton.click();
      await page.waitFor('.Drawer__frame');
      await delay(500);
      const clipForActionDrawer = await getClipArea(page, '.Drawer__frame');
      await screenshot(page, 'content/overview/terminology/action.png', clipForActionDrawer);
      page.close();
      return;
    })(),
    // エンドポイント新規作成。
    // content/user_guide/endpoint_add
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.Application__menuItem:nth-child(1)');
      await screenshot(page, 'content/user_guide/endpoint_add/add_button.png', clipForButton);
      const button = await page.$('.Application__menuItem:nth-child(1)');
      await button.click();
      await page.waitFor('.Modal__frame'); // FIXME: ここで詰まる？
      await delay(300);
      const clipForModal = await getClipArea(page, '.Modal__frame');
      await screenshot(page, 'content/user_guide/endpoint_add/add_modal.png', clipForModal);
      page.close();
      return;
    })(),
    // エンドポイント編集。
    // content/user_guide/endpoint_edit
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.EndpointsPage__itemTail .EndpointsPage__itemMenu:nth-child(1)');
      await screenshot(page, 'content/user_guide/endpoint_edit/edit_button.png', clipForButton);
      const button = await page.$('.EndpointsPage__itemTail .EndpointsPage__itemMenu:nth-child(1)');
      await button.click();
      await page.waitFor('.Modal__frame');
      await delay(300);
      const clipForModal = await getClipArea(page, '.Modal__frame');
      await screenshot(page, 'content/user_guide/endpoint_edit/edit_modal.png', clipForModal);
      page.close();
      return;
    })(),
    // エンドポイント削除。
    // content/user_guide/endpoint_remove
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.EndpointsPage__itemTail .EndpointsPage__itemMenu:nth-child(2)');
      await screenshot(page, 'content/user_guide/endpoint_remove/remove_button.png', clipForButton);
      page.close();
      return;
    })(),
    // エンドポイント並び替え。
    // content/user_guide/endpoint_order
    (async () => {
      const page = await createPage(browser);
      const clipForButton = await getClipArea(page, '.Application__menuItem:nth-child(4)');
      await screenshot(page, 'content/user_guide/endpoint_order/order_button.png', clipForButton);
      const button = await page.$('.Application__menuItem:nth-child(4)');
      await button.click();
      await delay(100);
      await page.waitFor('.Modal__frame'); // FIXME: ここで詰まる？
      await delay(1000);
      const clipForModal = await getClipArea(page, '.Modal__frame');
      await screenshot(page, 'content/user_guide/endpoint_order/order_modal.png', clipForModal);
      page.close();
      return;
    })(),
    // エンドポイントfilter。
    // content/user_guide/endpoint_filter
    (async () => {
      const page = await createPage(browser);
      const clip = await getClipArea(page, '.Application__menuItem:nth-child(6)');
      await screenshot(page, 'content/user_guide/endpoint_filter/filter_form.png', clip);
      page.close();
      return;
    })(),
    // エンドポイント共有。
    // content/user_guide/endpoint_share
    (async () => {
      const page = await createPage(browser);
      const clipForDownloadButton = await getClipArea(page, '.Application__menuItem:nth-child(2)');
      await screenshot(page, 'content/user_guide/endpoint_share/download_button.png', clipForDownloadButton);
      const clipForUploadButton = await getClipArea(page, '.Application__menuItem:nth-child(3)');
      await screenshot(page, 'content/user_guide/endpoint_share/upload_button.png', clipForUploadButton);
      page.close();
      return;
    })(),
    // コンポーネント操作。
    // content/user_guide/component
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/user', '.Table');
      const clipForComponent = await getClipArea(page, '.Component');
      await screenshot(page, 'content/user_guide/component/component.png', clipForComponent);
      const clipForRefreshButton = await getClipArea(page, '.Component__refresh', 4, 4, 4, 4);
      await screenshot(page, 'content/user_guide/component/refresh_button.png', clipForRefreshButton);
      const clipForFilterButton = await getClipArea(page, '.Component__filter', 4, 4, 4, 4);
      await screenshot(page, 'content/user_guide/component/filter_button.png', clipForFilterButton);
      const filterButton = await page.$('.Component__filter');
      await filterButton.click();
      await page.waitFor('.Modal__frame');
      await delay(500);
      await filterButton.dispose();
      const clipForFilterModal = await getClipArea(page, '.Modal__frame');
      await screenshot(page, 'content/user_guide/component/filter_modal.png', clipForFilterModal);
      await page.mouse.click(0, 0);
      await delay(500);
      const clipForSearchButton = await getClipArea(page, '.Component__search', 4, 4, 4, 4);
      await screenshot(page, 'content/user_guide/component/search_button.png', clipForSearchButton);
      const searchButton = await page.$('.Component__search');
      await searchButton.click();
      await page.waitFor('.Modal__frame');
      await delay(500);
      await searchButton.dispose();
      const clipForSearchModal = await getClipArea(page, '.Modal__frame');
      await screenshot(page, 'content/user_guide/component/search_modal.png', clipForSearchModal);
      await page.mouse.click(0, 0);
      await delay(500);
      const clipForActionButtons = await getClipArea(page, '.Component__tail', -16);
      await screenshot(page, 'content/user_guide/component/action_buttons.png', clipForActionButtons);
      page.close();
      return;
    })(),
    // コンポーネントTable操作。
    // content/user_guide/component_table
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/user', '.Table');
      const clipForTable = await getClipArea(page, '.Table');
      await screenshot(page, 'content/user_guide/component_table/table.png', clipForTable);
      const clipForToggleButton = await getClipArea(page, '.Table__itemsOpenShutButton', 4, 4, 4, 4);
      await screenshot(page, 'content/user_guide/component_table/toggle_button.png', clipForToggleButton);
      const clipForActionButton = await getClipArea(page, '.Table__itemsButton', 4, 4, 4, 4);
      await screenshot(page, 'content/user_guide/component_table/action_button.png', clipForActionButton);
      const clipForCell = await getClipArea(page, '.Table__item', 2, 2, 2, 2);
      await screenshot(page, 'content/user_guide/component_table/cell.png', clipForCell);
      const clipForDetailButton = await getClipArea(page, '.Table__itemsDetailButton', 4, 4, 4, 4);
      await screenshot(page, 'content/user_guide/component_table/detail_button.png', clipForDetailButton);
      page.close();
      return;
    })(),
    // アクション
    // content/user_guide/action
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/user', '.Table');
      const actionButton = await page.$('.Component__action .Button');
      await actionButton.click();
      await page.waitFor('.Drawer__frame');
      await delay(500);
      const clipForActionDrawer = await getClipArea(page, '.Drawer__frame');
      await screenshot(page, 'content/user_guide/action/modal.png', clipForActionDrawer);
      const clipForToggleButton = await getClipArea(page, '.ParameterSchema__bodyOpenShutButton');
      await screenshot(page, 'content/user_guide/action/toggle_button.png', clipForToggleButton);
      const clipForInfoButton = await getClipArea(page, '.ParameterSchema__infoOpenShutButton');
      await screenshot(page, 'content/user_guide/action/info_button.png', clipForInfoButton);
      const clipForRawDataButton = await getClipArea(page, '.ParameterSchema__previewOpenShutButton');
      await screenshot(page, 'content/user_guide/action/rawData_button.png', clipForRawDataButton);
      await page.focus('.ParameterForm__body .Textinput__input');
      await page.type('error');
      const clipForValidationButton = await getClipArea(page, '.ParameterSchema__validateOpenShutButton');
      await screenshot(page, 'content/user_guide/action/validation_button.png', clipForValidationButton);
      await page.mouse.click(0, 0);
      await delay(500);
      page.close();
      return;
    })(),
    // 管理ユーザ
    // content/operation_guide/adminuser
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/adminuser', '.Table');
      const clipForAdminUserButton = await getClipArea(page, '.Menu .Menu__group:nth-child(4) .Menu__groupListItem:nth-child(2)', 0, 0, 0, 0);
      await screenshot(page, 'content/operation_guide/adminuser/menu_button.png', clipForAdminUserButton);
      const clipForTable = await getClipArea(page, '.Application .Component');
      await screenshot(page, 'content/operation_guide/adminuser/table.png', clipForTable);
      const createButton = await page.$('.Application .Component .Component__action');
      await createButton.click();
      await page.waitFor('.Drawer__frame');
      await delay(500);
      const clipForDrawer = await getClipArea(page, '.Drawer__frame');
      await screenshot(page, 'content/operation_guide/adminuser/modal.png', clipForDrawer);
      page.close();
      return;
    })(),
    // ユーザ権限
    // content/operation_guide/adminrole
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/adminrole', '.Table');
      const clipForAdminRoleButton = await getClipArea(page, '.Menu .Menu__group:nth-child(4) .Menu__groupListItem:nth-child(1)', 0, 0, 0, 0);
      await screenshot(page, 'content/operation_guide/adminrole/menu_button.png', clipForAdminRoleButton);
      const clipForTable = await getClipArea(page, '.Application .Component');
      await screenshot(page, 'content/operation_guide/adminrole/table.png', clipForTable);
      const createButton = await page.$('.Application .Component .Component__action');
      await createButton.click();
      await page.waitFor('.Drawer__frame');
      await delay(500);
      const addButton = await page.$('.ParameterSchema__addButton');
      await addButton.click();
      await delay(500);
      const clipForDrawer = await getClipArea(page, '.Drawer__frame');
      await screenshot(page, 'content/operation_guide/adminrole/modal.png', clipForDrawer);
      page.close();
      return;
    })(),
    // 監査ログ
    // content/operation_guide/auditlog
    (async () => {
      const page = await createPage(browser, 'https://localhost:8080/#/sampleEndpointKey01/auditlog', '.Table');
      await page.setViewport({width: 800, height: 960}); // デフォルトだと入らないので拡大
      const clipForAuditLogButton = await getClipArea(page, '.Menu .Menu__group:nth-child(4) .Menu__groupListItem:nth-child(3)', 0, 0, 0, 0);
      await screenshot(page, 'content/operation_guide/auditlog/menu_button.png', clipForAuditLogButton);
      const clipForTable = await getClipArea(page, '.Application .Component', 8, 8, -14000, 8);
      await screenshot(page, 'content/operation_guide/auditlog/table.png', clipForTable);
      const clipForSearchButton = await getClipArea(page, '.Component__search', 4, 4, 4, 4);
      await screenshot(page, 'content/operation_guide/auditlog/search_button.png', clipForSearchButton);
      const searchButton = await page.$('.Component__search');
      await searchButton.click();
      await page.waitFor('.Modal__frame');
      await delay(500);
      await searchButton.dispose();
      const clipForSearchModal = await getClipArea(page, '.Modal__frame');
      await screenshot(page, 'content/operation_guide/auditlog/search_modal.png', clipForSearchModal);
      page.close();
      return;
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
