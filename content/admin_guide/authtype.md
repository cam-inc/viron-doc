+++
title = "認証方式を追加する"
weight = 2
+++

DMCサーバでは標準でメールアドレスおよびGoogleOAuthによる認証をサポートしています。  
認証方式を追加する場合は、 `/dmc_authtype` に定義を追加する必要があります。

### authtype controller

DMCサーバがサポートしている認証方式をクライアントに返すためのAPIです。   
`api/controller/dmc_authtype.js` に `auth_type#list` という名前でcontrollerを実装します。  
下記インターフェースでAPIを実装してください。

```
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