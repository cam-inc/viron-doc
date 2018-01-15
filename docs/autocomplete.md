---
id: autocomplete
title: オートコンプリートを実装する
---

データ入力補助としてオートコンプリート機能を実装することができます。

#### Step1 - swaggerの定義

オートコンプリートを適用したいパラメータに`x-autocomplete`を定義することでオートコンプリートが有効になります。

```yaml
user_id:
    description: ユーザーID
    example: 1
    format: int64
    type: integer
    x-autocomplete:
        field: name
        path: /viron_autocomplete
        query:
            model: users
            value: id
```

上記はexample-nodeの`UserBlogPayload`を一部抜粋したものです。  
`name`を入力することで`users`テーブルを検索し、`id`を補完することができます。

##### `x-autocomplete`の各フィールドについて

- field
 - ユーザが入力する値がどのフィールドの値なのかを指定します。
 - ex) 上記例でユーザーが`hoge`と入力しているとき、サーバへのリクエストは `GET: /viron_autocomplete?name=hoge` となります。
- path
 - 検索を行い、一致するリストを返却するコントローラのパスです。
 - example-nodeで使用している`/viron_autocomplete`は`model`で指定したテーブルに部分一致検索を行うシンプルな汎用コントローラです。
- query
 - field以外にサーバに送信したいクエリがあるときに指定します。
 - 上記例では `GET: /viron_autocomplete?name=hoge&model=users&value=id` が実際に送信されるリクエストになります。

#### Step2 - controllerの実装

`x-autocomplete`.`path`に指定したコントローラの実装を行います。  
他のコントローラ同様、swaggerの定義も必要です。  
下記インタフェースでAPIを実装してください。

```javascript
[
  {
    name: 'test-user01', // オートコンプリート結果をリスト表示する際の表示項目です
    value: 1,            // 選択時に実際に入力される値です
  },
  {
    name: 'test-user02',
    value: 2,
  },
]
```
