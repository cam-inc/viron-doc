---
id: dev_component_chart
title: チャートコンポーネント
---

![component_chart](./assets/component_chart.png)

チャートで情報を表示するためのコンポーネントです。

### コンポーネント定義

```json
# GET /viron
# pages[i].components[k]
{
  name: 'DAU',
  style: 'chart',
  api: {...}
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| style | String | yes | '' | `chart`を指定して下さい。 |

### レスポンス形式

```json
{
  chart: {
    type: "area"
  },
  xAxis: {
    title: "日時"
  },
  yAxis: {
    title: "人数"
  },
  series: [
    {
      data: [
        ['2018-01-01', 123],
        ['2018-01-02', 456],
        ['2018-01-03', 789]
      ]
    }
  ]
}
```

| key | type | required | default | description |
| ---- | ---- | -------- | ------- | ----------- |
| chart | Object | yes | - | チャート全体設定。 |
| chart.type | String | yes | 'area' | チャートのタイプ。`area` `areaspline` `arearange` `areasplinerange` `bar` `column` `columnrange` `line` `pareto` `pie` `scatter` `spline`等。 |
| xAsis | Object | no | - | x軸設定 |
| yAsis | Object | no | - | x軸設定 |
| series | Array | yes | - | チャートに反映させるデータ群です。 |

[Highchart](https://api.highcharts.com/highcharts/)の仕様に則ります。
