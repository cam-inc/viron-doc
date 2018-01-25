---
id: dev_crud
title: CRUDの追加
---

ここでは開発のイメージを掴みやすくするために  
架空のリソースに対するCRUDをVIRONに追加する手順を記載します。  
実装には

- [swaggerの編集](#swagger)
- [コントローラの追加](#controller)
- [グローバルメニューの編集](#viron)

の3つの手順が必要です。


### 前提

追加するリソースは以下のようなスキーマを想定します。

```SQL
mysql> desc books;
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| id          | int(11)     | NO   | PRI | NULL    | auto_increment |
| title       | varchar(64) | YES  |     | NULL    |                |
| author_name | varchar(32) | YES  |     | NULL    |                |
| detail      | text        | YES  |     | NULL    |                |
| created_at  | datetime    | NO   |     | NULL    |                |
| updated_at  | datetime    | NO   |     | NULL    |                |
| deleted_at  | datetime    | YES  |     | NULL    |                |
+-------------+-------------+------+-----+---------+----------------+
```

### <a name=swagger>Step1: swaggerの編集</a>

#### paths

`GET:/books`, `POST:/books`, `PUT:/books/{id}`, `DELETE:/books/{id}` を追加します。

```yaml
paths:
  /books:
    get: # GET:/books
      x-swagger-router-controller: books # controllerファイル名
      description: book一覧
      operationId: books#list # controllerメソッド名 
      parameters:
      # pagination用のparameter
      - in: query
        name: limit
        required: false
        type: integer
      - in: query
        name: offset
        required: false
        type: integer
      # 検索用のparameter
      - in: query
        name: id
        required: false
        type: integer
      - in: query
        name: title
        required: false
        type: string
      - in: query
        name: author_name
        required: false
        type: string
      produces:
      - application/json
      responses:
        "200":
          schema:
            $ref: '#/definitions/BookCollection' # レスポンスデータの型
      schemes:
      - https
      security:
      - jwt:
        - api:access
      summary: book一覧
      tags:
      - books
 
    post: # POST:/books
      x-swagger-router-controller: books
      description: book作成
      operationId: books#create
      parameters:
      - in: body
        name: payload
        required: true
        schema:
          $ref: '#/definitions/Book' # リクエストペイロードの型
      produces:
      - application/json
      responses:
        "200":
          schema:
            $ref: '#/definitions/Book'
      schemes:
      - https
      security:
      - jwt
        - api:access
      summry: book作成
      tags:
      - books

  /books/{id}:
    put: # PUT:/books/{id}
      x-swagger-router-controller: books
      description: book更新
      operationId: books#update
      parameters:
      - in: path
        name: id
        required: true
        type: integer
      - in: body
        name: payload
        required: true
        schema:
          $ref: '#/definitions/Book' # リクエストペイロードの型
      produces:
      - application/json
      responses:
        "200":
          schema:
            $ref: '#/definitions/Book'
      schemes:
      - https
      security:
      - jwt
        - api:access
      summry: book更新
      tags:
      - books

    delete: # DELETE:/books/{id}
      x-swagger-router-controller: books
      description: book削除
      operationId: books#remove
      parameters:
      - in: path
        name: id
        required: true
        type: integer
      produces:
      - application/json
      responses:
        "204":
          description: "No Content"
      schemes:
      - https
      security:
      - jwt
        - api:access
      summry: book削除
      tags:
      - books
```

#### definitions

paths内で `$ref` で参照するスキーマの定義を記述します。  
ここでは `BookCollection`, `Book` が必要です。

```yaml
definitions:
  BookCollection:
    type: array
    items:
      $ref: '#/definitions/Book'
  
  Book:
    type: object
    properties:
      id:
        description: book id
        example: 1
        type: integer
      title:
        description: title of the book
        example: English Dictionary
        type: string
      author_name:
        description: author of the book
        example: noritama
        type: string
      detail:
        description: detail of the book
        example: this dictionary is ...
        type: string
```

### <a name="controller">Step2: controllerの追加</a>

`controllers/` 配下に `books.js` を作成します。  
実際にはDBや外部APIなど各種リソースにアクセスするロジックが必要です。

```js
const list = (req, res, next) => {
  ...
  res.json([{}]);
};

const create = (req, res, next) => {
  ...
  res.json({});
};

const update = (req, res, next) => {
  ...
  res.json({});
};

const remove = (req, res, next) => {
  ...
  res.status(204).end();
};

module.exports = {
 'books#list': list,
 'books#create': create,
 'books#update': update,
 'books#remove': remove,
}
```

### <a name="viron">Step3: グローバルメニューの編集</a>

最後に `controllers/viron.js` にページを追加します。

```js
{
  pages: [
    {
      group: "book",
      id: "book",
      name: "ブック",
      section: "manage",
      components: [{
        name: "ブック",
        api: {
          path: "/books",
          method: "get",
        },
        style: "table",
        primary: "id",
        pagination: true,
        query: [
          {key: "id", type: "integer"},
          {key: "title", type: "string"},
          {key: "author_name", type: "string"},
        ],
        table_labels: [
          "id",
          "title",
        ],
      }]
    }
  ]
}
```
