---
id: adv_vironlib
title: node-vironlib
---

APIサーバーを迅速に構築するための手助けとして [node-vironlib](https://github.com/cam-inc/node-vironlib) を公開しています。

node-vironlibは、認証や監査ログ取得等VIRONの基本機能をライブラリとして提供するものです。

[example-emailのvironlib設定箇所](https://github.com/cam-inc/viron/blob/develop/example-email/shared/context.js#L51)

`new VironLib()` に設定を渡すことで初期化されたvironlibインスタンスが生成されます。

すべての設定を渡すと最も簡単にvironlibの全機能を利用することができますが、
独自で実装を行いたい場合は設定を渡さないことで機能をオフにすることができます。

| property name | type | required | description |
| ------------- | ---- | -------- | ----------- |
| account | Object | no | アカウント設定（管理ユーザー自身によるパスワード変更機能）のコントローラ |
| account.admin_users | Sequelize#Model | yes | `admin_users` モデル |
| acl | Object | no | `Access-Control` レスポンスヘッダを付加するミドルウェア |
| acl.allow_origin | String | no | `Access-Control-Allow-Origin` に設定する値 |
| acl.allow_headers | String | yes | `Access-Control-Allow-Headers` に設定する値 |
| acl.expose_headers | String | yes | `Access-Control-Expose-Headers` に設定する値 |
| audit_log | Object | no | 監査ログを取得するミドルウェア、および閲覧用のコントローラ |
| audit_log.audit_logs | Sequelize#Model | yes | `audit_logs` モデル |
| audit_log.unless | Object | no | 監査ログ取得を除外する設定 [express-unless](https://github.com/jfromaniello/express-unless) |
| admin_user | Object | no | 管理ユーザー情報のコントローラ | 
| admin_user.admin_users | Sequelize#Model | yes | `admin_users` モデル |
| admin_user.default_role | String | yes | 管理ユーザーが追加された際に付与される初期ロールID |
| admin_role | Object | no | 管理権限をチェックするミドルウェア、および管理権限のコントローラ |
| admin_role.admin_roles | Sequelize#Model | yes | `admin_roles` モデル |
| admin_role.admin_users | Sequelize#Model | yes | `admin_users` モデル |
| admin_role.store | Sequelize | yes | `sequelize` インスタンス |
| admin_role.default_role | String | yes | 管理ユーザーが追加された際に付与される初期ロールID |
| auth | Object | no | メール認証、GoogleOAuth認証に必要なミドルウェア、コントローラ |
| auth.admin_roles | Sequelize#Model | yes | `admin_roles` モデル |
| auth.admin_users | Sequelize#Model | yes | `admin_users` モデル |
| auth.super_role | String | yes | スーパーユーザーのロールID |
| auth.default_role | String | yes | 管理ユーザーが追加された際に付与される初期ロールID |
| auth.auth_jwt | Object | yes | JWTの設定 |
| auth.auth_jwt.algorithm | String | yes | JWT生成に用いるアルゴリズム ex) "RS512" |
| auth.auth_jwt.claims | Object | yes | JWTに含めるclaimセット |
| auth.auth_jwt.claims.iss | String | yes | JWT発行者の識別子 |
| auth.auth_jwt.claims.aud | String | yes | JWT利用者の識別子 |
| auth.google_oauth | Object | no | GoogleOAuthの設定 |
| auth.google_oauth.client_id | String | yes | GoogleOAuthクライアントID |
| auth.google_oauth.client_secret | String | yes | GoogleOAuthクライアントシークレット |
| auth.google_oauth.redirect_url | String | no | Google認証後に呼び出されるVIRON側のAPI |
| auth.google_oauth.allow_email_domains | Array<String> | no | 利用を許可するドメインの一覧 |
| auth.autocomplete | Object | no | 汎用オートコンプリートのコントローラ |
| auth.autocomplete.store | Sequelize | yes | `sequelize` インスタンス |
| auth.pager | Object | no | ページャー用ヘルパー関数 |
| auth.pager.limit | number | yes | 1ページあたりの件数 |
| auth.swagger | Object | no | Swagger取得用コントローラおよびヘルパー関数 |
| auth.swagger.host | String | yes | APIサーバーのホスト名 |
| auth.swagger.store | Sequelize | yes | `sequelize` インスタンス |
| body_completion | Object | no | VIRONからPOST(PUT)されなかったデータを特定の値で補完するためのミドルウェア |
| body_completion.exclude_paths | Array<String> | no | 補完から除外するパス |
| logger | CustomLogger | no | node-vironlibが利用するロガーインスタンス default) console |
