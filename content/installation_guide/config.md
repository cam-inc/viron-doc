+++
title = "コンフィグの設定"
weight = 2
+++

example-nodeはDBの接続先等の環境情報をコンフィグファイルに記述します。  
読み込むファイルは`shared/config/`に配置し、環境変数`{SERVICE_ENV}`でロードするファイルを切り替えることができます。  

- `host`
 - サーバのホスト名(:ポート)です。ブラウザからアクセスをされるホストを指定してください。
 - 環境変数`{PORT}`を省略した場合はexample-nodeをListenするポートにもなります。

- `default_role`
 - 管理ユーザーが追加された際に付与される初期ロールIDです。

- `super_role`
 - すべての権限を持つスーパーユーザーのロールIDです。

- `google_oauth`
 - Google認証を利用するには[GoogleCloudConsole](https://console.cloud.google.com/)でOAuthクライアントの認証情報を作成する必要があります。
 - `client_id`: 認証情報を作成した際に発行されたOAuthクライアントID
 - `client_secret`: 認証情報を作成した際に発行されたOAuthクライアントシークレット
 - `redirect_url`: Google認証後に呼び出されるViron側のAPI。認証情報作成時に「承認済みのリダイレクトURI」に登録する必要があります。
 - `allow_email_domains`: 企業などで独自ドメインを運用している場合、そのドメインを記入することでドメインのユーザーのみに利用させることができます。独自ドメインがない場合は、利用者の制限を行う実装が必要かもしれません。

- `acl`
 - CORS対応のためにレスポンスヘッダに付与するAccessControlの設定です。
 - `allow_origin`: `Access-Control-Allow-Origin`ヘッダに付与されます。
 - `allow_headers`: `Access-Control-Allow-Headers`ヘッダに付与されます。
 - `expose_headers`: `Access-Control-Expose-Headers`ヘッダに付与されます。

- `stores`
 - MySQLサーバーの接続情報や[Sequelize](http://docs.sequelizejs.com/)の設定

- `auth_jwt`
 - Vironは[JWT](https://tools.ietf.org/html/rfc7519)認証を採用しています。JWTの有効期限や暗号化に使用する設定を行います。
 - `token_expire`: JWTの有効期限をミリ秒単位で指定します。
 - `algorithm`: 暗号化に用いるアルゴリズムです。RSA(RS256,RS384,RS512)およびHMAC(HS256,HS384,HS512)をサポートしています。
 - `claims`: JWTに含めるクレームセットです。
 - `rsa_private_key`: RSAを利用する場合の秘密鍵です。
 - `rsa_public_key`: RSAを利用する場合の公開鍵です。
 - `secret`: HMACを利用する場合の共通鍵です。

- `ssl`
 - HTTPSサーバを起動する場合のSSL鍵や証明書の情報。
 - Vironは`GitHub Pages`で提供されるため、クロスオリジンとなるVironサーバへのアクセスもHTTPSが必須です。`ssl`設定はVironサーバ自身をHTTPSで起動する手段を提供しますが、SSLに対応したLoadBalancerを経由させることでVironサーバはHTTPで起動するといった構成も可能です。
 - `use`: HTTP/HTTPSのどちらで起動するかを制御します。`true`でHTTPSサーバになります。
 - `key`: SSL公開鍵です。
 - `cert`: SSLサーバ証明書です。