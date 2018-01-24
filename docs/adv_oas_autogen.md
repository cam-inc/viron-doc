---
id: adv_oas_autogen
title: swagger自動生成
---

プルダウン入力の選択項目をDBのリソースから選択させたい場合など、
swaggerの動的生成が必要なシーンに対応する方法を提供しています。

### プルダウン入力フォーム

プルダウン入力では、選択項目となるenum配列を定義する必要があります。

#### ParameterObject

```json
{
  type: "string",
  x-autogen-enum: {
    model: "admin_roles",
    field: "role_id",
    defaults: ["super", "viewer"]
  }
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| type | String | yes | '' | 任意。 |
| x-autogen-enum | Object | no | null | プルダウンリストの自動生成に使用されます |
| x-autogen-enum.model | String | yes | null | 対象のモデル名 |
| x-autogen-enum.field | String | yes | null | 対象のフィールド名 |
| x-autogen-enum.defaults | Array<String> | no | [] | データの有無に関係なく追加される値 |

#### ParameterObject (自動生成後)

```json
{
  type: "string",
  enum: ["super", "viewer", "tester", "visiter", "operator"]
}
```

### チェックボックス一覧

複数のチェックボックスを並べて、アイテム毎にON/OFFを設定したい場合に利用できます。

#### ParameterObject

```json
{
  description: "checkbox list",
  x-autogen-checklist: {
    model: "admin_roles",
    field: "role_id",
    default: true,
  }
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| description | String | no | '' | 説明文 |
| x-autogen-checklist | Object | no | null | チェックボックス一覧の自動生成に使用されます |
| x-autogen-checklist.model | String | yes | null | 対象のモデル名 |
| x-autogen-checklist.field | String | yes | null | 対象のフィールド名 |
| x-autogen-checklist.default | Boolean | no | false | 初期値 |

#### ParameterObject (自動生成後)

```json
{
  description: "checkbox list",
  type: "object",
  properties: {
    viewer: {
      type: "boolean",
      default: true,
    },
    tester: {
      type: "boolean",
      default: true,
    },
    visiter: {
      type: "boolean",
      default: true,
    },
    operator: {
      type: "boolean",
      default: true,
    },
  }
}
```
