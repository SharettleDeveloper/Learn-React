# React テスト環境構築手順書

このドキュメントは、React のテスト（Jest および React Testing Library を利用）を実行できる環境を構築するために行った作業内容のまとめです。

## 1. 前提条件

- **Node.js / npm**  
  Node.js と npm がインストール済みであること
- **プロジェクトルートに package.json が存在すること**

---

## 2. 必要なパッケージのインストール

テスト環境の構築に必要なパッケージを開発依存関係としてインストールします。以下のコマンドを実行してください。

```bash
npm install --save-dev \
  jest \
  jest-environment-jsdom \
  @babel/core \
  @babel/preset-env \
  @babel/preset-react \
  babel-jest \
  @testing-library/react \
  @testing-library/jest-dom
```

### インストールされる主なパッケージ

- **jest**: テストランナー
- **jest-environment-jsdom**: ブラウザ環境をシミュレートするための jsdom 環境
- **@babel/core, @babel/preset-env, @babel/preset-react, babel-jest**: Babel を用いて最新の JS/JSX をトランスパイルするためのツール群
- **@testing-library/react**: React コンポーネントのレンダリングやユーザー操作をシミュレートするテストライブラリ
- **@testing-library/jest-dom**: Jest 用のカスタムマッチャー（例: toHaveTextContent など）を提供

---

## 3. Babel の設定

プロジェクトルートに `babel.config.js` ファイルを作成し、以下の内容を記述します。

```js
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
```

これにより、Jest 実行時に Babel が ES6/JSX を正しくトランスパイルします。

---

## 4. Jest の設定

Jest の設定は、プロジェクトルートに `jest.config.js` ファイルを作成して行います。  
**注意:** package.json 内の `"jest"` キーと重複するとエラーになるため、ここでは `jest.config.js` を使用し、package.json 内の設定は削除してください。

```js
// jest.config.js
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  // 必要に応じて他のオプションも追加できます
};
```

これにより、Jest はテスト実行時にブラウザライクな環境（jsdom）で動作します。

---

## 5. サンプルテストファイルの作成

Jest は、ファイル名が `*.test.js` や `*.spec.js` のファイルをテストとして認識します。以下はサンプルとして「ユーティリティ関数」と「React コンポーネント」のテスト例です。

### 5-1. ユーティリティ関数のテスト例

#### ファイル: `src/app/Koushiki/Test/sum.js`

```js
export function sum(a, b) {
  return a + b;
}
```

#### テストファイル: `src/app/Koushiki/Test/sum.test.js`

```js
import { sum } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 5-2. React コンポーネントのテスト例

#### ファイル: `src/app/Koushiki/Test/Counter.js`

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
    </>
  );
}

export default Counter;
```

> **注意:**  
> React コンポーネント内で JSX を利用しているため、`import React from "react"` を明示的に行う必要があります（自動 JSX 変換設定がない場合）。

#### テストファイル: `src/app/Koushiki/Test/Counter.test.js`

```jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("初期状態のカウントは0である", () => {
  render(<Counter />);
  const countElement = screen.getByTestId("count");
  expect(countElement.textContent).toBe("0");
});
```

**ポイント:**

- `render` と `screen` は `@testing-library/react` からインポートします。
- `getByTestId` の引数は、大文字小文字を区別するので正しく `"count"` と記述します。

---

## 6. テストの実行

すべての設定とテストファイルが整ったら、以下のコマンドでテストを実行します。

```bash
npm test
```

実行結果として、`sum.test.js` と `Counter.test.js` のテストが正常に走るはずです。

---

## 7. 注意点とトラブルシューティング

- **複数の Jest 設定ファイルが存在しないこと:**  
  Jest の設定は `jest.config.js` または package.json 内の `"jest"` キーのいずれか一方に統一してください。

- **React 18 の場合:**  
  React 18 では従来の `ReactDOM.render` は非推奨になっているため、テストでは `@testing-library/react` の `render` を利用してください。

- **Babel 設定の確認:**  
  JSX や ES6 構文を正しく変換するために、`babel.config.js` が正しく設定されているか確認してください。

---

## まとめ

1. **パッケージのインストール:**  
   Jest、jsdom 環境、Babel 関連パッケージ、React Testing Library、jest-dom をインストール。

2. **Babel の設定:**  
   `babel.config.js` にプリセット設定を記述。

3. **Jest の設定:**  
   プロジェクトルートに `jest.config.js` を作成し、`testEnvironment` を `jest-environment-jsdom` に設定。

4. **テストファイルの作成:**  
   テスト対象のコードと、そのテスト（`*.test.js`）を作成。

   - ユーティリティ関数（sum）のテスト
   - React コンポーネント（Counter）のテスト

5. **テストの実行:**  
   `npm test` でテストを実行し、すべてのテストが通過することを確認。

これで、React コンポーネントのテストを実行するための環境が整いました。今後、新しいコンポーネントや機能を追加する際も、この環境をベースにテストを書いていくことができます。

---
