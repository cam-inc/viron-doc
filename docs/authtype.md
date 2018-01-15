---
id: authtype
title: 必須API: 認証方式を取得
---

サーバがサポートする認証方式の一覧を取得するAPIです。  
アプリ側では受け取った一覧を元にログイン画面を生成します。  
URLは `GET: /viron_authtype` 固定で、非認証状態でコールできる必要があります。  

### authtype controller

`controllers/viron_authtype.js` に `auth_type#list` という名前でcontrollerを実装します。  
下記インタフェースでAPIを実装してください。  
[example-nodeのサンプル](https://github.com/cam-inc/viron/blob/develop/example-node/controllers/viron_authtype.js)

```javascript
[
  // メールアドレスとパスワードによる認証。利用しない場合は削除しても良い
  {
    type: 'email', // メールアドレスとパスワードによる独自認証を利用する場合のtype
    provider: 'example-node',
    url: '/signin', // サインインフォームでsubmitする際のリクエストURL
    method: 'POST', // submitする際のリクエストメソッド
  },
  // GoogleOAuthによる認証。利用しない場合は削除しても良い
  {
    type: 'oauth', // OAuth認証を利用する場合のtype
    provider: 'google', // OAuthを提供するプロバイダ。
    url: '/googlesignin',
    method: 'POST',
  },
  // 認証方式ではありませんが、サインアウト時にコールするAPIを定義するために必須です。
  {
    type: 'signout',
    provider: '',
    url: '/signout',
    method: 'POST',
  },
];
```
