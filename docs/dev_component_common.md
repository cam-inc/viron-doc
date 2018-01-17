---
id: dev_component_common
title: コンポーネント共通
---

メインカラム内には`GET /viron`で指定されたコンポーネント群が配置されます。

```json
# GET /viron
{
  pages: [
    {
      components: [...]
    },
    {...},
    {...}
  ]
}
```
このページでは全コンポーネントに共通する設定を説明します。

```json
# pages[i].components[k]
{
  name: 'DAU',
  style: 'number',
  api: {
    method: 'get',
    path: '/dau'
  },
  auto_refresh_sec: 300
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| name | String | yes | '' | タイトル部に使用されます。 |
| style | String | yes | '' | 表示形式を指定します。`number`,`table`もしくは`chart`。 |
| api | String | yes | '' | データ取得API情報です。 |
| api.method | String | yes | '' | リクエストのメソッド名です。 |
| api.path | String | yes | '' | リクエストのパスです。 |
| auto_refresh_sec | Number | no | 0 | 指定された秒数毎に自動でデータを更新します。|

Vironは`api`オブジェクトで指定された情報を元にデータ取得リクエストを送信します。
APIはそれぞれの`style`値に応じた形式でレスポンスする必要があります。
