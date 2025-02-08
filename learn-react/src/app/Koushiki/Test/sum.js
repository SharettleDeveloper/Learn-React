// export function sum(a, b) {
//   return a + b;
// }

export function sum(a, b) {
  return a + b;
}

export function time(a, b) {
  console.log("Restlt" + a * b);
  return a * b;
}

export function calculateStatistics(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Input array must not be empty");
  }

  const count = numbers.length;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / count;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return sum, average, min, max, count;
}
