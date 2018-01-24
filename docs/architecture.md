---
id: architecture
title: アーキテクチャ
---

### VIRONと各Projectの関係

VIRONは運用管理画面という役割も持って、ユーザとProjectの中間に位置します。以下の図は、2つの異なるProjectと2人のユーザとVIRONの関係を示しています。

![endpoint](endpoint.png)

ProjectAは[OpenAPI Specification ver2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)のAPI定義書(例: GET /swagger.json)と認証方法(GET /viron_authtype)を公開しています。VIRONはこれら2つの情報を元に画面上にエンドポイントカード(EndpointA)を表示します。Projectとエンドポイントカードは対になっており、仮に環境(stagingやproduction)別にProjectが存在する場合はその環境数だけエンドポイントカードが必要になります。

ユーザから見ると、エンドポイントカードはProjectへの玄関口になります。エンドポイントカードは、Projectが公開する認証方法(GET /viron_authtype)でユーザ認証を行うため、許可されていないユーザは玄関を開けることが出来ません。

### Projectページ

エンドポイントカードのユーザ認証にパスしたユーザのみが、データの追加/閲覧/編集/削除を行うためのページに遷移出来ます。

![component](component.png)

左カラムのグローバルメニューは、`GET /viron`のレスポンス内容に従ってUIが展開されます。メニューのグルーピングや順番はProjectが自由に決めることが出来ます。どのコンポーネントを表示するかも自由です。

データの追加/閲覧/編集/削除といったコンポーネント内アクション内容は、Projectが公開するAPI定義書により決定されます。ユーザ一覧を表示させるには専用のAPI(例: GET /sample01)をAPI定義書に含めて下さい。DAU数を表示させるには専用のAPI(例: GET /sample02)をAPI定義書に含めて下さい。VIRONはAPI定義書に従いこれらのAPIをコールします。
