# viron-doc

[Viron Doc](https://cam-inc.github.io/viron-doc/)

## セットアップ

- [Hugo](https://gohugo.io/getting-started/installing/)

## 開発

```
$ npm run start
```

[http://localhost:1313/viron-doc/](http://localhost:1313/viron-doc/)

### 記事カテゴリ追加

`content`ディレクトリ配下に`_index.md`ファイルを含んだ新規ディレクトリを追加してください。

必要に応じて[Front Matter](https://gohugo.io/content-management/front-matter/)も設定して下さい。

```
+++
title = String // カテゴリタイトル。
menu = "main" // サイドカラム内メニュー表示ON。
weight = Number // リスト表示順。昇順。
+++
```

### 記事追加

`content/*`ディレクトリ配下に`.md`ファイルを追加してください。

必要に応じて[Front Matter](https://gohugo.io/content-management/front-matter/)も設定して下さい。

```
+++
title = String // 記事タイトル。
weight = Number // リスト表示順。昇順。
+++
```


## ビルド

```
$ npm run build
```

## 公開

```
$ npm run release
```