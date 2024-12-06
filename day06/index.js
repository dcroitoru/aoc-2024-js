import { getDirName, readInput, sum } from "../shared/index.js";

const test = true;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

// returns {x,y}
const findStartingPos = (map) => {
  for (let i = 0; i < map.length; i++) for (let j = 0; j < map[i].length; j++) if (map[i][j] == "^") return { x: j, y: i };
};
const rotateDir = ([v, h]) => {
  if (v == -1) return [0, 1];
  if (h == 1) return [1, 0];
  if (v == 1) return [0, -1];
  if (h == -1) return [-1, 0];
};

const solve1 = (input = "") => {
  const map = input.split(LF).map((row) => row.split(""));
  const size = map.length;
  const startingPos = findStartingPos(map);
  let { x, y } = startingPos;
  let dir = [-1, 0];
  let x1 = x + dir[1];
  let y1 = y + dir[0];
  map[y][x] = "X";
  while (x1 < size && y1 < size && x1 >= 0 && y1 >= 0) {
    if (map[y1][x1] == "#") dir = rotateDir(dir);
    console.log(dir, x, y, x1, y1);

    x += dir[1];
    y += dir[0];
    x1 = x + dir[1];
    y1 = y + dir[0];
    map[y][x] = "X";
  }

  console.log(map.map((row) => row.join()).join("\n"));

  const sumValue = map.map((row) => row.map((cell) => (cell == "X" ? 1 : 0)).reduce(sum)).reduce(sum);
  return sumValue;
};
const solve2 = (input = "") => {
  const map = input.split(LF).map((row) => row.split(""));
  const size = map.length;
  const startingPos = findStartingPos(map);
  let { x, y } = startingPos;
  let dir = [-1, 0];
  let x1 = x + dir[1];
  let y1 = y + dir[0];
  map[y][x] = "|";
  let set = new Set();
  while (x1 < size && y1 < size && x1 >= 0 && y1 >= 0) {
    let changedDir = false;
    if (map[y1][x1] == "#") {
      dir = rotateDir(dir);
      changedDir = true;
    }
    console.log(dir, x, y, x1, y1);
    if (map[y][x] != "." && map[y1][x1] == "." && !set.has(`${y}-${x}`)) set.add(`${y}-${x}`);
    const getChar = (x, y) => {
      if (changedDir) return "+";
      if (map[y][x] == "." && dir[1] == 0) return "|";
      if (map[y][x] == "." && dir[0] == 0) return "-";
      if (map[y][x] == "|" && dir[0] == 0) return "+";
      if (map[y][x] == "-" && dir[1] == 0) return "+";
      return map[y][x];
    };
    map[y][x] = getChar(x, y);

    x += dir[1];
    y += dir[0];
    x1 = x + dir[1];
    y1 = y + dir[0];
  }

  console.log(map.map((row) => row.join("")).join("\n"));
  console.log(set);

  //   const sumValue = map.map((row) => row.map((cell) => (cell == "X" ? 1 : 0)).reduce(sum)).reduce(sum);
  //   return sumValue;
};

// console.log("::part1 =>", solve1(input));
// 5221 too low
// ::part1 => 5318
// console.log("::part2 =>", solve2(input));
// ::part2 => ...
