"use client"; // Next.jsのApp Routerで、クライアントコンポーネントとして使う

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";

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

  // ■ 3. ゲーム開始イベントハンドラー（スペースキー）
  useEffect(() => {
    const handleSpaceKey = (e: globalThis.KeyboardEvent) => {
      if (e.code === "Space" && !isPlaying) {
        e.preventDefault(); // スペースキーによるページスクロールを防ぐ
        startGame();
      }
      if (e.code === "Escape" && isPlaying) {
        setIsPlaying(false);
      }
    };
    window.addEventListener("keydown", handleSpaceKey);

    return () => {
      window.removeEventListener("keydown", handleSpaceKey);
    };
  }, [isPlaying]);

  // ■ 4. 入力文字の変更処理
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const targetWord = textList[currentIndex];
    const previousInput = userInput;

    if (value.length < previousInput.length) {
      // ユーザーが削除した場合
      setUserInput(value);
      return;
    }

    if (value.length > targetWord.length) {
      // 入力がターゲット単語の長さを超えた場合は無視
      return;
    }

    const currentPos = value.length - 1;
    const newChar = value[currentPos];

    if (newChar.toLowerCase() === targetWord[currentPos].toLowerCase()) {
      // 正しい文字が入力された場合
      setUserInput(value);
    } else {
      // 間違った文字が入力された場合
      setMissCount((prev) => prev + 1);
      // 入力を更新せず、誤った文字は無視
    }
  };

  // ■ 5. 正誤判定と自動次の単語への移行
  useEffect(() => {
    const targetWord = textList[currentIndex];
    if (userInput.length === targetWord.length) {
      if (userInput.toLowerCase() === targetWord.toLowerCase()) {
        setCorrectCount((prev) => prev + 1);
      }
      // 次の単語へ即座に移行
      setUserInput("");
      setCurrentIndex((prev) => (prev + 1) % textList.length);
    }
  }, [userInput, textList, currentIndex]);

  // ■ 6. ゲーム開始ボタン
  const startGame = useCallback(() => {
    setIsPlaying(true);
    setTimeLeft(30);
    setCorrectCount(0);
    setMissCount(0);
    setCurrentIndex(0);
    setUserInput("");
  }, []);

  // ■ 7. 単語の表示（入力済み文字を色分け）
  const renderWord = () => {
    const targetWord = textList[currentIndex];
    const letters = targetWord.split("");

    return (
      <div className="text-lg">
        {letters.map((char, index) => {
          const userChar = userInput[index];
          let className = "text-gray-400"; // 未入力の文字は薄いグレー

          if (userChar) {
            if (userChar.toLowerCase() === char.toLowerCase()) {
              className = "text-blue-600"; // 正しい文字は青色
            }
            // 間違った文字は既に入力が拒否されているため不要
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded shadow flex flex-col items-center">
      {!isPlaying && (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4" onClick={startGame}>
          ゲーム開始
        </button>
      )}

      {isPlaying && (
        <div className="w-full">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">残り時間: {timeLeft}秒</h2>
            <h3 className="text-lg">単語: {renderWord()}</h3>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="ここに入力"
              value={userInput}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="flex justify-between">
            <p className="text-green-600 font-semibold">正解数: {correctCount}</p>
            <p className="text-red-600 font-semibold">ミス数: {missCount}</p>
          </div>
        </div>
      )}

      {!isPlaying && timeLeft === 0 && (
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">ゲーム終了！</h2>
          <p className="text-lg">正解数: {correctCount}</p>
          <p className="text-lg">ミス数: {missCount}</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={startGame}>
            もう一度プレイ
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingGame;
