import { getDirName, readInput } from "../shared/index.js";

const test = true;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const blink = (stones) =>
  stones.flatMap((stone) => {
    if (stone == 0) return 1;
    if (String(stone).length % 2 == 0) {
      const str = String(stone);
      const index = String(stone).length / 2;
      const left = str.slice(0, index);
      const right = str.slice(index);
      return [left, right].map(Number);
    }
    return stone * 2024;
  });

const process = (dp) => (stone) => {
  if (dp[stone]) return dp[stone];
  if (stone == "0") return "1";
  if (stone.includes(" ")) {
    return stone
      .split(" ")
      .map((st) => process(dp)(st))
      .join(" ");
  }
  if (stone.length % 2 == 0) {
    const index = stone.length / 2;
    const left = stone.slice(0, index);
    const right = String(Number(stone.slice(index)));
    return `${left} ${right}`;
  }
  return `${Number(stone) * 2024}`;
};

const solve1 = (input = "") => {
  const stones = input.split(" ").map(Number);
  console.log(stones);
  let newStones = stones;
  for (let i = 0; i < 75; i++) {
    newStones = blink(newStones);
  }
  console.log(newStones.length);
};
const solve2 = (input = "") => {
  let stones = input;
  console.log(stones);
  //   for (let i = 0; i < 25; i++) {
  //       stones = stones.map((stone) => dpblink({})(stone));
  //       console.log(i, stones);
  //   }

  let dp = {};
  for (let i = 0; i < 6; i++) {

    // dp[stones] =
    //   dp[stones] ||
    //   stones
    //     .split(" ")
    //     .map((stone) => {
    //       dp[stone] = dp[stone] || process(dp)(stone);
    //       return dp[stone];
    //     })
    //     .join(" ");
    // stones = dp[stones];

    // console.log(i, stones);
  }

  console.log(stones);

  const len = stones.split(" ").length;
  console.log("len", len);

  //dp(0, 1) => 1
  //dp(0, 2) => 2024
  //dp(1, 1) => 2024
  //dp(0, 3) => 20 24
  //dp(0, 4) => 2 0 2 4
  //dp(0, 5) => 
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 182081
console.log("::part2 =>", solve2(input));
// ::part2 =>
