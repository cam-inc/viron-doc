---
id: auditlog
title: 監査ログを閲覧する
---

Vironサーバへのリクエストは監査ログに保存されます。
Vironには監査ログを閲覧するためのUIがあり、ログの閲覧/検索が可能です。

### 監査ログを検索する

#### Step1 - Viron 監査ログ コンポーネントを開く

![menu_button](menu_button.png)

左カラムの`Viron 監査ログ`ボタンをクリックしてコンポーネントを開きます。

#### Step2 - 検索 ポップアップを開く

![table](table.png)

コンポーネント右上部の![search_button](search_button.png)をクリックしてポップアップを開きます。

#### Step3 - 検索条件を入力する

![search_modal](search_modal.png)

必要な情報を入力して検索を行います。

- request_method
 - HTTPメソッドです。特定の操作のみ検索できます。
 - ex) POST
- user_id
 - ユーザID(メールアドレス)です。特定のユーザによる操作のみ検索できます。
- request_uri
 - HTTPリクエストURIです。特定のリソースに対する操作のみ検索できます。
 - ex) /user
