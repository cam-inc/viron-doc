---
id: swagger
title: エンドポイントを実装する
---

Vironサーバのエンドポイントは `swagger.json` を取得するURLで、GETでアクセスできる必要があります。  
example-nodeでは `/swagger.json` をエンドポイントとしています。  

### swagger.yaml

example-nodeではswaggerをyamlで記述しています。  
yamlファイルの場所は `api/swagger/swagger.yaml` です。

### swagger controller

`api/controller/swagger.js` に `swagger#show` という名前でcontrollerを実装します。  
example-nodeはnode-vironlibが提供するcontrollerを利用しています。  
このcontrollerは `api/swagger/swagger.yaml` をパースしたjsonを返すだけでなく、ログインユーザーが権限を持たないパスは返さないなど動的な変換にも対応しています。


