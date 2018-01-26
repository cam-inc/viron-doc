---
id: dev_theme
title: カラーテーマ
---

3つのカラーテーマ`standard`/`midnight`/`terminal`が用意されています。`GET /viron`のレスポンスを編集してカラーテーマを指定して下さい。

```json
# GET /viron
{
  theme: 'midnight'
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| theme | String | no | 'standard' | `standard`,`midnight`もしくは`terminal` |
