// src/app/page.tsx
import React from "react";
import TypingGame from "./typing/components/TypingGame";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-black">タイピングゲーム</h1>
      <TypingGame />
    </main>
  );
}
