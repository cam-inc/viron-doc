---
id: dev_api_swagger
title: 必須API: swaggerの取得
---

swaggerを取得するAPIです。  
URLは `GET: /swagger.json` です。

### swagger.yaml

yamlで記述したswaggerをjsonにパースして返却しています。   
[example-emailのswagger.yaml](https://github.com/cam-inc/viron/blob/develop/example-email/swagger/swagger.yaml)

### swagger controller

`controllers/swagger.js` に `swagger#show` という名前でcontrollerを実装します。  
[example-emailのサンプル](https://github.com/cam-inc/viron/blob/develop/example-email/controllers/swagger.js)
