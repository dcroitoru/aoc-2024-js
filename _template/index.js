import { getDirName, readInput } from "../shared/index.js";

const test = true;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const solve1 = (input = "") => {};
const solve2 = (input = "") => {};

// console.log("::part1 =>", solve1(input));
// ::part1 =>
// console.log("::part2 =>", solve2(input));
// ::part2 =>
