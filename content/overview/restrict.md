+++
title = "Restrict"
weight = 5
+++

<details>
  <summary>
    動作環境
  </summary>

  - Chrome
  - Safari
  - Firefox
  - Edge

  の最新版で動作します。

</details>

---

#### 既知の問題

<details>
  <summary>
    リダイレクトを行うエンドポイントURLと認証
  </summary>
  Safariにて、リダイレクトを行うエンドポイントURLを指定すると正しく認証を行うことが出来ません。
</details>

# H1

mojimojimojimoji**moji**mojimoji~~moji~~mojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimoji

## H2

mojimojimojimojimojimoj*imoji*mojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimoji

### H3

mojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimoji

#### H4

mojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimoji

##### H5

mojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimoji

###### H6

mojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimojimoji

* Sdfasdf
  * Asdfasdf  
* Asdfasdf
* asdfasdf

1. Sdfasdf
  1. Asdfasdf  
1. Asdfasdf
1. asdfasdf

---

> asdfasdfa

`commit()`

```css
p {
  font-weight: normal;
  word-break: break-word;
}
```

```js
add: (context, tagName, tagOpts, modalOpts) => {
    if (!canCreateModal) {
      console.warn('多重に起動しないよう、一定時間のモーダル作成を規制する。'); // eslint-disable-line no-console
      return;
    }

    // モーダル作成を一時的に不可にする。
    canCreateModal = false;
    clearTimeout(timer);

    // 一定時間後にモーダル作成可とする。
    timer = setTimeout(() => {
      canCreateModal = true;
    }, 300);

    return Promise
      .resolve()
      .then(() => {
        context.commit(mutations.MODALS_ADD, tagName, tagOpts, modalOpts);
      });
  },
```