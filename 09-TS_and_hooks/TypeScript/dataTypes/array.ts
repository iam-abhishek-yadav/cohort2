function findMaxValue(numbers: number[]): number {
  return Math.max(...numbers);
}

const numbers: number[] = [10, 5, 20, 15];
const maxValue = findMaxValue(numbers);
console.log("Maximum value:", maxValue);
