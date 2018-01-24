---
id: dev_auth
title: 認証
---

APIサーバーを利用するための認証機能に関するページです。

### 認証方式のカスタマイズ

VironはAPIサーバーの実装により、複数の認証方式をサポートすることが可能です。

![login_form](./assets/login_form.png)

画像はデモサーバーのログイン画面ですが、EMail/Password認証とGoogleOAuth認証がサポートされています。

もし他の認証方式を利用したい場合、各プロバイダ(Twitter,Facebook,GitHub etc...)のOAuthアプリケーションの実装手順に沿って実装してください。


### JWT

ログイン時に発行した認証情報を [JWT](https://jwt.io/) としてブラウザに保持します。

VironはAPI呼び出し時にリクエストヘッダにJWTを付加し、APIサーバーで認証切れや権限のチェックを行っています。


### Swaggerによる認証制御

SwaggerのsecurityフィールドによりAPI単位で認証有無を制御できます。

```yaml
# paths[path][method]
security:
- jwt:
  - api:access
```

と記述することで認証必須APIとして扱われます。

`/viron_authtype` および `/signin` 等、認証に用いるAPI以外は認証必須にすることを推奨します。
