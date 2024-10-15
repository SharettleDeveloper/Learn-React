"use client";
import { useEffect, useState, useRef } from "react";

import "./style.css";

interface Beam {
  x: number;
  y: number;
}

interface Enemy {
  x: number;
  y: number;
}

const Game = () => {
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(10); // プレイヤーのY座標を管理
  const [beams, setBeams] = useState<Beam[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [points, setPoints] = useState<number>(0);
  const lastShotTime = useRef<number>(0);
  const requestId = useRef<number>();

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const spawnEnemy = setInterval(() => {
      // 敵がプレイヤーと重ならないように位置を調整
      let enemyX = Math.random() * 90;
      while (Math.abs(enemyX - playerX) < 5) {
        enemyX = Math.random() * 70;
      }
      setEnemies((prev) => [...prev, { x: enemyX, y: 100 }]);
    }, 1000); // 敵の生成頻度を調整

    return () => clearInterval(spawnEnemy);
  }, [isGameOver, playerX]);

  useEffect(() => {
    if (isGameOver) return;

    const gameLoop = () => {
      // プレイヤーの左右移動
      if (keysPressed["ArrowLeft"]) {
        setPlayerX((prev) => Math.max(0, prev - 1));
      }
      if (keysPressed["ArrowRight"]) {
        setPlayerX((prev) => Math.min(100, prev + 1));
      }

      // プレイヤーの上下移動
      if (keysPressed["ArrowDown"]) {
        setPlayerY((prev) => Math.min(90, prev + 1)); // 上方向に移動（画面上端を超えないように）
      }
      if (keysPressed["ArrowUp"]) {
        setPlayerY((prev) => Math.max(0, prev - 1)); // 下方向に移動（画面下端を超えないように）
      }

      // スペースキーでビームを発射（発射間隔の調整）
      const now = Date.now();
      if (keysPressed[" "] && now - lastShotTime.current > 300) {
        setBeams((prev) => [...prev, { x: playerX, y: playerY + 10 }]);
        lastShotTime.current = now;
      }

      // ビームと敵の移動および当たり判定
      setBeams(
        (prev) => prev.map((beam) => ({ ...beam, y: beam.y + 3 })).filter((beam) => beam.y < 100) // 画面外に出たビームを削除
      );

      setEnemies((prev) => {
        const updatedEnemies = prev.map((enemy) => ({ ...enemy, y: enemy.y - 0.5 }));

        // プレイヤーと敵の当たり判定
        const playerHit = updatedEnemies.some((enemy) => Math.abs(enemy.x - playerX) < 5 && enemy.y <= playerY + 10);
        if (playerHit) {
          setIsGameOver(true);
          return updatedEnemies; // ここで停止し、アニメーションを止めるために早期リターン
        }

        // ビームと敵の当たり判定
        const remainingEnemies = updatedEnemies.filter((enemy) => {
          const hitIndex = beams.findIndex((beam) => Math.abs(beam.x - enemy.x) < 5 && Math.abs(beam.y - enemy.y) < 5);
          if (hitIndex !== -1) {
            setBeams((prevBeams) => prevBeams.filter((_, index) => index !== hitIndex)); // 当たったビームを消去
            setPoints((prev) => prev + 10); // 敵を倒したらポイント加算
            return false; // 当たった敵を消去
          }
          return enemy.y > 0; // 画面外に出た敵を削除
        });

        return remainingEnemies;
      });

      requestId.current = requestAnimationFrame(gameLoop);
    };

    requestId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestId.current) {
        cancelAnimationFrame(requestId.current);
      }
    };
  }, [keysPressed, playerX, playerY, isGameOver, beams, enemies]);

  if (isGameOver) {
    return (
      <div className="game-over">
        Game Over
        <br />
        Score: {points}
      </div>
    );
  }

  return (
    <div className="game">
      <div className="score">Score: {points}</div>
      <div
        className="player"
        style={{
          left: `${playerX}%`,
          top: `${playerY}%`,
          position: "absolute",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          backgroundColor: "blue",
        }}
      ></div>

      {/* ビームの描画 */}
      {beams.map((beam, index) => (
        <div
          key={index}
          className="beam"
          style={{
            left: `${beam.x}%`,
            bottom: `${beam.y}%`,
            position: "absolute",
            width: "5px",
            height: "20px",
            backgroundColor: "red",
          }}
        />
      ))}

      {/* 敵の描画 */}
      {enemies.map((enemy, index) => (
        <div
          key={index}
          className="enemy"
          style={{
            left: `${enemy.x}%`,
            bottom: `${enemy.y}%`,
            position: "absolute",
            width: "40px",
            height: "40px",
            backgroundColor: "green",
          }}
        />
      ))}
    </div>
  );
};

export default Game;
