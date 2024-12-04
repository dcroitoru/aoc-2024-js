import { getDirName, readInput, sum } from "../shared/index.js";

const test = false;
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName);

const solve1 = (input = "") => {
  const rows = input.split("\n").map((row) => row.split("   ").map(Number));
  const left = rows.map((row) => row[0]).sort();
  const right = rows.map((row) => row[1]).sort();
  const diff = left.map((n, index) => Math.abs(n - right[index]));
  const sumValue = diff.reduce(sum);
  console.log(sumValue);
  return sumValue;
};

const countOccurences = (arr, element) => arr.reduce((count, current) => count + (current === element ? 1 : 0), 0);
const solve2 = (input = "") => {
  const rows = input.split("\n").map((row) => row.split("   ").map((n) => +n));
  const left = rows.map((row) => row[0]);
  const right = rows.map((row) => row[1]);
  const occurences = left.map((n) => n * countOccurences(right, n));
  const sumValue = occurences.reduce(sum);
  console.log(sumValue);
  return sumValue;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 1651298
// console.log("::part2 =>", solve2(input));
// ::part2 => 21306195
