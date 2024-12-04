import { getDirName, readInput } from "../shared/index.js";

const test = true;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const isAllInc = (arr) => arr.every((val, i) => i === 0 || val > arr[i - 1]);
const isAllDec = (arr) => arr.every((val, i) => i === 0 || val < arr[i - 1]);
const isSafeDiff = (arr) =>
  arr.every((val, i) => {
    if (i === 0) return true;
    const diff = Math.abs(val - arr[i - 1]);
    return diff >= 1 && diff <= 3;
  });
const solve1 = (input = "") => {
  const rows = input.split(LF).map((row) => row.split(" ").map(Number));
  console.log(rows);
  const allInc = rows.map(isAllInc);
  const allDec = rows.map(isAllDec);
  const safeDiff = rows.map(isSafeDiff);
  const safe = rows.map((level) => (isAllInc(level) && isSafeDiff(level)) || (isAllDec(level) && isSafeDiff(level)));
  const count = safe.filter(Boolean).length;
  console.log(count);

  // console.log(sumValue);
  return count;
};

const isAllInc2 = (arr) => arr.every((val, i) => i === 0 || val > arr[i - 1] || (i > 1 && val > arr[i - 2]));
const isAllDec2 = (arr) =>
  arr.map((val, i) => {
    if (i === 0) {
    }
    // i === 0 || val < arr[i - 1] || (i > 1 && val < arr[i - 2])
  });
const isSafeDiff2 = (arr) =>
  arr.every((val, i) => {
    if (i === 0) return true;
    if (i === 1) {
      const diff = Math.abs(val - arr[i - 1]);
      return diff >= 1 && diff <= 3;
    }

    const diff1 = Math.abs(val - arr[i - 1]);
    const diff2 = Math.abs(val - arr[i - 2]);
    return (diff1 >= 1 && diff1 <= 3) || (diff2 >= 1 && diff2 <= 3);
  });
const solve2 = (input = "") => {
  const rows = input.split(LF).map((row) => row.split(" ").map(Number));
  console.log(rows);
  // const allInc = rows.map(isAllInc2);
  const allDec = rows.map(isAllDec2);
  // const safeDiff = rows.map(isSafeDiff2);
  // console.log(allInc);
  console.log(allDec);
  // console.log(safeDiff);

  // const safe = rows.map((level) => (isAllInc2(level) && isSafeDiff2(level)) || (isAllDec2(level) && isSafeDiff2(level)));
  // const count = safe.filter(Boolean).length;
  // console.log(count);
  // return count;
};

// console.log("::part1 =>", solve1(input));
// 322 too hight (extra new line in input, ffs)
// ::part1 => 321
console.log("::part2 =>", solve2(input));
// 340 too low
// ::part2 => 21306195
