---
id: config
title: コンフィグ
---

DBの接続先等の環境情報をコンフィグファイルに記述します。  
読み込むファイルは `shared/config/` に配置し、環境変数 `{SERVICE_ENV}` でロードするファイルを切り替えます。

| property name | type | required | description |
| ------------- | ---- | -------- | ----------- |
| host | String | yes | サーバのホスト名(:ポート)です。ブラウザからアクセスをされるホストを指定してください。 |
| default_role | String | yes | 管理ユーザーが追加された際に付与される初期ロールIDです。 |
| super_role | String | yes | すべての権限を持つスーパーユーザーのロールIDです。 |
| google_oauth.client_id | String | no | 認証情報を作成した際に発行されたOAuthクライアントID |
| google_oauth.client_secret | String | no | 認証情報を作成した際に発行されたOAuthクライアントシークレット |
| google_oauth.redirect_url | String | no | Google認証後に呼び出されるViron側のAPI。認証情報作成時に「承認済みのリダイレクトURI」に登録する必要があります。 |
| google_oauth.allow_email_domains | Array<String> | no | 企業などで独自ドメインを運用している場合、ドメインのユーザーのみに利用させることができます。 |
| acl.allow_origin | String | no | `Access-Control-Allow-Origin` レスポンスヘッダに付与されます。 |
| acl.allow_headers | String | yes | `Access-Control-Allow-Headers` レスポンスヘッダに付与されます。 |
| acl.expose_headers | String | yes | `Access-Control-Expose-Headers` レスポンスヘッダに付与されます。 |
| stores.main | Object | yes | MySQLサーバーの接続情報や[Sequelize](http://docs.sequelizejs.com/)の設定。 |
| auth_jwt.token_expire | Number | yes | 認証トークンの有効期限をミリ秒単位で指定します。 |
| auth_jwt.algorithm | Number | yes | 暗号化に用いるアルゴリズムです。RSA(RS256,RS384,RS512)およびHMAC(HS256,HS384,HS512)をサポートしています。 |
| auth_jwt.claims | Object | yes | JWTに含めるクレームセットです。 |
| auth_jwt.rsa_private_key | String | no | RSAを利用する場合の秘密鍵です。 |
| auth_jwt.rsa_public_key | String | no | RSAを利用する場合の公開鍵です。 |
| auth_jwt.secret | String | no | HMACを利用する場合の共通鍵です。 |
| ssl.use | Boolean | yes | HTTP/HTTPSのどちらで起動するかを制御します。`true` でHTTPSサーバになります。 |
| ssl.key | String | no | SSL公開鍵です。 |
| ssl.cert | String | no | SSLサーバ証明書です。 |
