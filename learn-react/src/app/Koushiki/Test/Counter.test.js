import React from "react"; // JSX を使うので必要
import { render, screen } from "@testing-library/react"; // こちらを使います
import Counter from "./Counter";

test("初期状態のカウントは0である", () => {
  render(<Counter />);
  const countElement = screen.getByTestId("count"); // 'TestId' の D を大文字に
  expect(countElement.textContent).toBe("0");
});
