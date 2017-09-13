+++
title = "エンドポイントを追加する"
weight = 1
+++

Vironサーバのエンドポイントとは `swagger.json` を取得するパスです。  
example-nodeでは `/swagger.json` をエンドポイントとしています。  

### swagger.yaml

SwaggerExpressではswaggerはyamlで記述します。  
yamlファイルの場所は `api/swagger/swagger.yaml` です。

### swagger controller

`api/controller/swagger.js` に `swagger#show` という名前でcontrollerを実装します。  
example-nodeではnode-vironlibが提供するcontrollerを利用しています。  
このcontrollerは `api/swagger/swagger.yaml` をパースしたjsonを返すだけでなく、ログインユーザーが権限を持たないパスは返さないなど動的な変換にも対応しています。

