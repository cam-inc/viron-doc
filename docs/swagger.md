---
id: swagger
title: 必須API: swaggerを取得
---

swaggerを取得するAPIです。URLは `GET: /swagger.json` です。
ユーザーのロールに応じてレスポンスが可変になるため、認証をかけてください。
また、Vironのエンドポイントはこのパスになります。

### swagger.yaml

example-nodeではyamlで記述したswaggerをjsonにパースして返却しています。 
[example-nodeのswagger.yaml](https://github.com/cam-inc/viron/blob/develop/example-node/swagger/swagger.yaml)

### swagger controller

`controllers/swagger.js` に `swagger#show` という名前でcontrollerを実装します。  
[example-nodeのサンプル](https://github.com/cam-inc/viron/blob/develop/example-node/controllers/swagger.js)
