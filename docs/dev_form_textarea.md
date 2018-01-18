---
id: dev_form_textarea
title: テキスト入力フォーム(複数行)
---

![form_textarea](./assets/form_textarea.png)

### ParameterObject

```json
{
  type: "string",
  description: "title",
  required: true,
  format: "multiline"
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| type | String | yes | '' | `string`を指定して下さい。 |
| description | String | no | '' | 補足説明文です。 |
| required | Boolean | no | false | 入力必須項目か否か。 |
| format | String | yes | '' | `multiline`を指定して下さい。 |
