import { getDirName, readInput } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const solve1 = (input = "") => {
  const matrix = input.split(LF).map((row) => row.split(""));
  const size = matrix.length;
  const east = (y, x) => {
    if (x + 4 > size) return false;
    if (matrix[y][x] == "X" && matrix[y][x + 1] == "M" && matrix[y][x + 2] == "A" && matrix[y][x + 3] == "S") return true;
    return false;
  };

  const west = (y, x) => {
    if (x - 3 < 0) return false;
    if (matrix[y][x] == "X" && matrix[y][x - 1] == "M" && matrix[y][x - 2] == "A" && matrix[y][x - 3] == "S") return true;
    return false;
  };

  const south = (y, x) => {
    if (y + 4 > size) return false;
    if (matrix[y][x] == "X" && matrix[y + 1][x] == "M" && matrix[y + 2][x] == "A" && matrix[y + 3][x] == "S") return true;
    return false;
  };

  const north = (y, x) => {
    if (y - 3 < 0) return false;
    if (matrix[y][x] == "X" && matrix[y - 1][x] == "M" && matrix[y - 2][x] == "A" && matrix[y - 3][x] == "S") return true;
    return false;
  };

  const southEast = (y, x) => {
    if (y + 4 > size || x + 4 > size) return false;
    if (matrix[y][x] == "X" && matrix[y + 1][x + 1] == "M" && matrix[y + 2][x + 2] == "A" && matrix[y + 3][x + 3] == "S") return true;
    return false;
  };

  const southWest = (y, x) => {
    if (y + 4 > size || x - 3 < 0) return false;
    if (matrix[y][x] == "X" && matrix[y + 1][x - 1] == "M" && matrix[y + 2][x - 2] == "A" && matrix[y + 3][x - 3] == "S") return true;
    return false;
  };

  const northEast = (y, x) => {
    if (y - 3 < 0 || x + 4 > size) return false;
    if (matrix[y][x] == "X" && matrix[y - 1][x + 1] == "M" && matrix[y - 2][x + 2] == "A" && matrix[y - 3][x + 3] == "S") return true;
    return false;
  };

  const northWest = (y, x) => {
    if (y - 3 < 0 || x - 3 < 0) return false;
    // if (matrix[y][x] == "X" && matrix[y - 1][x - 1] == "M" && matrix[y - 2][x - 2] == "A" && matrix[y - 3][x - 3] == "S") return true;
    if (matrix[y][x] == "X" && matrix[y - 1][x - 1] == "M" && matrix[y - 2][x - 2] == "A" && matrix[y - 3][x - 3] == "S") return true;
    return false;
  };

  let sum = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (east(i, j)) sum++;
      if (west(i, j)) sum++;
      if (south(i, j)) sum++;
      if (north(i, j)) sum++;
      if (southEast(i, j)) sum++;
      if (southWest(i, j)) sum++;
      if (northEast(i, j)) sum++;
      if (northWest(i, j)) sum++;
    }
  }

  return sum;
};
const solve2 = (input = "") => {
  const matrix = input.split(LF).map((row) => row.split(""));
  const size = matrix.length;
  const xmas = (y, x) => {
    if (matrix[y][x] == "A") {
      const ne = matrix[y - 1][x + 1];
      const se = matrix[y + 1][x + 1];
      const sw = matrix[y + 1][x - 1];
      const nw = matrix[y - 1][x - 1];
      if (nw == "M" && se == "S") {
        if (ne == "S" && sw == "M") return true;
        if (ne == "M" && sw == "S") return true;
      }

      if (nw == "S" && se == "M") {
        if (ne == "S" && sw == "M") return true;
        if (ne == "M" && sw == "S") return true;
      }
    }
    return false;
  };
  let sum = 0;
  for (let i = 1; i < size - 1; i++) {
    for (let j = 1; j < size - 1; j++) {
      if (xmas(i, j)) sum++;
    }
  }

  return sum;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 2685
console.log("::part2 =>", solve2(input));
// ::part2 => 2048
