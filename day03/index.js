import { getDirName, readInput } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const solve1 = (input = "") => {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = input.matchAll(regex);

  let sumValue = 0;
  for (const match of matches) sumValue += match[1] * match[2];
  return sumValue;
};
const solve2 = (input = "") => {
  const groups = input.split("do()");
  const filtered = groups.map((group) => group.split("don't()"));
  const str = filtered.map((x) => x[0]).join();
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = str.matchAll(regex);

  let sumValue = 0;
  for (const match of matches) sumValue += match[1] * match[2];
  return sumValue;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 155955228
// console.log("::part2 =>", solve2(input));
// ::part2 => 100189366
