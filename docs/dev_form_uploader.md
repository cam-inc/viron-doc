---
id: dev_form_uploader
title: ファイルアップローダー
---

![form_uploader](./assets/form_uploader.png)

### ParameterObject

```json
{
  type: "file",
  description: "title",
  required: true,
  x-accept: "image/*"
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| type | String | yes | '' | `boolean`を指定して下さい。 |
| description | String | no | '' | 補足説明文です。 |
| required | Boolean | no | false | 入力必須項目か否か。 |
| x-accept | String | no | '*' | MIMEタイプ。 |
