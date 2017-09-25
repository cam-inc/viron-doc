+++
title = "環境変数"
weight = 4
+++

example-nodeが利用する環境変数の一覧です。

- `SERVICE_ENV`
 - 環境を表す名称を指定します。名称が一致するコンフィグファイルがロードされます。省略した場合は `local` が適用されます。

- `PORT`
 - サーバをListenするポート番号を指定します。省略した場合は`swagger.yaml`の`host`に記述されているポート番号が適用されます。

- `GOOGLE_OAUTH_CLIENT_ID`
 - GoogleOAuth認証を使用する際のクライアントIDです。省略した場合GoogleOAuthは利用できません。

- `GOOGLE_OAUTH_CLIENT_SECRET`
 - GoogleOAuth認証を使用する際のクライアントシークレットです。省略した場合GoogleOAuthは利用できません。

- `MYSQL_USER_NAME`
 - MySQLサーバーのユーザーです。

- `MYSQL_USER_PASSWORD`
 - MySQLサーバーのパスワードです。

- `AUTH_JWT_PRIVATE_KEY`
 - JWT生成用の秘密鍵です。

- `AUTH_JWT_PUBLIC_KEY`
 - JWT検証用の公開鍵です。

- `SSL_PRIVATE_KEY`
 - example-nodeをHTTPSサーバで起動する場合のSSL秘密鍵です。

- `SSL_CERTIFICATE`
 - example-nodeをHTTPSサーバで起動する場合のSSL証明書です。
