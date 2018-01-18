---
id: api_menu
title: 必須API: グローバルメニューの取得
---

Vironトップに表示されるエンドポイントの情報や、グローバルメニューの構成を取得するAPIです。  
URLは `GET: /viron` 固定です。  
ユーザーのロールに応じてレスポンスが可変になるため、認証をかけてください。  
レスポンスデータをカスタマイズして、簡単に画面構成を追加/変更することが可能です。 

### viron controller

`controllers/viron.js` に `viron#show` という名前でcontrollerを実装します。  
下記インタフェースでAPIを実装してください。  
[example-email](https://github.com/cam-inc/viron/blob/develop/example-email/controllers/viron.js)

```javascript
{
  // エンドポイントに関する情報
  "color": "white", // カラーテーマ
  "name": "Viron example - local", // エンドポイントの名称。サービス名や環境など
  "tags": [ // エンドポイントに付与するタグ
    "local",
    "viron",
    "example"
  ],
  "thumbnail": "https://avatars3.githubusercontent.com/u/23251378?v=3&s=200" // サムネイル画像URL

  // グローバルメニュー
  "pages": [ 
    {
      "section": "dashboard" // 大項目。"dashboard" or "manage"
      "group": "", // 中項目。空の場合はsection直下にcomponentsを配置
      "id": "quickview", // ページのID。全ページでユニークになっている必要があります
      "name": "クイックビュー", // ページ名
      "components": [ // メニューからページを選択した際に表示されるコンポーネントの一覧
        {
          "api": { // コンポーネントに表示する値を取得するためのAPI
            "method": "get",
            "path": "/stats/dau"
          },
          "name": "DAU", // コンポーネント名
          "style": "number" // コンポーネントスタイル。数字(number)、テーブル(table)の他に各種グラフ(graph-*)が利用できます
        },
        {
          "api": {
            "method": "get",
            "path": "/stats/mau"
          },
          "name": "MAU",
          "style": "number"
        },
      ],
    },
    {
      "section": "manage"
      "group": "user",
      "id": "user",
      "name": "ユーザー",
      "components": [
        {
          "api": {
            "method": "get",
            "path": "/user"
          },
          "name": "ユーザー",
          "style": "table",
          "primary": "id", // テーブルデータの主キーにあたるフィールド
          "pagination": true, // テーブルスタイルのページャーを有効にするフラグ
          "query": [ // テーブルスタイルの検索フィールドを指定
            {
              "key": "name",
              "type": "string"
            }
          ],
          "table_labels": [ // テーブルスタイルの見出しにするフィールドを指定
            "id",
            "name"
          ],
          "actions": [ // 他APIの関連付けが必要な場合は指定。詳細は下記[API間の関連付け]を参照
            "/user/download/csv"
          ]
        }
      ],
    },
  ],
}
```

#### API間の関連付け

Vironはcomponent取得APIのパスから関連するAPIを自動で抽出し、componentを操作するAPIとして表示します。  

上記例では `GET:/user` を基点に `POST:/user`, `PUT:/user`, `DELETE:/user` を基本セットとし、  
さらにprimaryの定義を使用して `GET:/user/{id}`, `POST:/user/{id}`, `PUT:/user/{id}`, `DELETE:/user/{id}` を抽出し、swaggerに定義されている場合画面に表示します。  
  
自動抽出されないAPIを関連付けたい場合、actionsを定義することで実現できます。
上記例では `/user/download/csv` をactionsに定義し、 

- `GET:/user/download/csv`
- `POST:/user/download/csv`
- `PUT:/user/download/csv`
- `DELETE:/user/download/csv`

を追加で関連付けしています。  
これらも自動抽出のAPIと同じように、swaggerに定義されている場合のみ表示されます。
