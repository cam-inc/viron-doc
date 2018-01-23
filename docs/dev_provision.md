---
id: dev_provision
title: サーバ構築の準備
---

Vironに付属しているサンプルプロジェクトはNode.js+MySQL環境で動作します。  
実際にサーバ構築を行う前にNode.jsとMySQLの実行環境を確認する必要があります。  

## Node.jsの実行環境の確認

Node.js 7.6以上の環境で動作します。  
Node.jsをインストールする場合は[こちら](https://nodejs.org/en/download/)からダウンロードしてください。  
インストールされているNode.jsのバージョンを確認するには、以下のコマンドを実行します。

``` $ node --version```

## MySQLの実行環境の確認

MySQL 5.6でのみ動作確認を行っています。おそらく4.xでも動作しますが、新規に構築する場合（既存サービスのDBに接続しない場合）は5.6以上の利用をお勧めします。  
MySQLをインストールする場合は[こちら](https://dev.mysql.com/downloads/installer/)からダウンロードしてください。
