// src/app/typing/game/Game.ts

export class Game {
  private currentWordIndex: number = 0;
  private words: string[] = ["apple", "banana", "cherry", "orange", "grapes"];
  private score: number = 0;

  constructor() {
    // 初期化処理があればここで
  }

  public getCurrentWord(): string {
    return this.words[this.currentWordIndex];
  }

  public checkAnswer(userInput: string): boolean {
    const correct = userInput === this.getCurrentWord();
    if (correct) {
      this.score += 1;
      this.currentWordIndex++;
    }
    return correct;
  }

  public getScore(): number {
    return this.score;
  }

  // ...必要に応じて他のメソッドを追加
}

export class Game1 {
  private currentWordIndex: number = 0;
  private words: string[] = ["apple"];
  private score: number = 0;

  contructor() {}
  public getCurrentWord(): string {
    return this.words[this.currentWordIndex];
  }
  public checkAnser(userInput: string): boolean {
    const correct = userInput === this.getCurrentWord();
    if (correct) {
      this.score += 1;
      this.currentWordIndex++;
    }
    return correct;
  }
  public getScore(): number {
    return this.score;
  }
}
