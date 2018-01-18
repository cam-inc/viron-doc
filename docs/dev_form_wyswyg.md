---
id: dev_form_wyswyg
title: WYSWYG入力フォーム
---

![form_wyswyg](./assets/form_wyswyg.png)

### ParameterObject

```json
{
  type: "string",
  description: "title",
  required: true,
  format: "wyswyg"
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| type | String | yes | '' | `string`を指定して下さい。 |
| description | String | no | '' | 補足説明文です。 |
| required | Boolean | no | false | 入力必須項目か否か。 |
| format | String | yes | '' | `wyswyg`を指定して下さい。 |
