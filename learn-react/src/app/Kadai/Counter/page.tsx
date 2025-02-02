"use client";
import { useState } from "react";

interface HistoryEntry {
  value: number;
  timestamp: Date;
}
const Counter = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([{ value: 0, timestamp: new Date() }]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentValue = history[historyIndex];

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const updateHistory = (newValue: number) => {
    const newHistory = history.slice(0, historyIndex + 1);
    const newEntry: HistoryEntry = {
      value: newValue,
      timestamp: new Date(),
    };
    newHistory.push(newEntry);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  const handleIncrement = () => {
    updateHistory(currentValue.value + 1);
  };

  const handleDecrement = () => {
    updateHistory(currentValue.value - 1);
  };

  const handleReset = () => {
    updateHistory(0);
  };
  return (
    <>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <button onClick={handleUndo} disabled={historyIndex === 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={historyIndex === history.length - 1}>
          Redo
        </button>
      </div>
      <div>
        <h2>現在の値</h2>
        <p>{history[historyIndex].value}</p>
        <h2>操作履歴</h2>
        <ul>
          {history.slice(0, historyIndex + 1).map((entry, index) => (
            <li
              key={index}
              onClick={() => setHistoryIndex(index)}
              className="cursor-pointer "
              style={{ backgroundColor: index === historyIndex ? "#202020" : "transparent" }}
            >
              {entry.value}Time:{entry.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Counter;
