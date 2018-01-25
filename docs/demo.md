---
id: demo
title: デモ
---

まずはデモ用のAPIサーバーを使ってVIRONに触れてみましょう。

[VIRON](https://cam-inc.github.io/viron/latest) を開いてください。

![home_empty](./assets/home_empty.png)

### Step1: APIサーバーを追加する

![endpoint_add](./assets/endpoint_add.png)
をクリックします。

![endpoint_add_form](./assets/endpoint_add_form.png)
が開いたら、

https://viron.camplat.com/swagger.json

と入力し、追加してください。

![home](./assets/home.png)

カードが追加されれば成功です。

### Step2: ログインする

カードをクリックしてログインフォームを開きます。

![login_form](./assets/login_form.png)

ゲストアカウントを使ってログインします。
以下のID/Passwordを入力してログインしてください。

```
ID: visiter@viron.com
Password: Ev4PNxRrls4U
```

![demo_top](./assets/demo_top.png)

この画面が表示されれば成功です。

### Step3: 操作してみる

デモサーバーは大きく「ダッシュボード」と「管理画面」にわかれています。

![demo_quickview](./assets/demo_quickview.png)

「ダッシュボード」はシンプルな数値や複雑なグラフのコンポーネントが並んでおり、KPIの確認や日々の実績を比較/評価等に利用されることを想定しています。

![demo_admin](./assets/demo_admin.png)

「管理画面」はデータのCRUDを提供しています。自由に閲覧/作成/削除等を行ってみてください。
