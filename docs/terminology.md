---
id: terminology
title: 用語集
---

<details>
  <summary>エンドポイント</summary>
Viron上で運用管理を行うサービスを意味します。サービスにdevelopやstaging等の環境が存在する場合、各々は別のエンドポイントとして扱われます。
</details>

<details>
  <summary>エンドポイントURL</summary>
  エンドポイントのAPI定義書を取得するためのGETリクエストパスを意味します。(e.g. `https://viron.camplat.com/swagger.js`)
</details>

<details>
  <summary>エンドポイントカード</summary>
  ![endpoint_card](endpoint_card.png)
  エンドポイントを示すカードUIを意味します。
</details>

<details>
  <summary>ページ</summary>
  ![menu](menu.png)
  エンドポイント内の第一階層ディレクトリです。エンドポイントへサインイン後、左カラムにメニューとして表示されます。
</details>

<details>
  <summary>コンポーネント</summary>
  ![component](component.png)
  エンドポイント内の第二階層ディレクトリです。ページの子要素として扱われ、ページ内でカードUIとして表示されます。
</details>

<details>
  <summary>アクション</summary>
  ![action](action.png)
  コンポーネントに対するAPIコールを意味します。ユーザ情報を取得する/更新する/削除する等は全てアクションとして扱
</details>
