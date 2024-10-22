"use client";
import { useRef, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const increment = () => {
    setCount(count + 1); // 状態は再レンダリングを引き起こす
    countRef.current++; // レンダリングには影響を与えず値を保持
  };

  const Refincrement = () => {
    countRef.current++;
  };

  const showCountRef = () => {
    console.log(`Refのカウント: ${countRef.current}`);
  };

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={increment}>増加</button>
      <button onClick={Refincrement}>Ref増加</button>
      <p>Ref Count: {countRef.current}</p>
      <button onClick={showCountRef}>Refのカウントを表示</button>
    </div>
  );
};

export default Counter;
