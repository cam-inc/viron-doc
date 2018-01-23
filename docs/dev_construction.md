---
id: dev_construction
title: サーバ構築
---

Vironサーバのソースを任意の場所に配置すればデプロイは完了です。

### インストール
依存するライブラリ群をインストールするため、以下のコマンドを実行してください。

```$ npm install```

### 起動

```$ npm start```

### 動作確認

```
$ curl http://localhost:3000/ping
pong
```

#### DBのテーブル追加の確認

Vironサーバを起動するとデータベースに3つのテーブルが作成されます。

<details>
  <summary>admin_users</summary>
Vironサーバを利用するユーザ情報を管理するテーブルです。

```
mysql> desc admin_users;
+-----------+------------------+------+-----+---------+----------------+
| Field     | Type             | Null | Key | Default | Extra          |
+-----------+------------------+------+-----+---------+----------------+
| id        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| email     | varchar(255)     | NO   | UNI | NULL    |                |
| role_id   | varchar(255)     | NO   |     | NULL    |                |
| password  | varchar(1024)    | YES  |     | NULL    |                |
| salt      | varchar(256)     | YES  |     | NULL    |                |
| createdAt | datetime         | NO   |     | NULL    |                |
| updatedAt | datetime         | NO   |     | NULL    |                |
| deletedAt | datetime         | YES  |     | NULL    |                |
+-----------+------------------+------+-----+---------+----------------+
```
</details>

<details>
  <summary>admin_roles</summary>
Vironユーザに付与するロールを管理するテーブルです。

```
mysql> desc admin_roles;
+-----------+------------------+------+-----+---------+----------------+
| Field     | Type             | Null | Key | Default | Extra          |
+-----------+------------------+------+-----+---------+----------------+
| id        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| role_id   | varchar(255)     | NO   | MUL | NULL    |                |
| method    | varchar(255)     | YES  |     | NULL    |                |
| resource  | varchar(255)     | YES  |     | NULL    |                |
| createdAt | datetime         | NO   |     | NULL    |                |
| updatedAt | datetime         | NO   |     | NULL    |                |
| deletedAt | datetime         | YES  |     | NULL    |                |
+-----------+------------------+------+-----+---------+----------------+
```
</details>

<details>
  <summary>audit_logs</summary>
Vironサーバの監査ログを記録するテーブルです。

```
mysql> desc audit_logs;
+----------------+------------------+------+-----+---------+----------------+
| Field          | Type             | Null | Key | Default | Extra          |
+----------------+------------------+------+-----+---------+----------------+
| id             | int(11)          | NO   | PRI | NULL    | auto_increment |
| request_method | varchar(255)     | YES  |     | NULL    |                |
| request_uri    | varchar(2048)    | YES  |     | NULL    |                |
| source_ip      | varchar(255)     | YES  |     | NULL    |                |
| user_id        | varchar(255)     | YES  |     | NULL    |                |
| request_body   | text             | YES  |     | NULL    |                |
| status_code    | int(10) unsigned | YES  |     | NULL    |                |
| createdAt      | datetime         | NO   |     | NULL    |                |
| updatedAt      | datetime         | NO   |     | NULL    |                |
| deletedAt      | datetime         | YES  |     | NULL    |                |
+----------------+------------------+------+-----+---------+----------------+
```
</details>
