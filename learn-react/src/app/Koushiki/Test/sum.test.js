import exp from "constants";
import { calculateStatistics, sum, time } from "./sum";

test("sum 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

//First Red write TestCode and npm test  the result is Error then write Function
test("time 4 * 3 to equal 12", () => {
  expect(time(4, 3)).toBe(12);
});

class TestService {
  multiplyNum(num, multiplyBy) {
    return num * multiplyBy;
  }

  saveNum(num, saveTo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveTo.push(num);
        resolve("Saved");
      }, 100);
    });
  }

  multiplyAndSave(num, multiplyBy, saveTo) {
    const res = this.multiplyNum(num, multiplyBy);
    this.saveNum(res, saveTo);
    return res;
  }
}

module.exports = new TestService();

describe("calculateStatistics", () => {
  test("配列[1,2,3,4,5]の統計情報を正しく計算する", () => {
    const input = [1, 2, 3, 4, 5];
    const result = calculateStatistics(input);
    expect(result).toEqual({
      sum: 15,
      average: 3,
      min: 1,
      max: 5,
      count: 5,
    });
  });

  test("からの配列が与えられた場合、エラーをスローする", () => {
    expect(() => calculateStatistics([])).toThrow("Input array must not be empty");
  });
});
