const arr = [7, 4, 3, 2, 2, 2, 2, 10, 10, 15, 30];
const k = 10;

function quickSelect(arr: number[], k: number): number {
  let newarr = [];
  let index = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let min = arr[i];
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] < min) {
        min = arr[j];
        index = j;
      }
    }
    arr = arr.filter((value, i) => i != index);
    newarr[i] = min;
  }

  return newarr[k - 1];
}

function quickSelectW(arr: number[], k: number): number {
  let result = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let pipod = arr[i];
    let rightarr = arr.filter((value, index) => value >= pipod);
    let leftarr = arr.filter((value, index) => value < pipod);
    if (leftarr.length == k - 1) {
      result = pipod;
      break;
    } else if (leftarr.length < k - 1) {
      quickSelectW(rightarr, k - leftarr.length - 1);
    } else quickSelectW(leftarr, k);
  }
  return result;
}

function quickSelectR(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new Error("k は配列の要素数の範囲内で指定してください");
  }
  if (arr.length === 1) {
    return arr[0];
  }

  // ピボットの選択（ここでは単純に先頭の要素を使用）
  const pivot = arr[0];

  // pivot より小さい値、等しい値、pivot より大きい値に分割する
  const left = arr.filter((value) => value < pivot);
  const equal = arr.filter((value) => value === pivot);
  const right = arr.filter((value) => value > pivot);

  // left 部分の要素数
  const L = left.length;
  // equal 部分の要素数
  const E = equal.length;

  /*
      ソート済み配列を想定すると、
      - left の要素数は、pivot より小さい要素数
      - equal はすべて pivot の値
      - right は pivot より大きい要素
      となり、pivot の値は left.length + 1 番目から left.length + equal.length 番目に位置する。
    */
  if (k <= L) {
    // k 番目は左側にある
    return quickSelectR(left, k);
  } else if (k <= L + E) {
    // k 番目は pivot（equal 部分）に属する
    return pivot;
  } else {
    // k 番目は右側にある
    // left と equal 分を除いた k 番目（つまり k - L - E 番目）を求める
    return quickSelectR(right, k - L - E);
  }
}

const result = quickSelectR(arr, k);

const Home = () => {
  return (
    <>
      <h1>与えられた配列は：{arr}</h1>
      <h1>{k}番目の値は:</h1>
      <h2>{result}です</h2>
    </>
  );
};

export default Home;
