"use client"; // Next.jsのApp Routerで、クライアントコンポーネントとして使う

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

const TypingGame: React.FC = () => {
  // ■ 1. 状態を定義
  const [textList] = useState<string[]>(["apple", "banana", "cherry", "dog", "elephant"]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // ■ 2. ゲームスタート/タイマー処理
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // ゲーム終了
      setIsPlaying(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeLeft]);

  // ■ 3. 入力文字の変更処理
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // ■ 4. エンターキー押下時の処理
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  // ■ 5. 正誤判定
  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === textList[currentIndex].toLowerCase()) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setMissCount((prev) => prev + 1);
    }

    // 次の単語へ
    setUserInput("");
    setCurrentIndex((prev) => (prev + 1) % textList.length);
  };

  // ■ 6. ゲーム開始ボタン
  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(30);
    setCorrectCount(0);
    setMissCount(0);
    setCurrentIndex(0);
    setUserInput("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded shadow">
      {!isPlaying && (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={startGame}>
          ゲーム開始
        </button>
      )}

      {isPlaying && (
        <div>
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">残り時間: {timeLeft}秒</h2>
            <h3 className="text-lg">
              単語: <span className="font-bold text-blue-600">{textList[currentIndex]}</span>
            </h3>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="ここに入力"
              value={userInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="flex justify-between">
            <p className="text-green-600 font-semibold">正解数: {correctCount}</p>
            <p className="text-red-600 font-semibold">ミス数: {missCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingGame;
