import { getDirName, readInput } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const top = [-1, 0];
const left = [0, -1];
const bot = [1, 0];
const right = [0, 1];
const dirs = [top, right, bot, left];

const createTrail =
  (matrix) =>
  ([y, x]) => {
    if (matrix[y][x] == 9) return `${y}, ${x}`;
    return dirs
      .filter((dir) => canMove(matrix)([y, x])(dir))
      .flatMap(([i, j]) => createTrail(matrix)([y + i, x + j]));
  };

const canMove =
  (matrix) =>
  ([i, j]) =>
  ([y, x]) => {
    if (
      i + y < 0 ||
      j + x < 0 ||
      i + y >= matrix.length ||
      j + x >= matrix[0].length
    )
      return false;
    return matrix[i + y][j + x] == matrix[i][j] + 1;
  };

const solve1 = (input = "") => {
  const matrix = input.split(LF).map((row) => row.split("").map(Number));
  const h = matrix.length;
  const w = matrix[0].length;

  let sum = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const el = matrix[i][j];
      if (el == 0) {
        const trailEnds = new Set(createTrail(matrix)([i, j]));
        console.log(trailEnds);
        sum += trailEnds.size;
      }
    }
  }

  return sum;
};
const solve2 = (input = "") => {
  const matrix = input.split(LF).map((row) => row.split("").map(Number));
  const h = matrix.length;
  const w = matrix[0].length;

  let sum = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const el = matrix[i][j];
      if (el == 0) {
        const trailEnds = createTrail(matrix)([i, j]);
        console.log(trailEnds);
        sum += trailEnds.length;
      }
    }
  }

  return sum;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 574
console.log("::part2 =>", solve2(input));
// ::part2 =>
