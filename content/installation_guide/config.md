+++
title = "コンフィグの設定"
weight = 2
+++

example-nodeではDBの接続先等の環境情報をコンフィグファイルに記述します。  
読み込むファイルは環境変数{SERVICE_ENV}に依存します。  

- `host`
 - サーバのホスト名(:ポート)です。swagger.yamlのhostを上書きします。

- `default_role`
 - 管理ユーザーが追加された際に付与される初期ロールID

- `super_role`
 - すべての権限を持つスーパーユーザーのロールID

- `google_oauth`
 - `redirect_url`: Google認証後に呼び出されるDMC側のAPI。クライアントID発行時に「承認済みのリダイレクトURI」に登録する必要があります。
 - `allow_email_domains`: 企業などで独自ドメインを運用している場合、そのドメインを記入することでドメインのユーザーのみに利用させることができます。独自ドメインがない場合は、利用者の制限を行う実装が必要かもしれません。

- `stores`
 - MySQLサーバーの接続情報や[Sequelize](http://docs.sequelizejs.com/)の設定

- `auth_jwt`
 - Vironは[JWT](https://tools.ietf.org/html/rfc7519)認証を採用しています。JWTの有効期限や暗号化に使用する設定を行います。

- `ssl`
 - HTTPSサーバで起動する場合のSSL鍵の情報。`use: false`とするとHTTPサーバでの起動となり、`key`および`cert`は無視されます。