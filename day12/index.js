import { getDirName, logMatrix, readInput, sum } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const t = [-1, 0],
  r = [0, 1],
  b = [1, 0],
  l = [0, -1];
const dirs = [t, r, b, l];
const inBounds =
  ([y, x]) =>
  ([h, w]) =>
    y >= 0 && x >= 0 && y < h && x < w;

const createId = ([i, j]) => `${i}-${j}`;
const createPos = (id) => id.split("-").map(Number);
const floodFill = (matrix) => (pos) => {
  const [y, x] = pos;
  const n = matrix[y][x];
  const h = matrix.length,
    w = matrix[0].length;
  const positions = new Set();
  let q = [pos];

  while (q.length > 0) {
    const [y, x] = q.shift();
    const id = createId([y, x]);
    if (inBounds([y, x])([h, w]) && matrix[y][x] == n && !positions.has(id)) {
      positions.add(id);
      const extents = dirs.map(([i, j]) => [y + i, x + j]);

      q = [...q, ...extents];
    }
  }
  return [...positions];
};

const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

const computePerimeter = (area) => {
  const pos = area.map((id) => id.split("-").map(Number));
  const values = pos.map(([y, x]) => {
    const n =
      4 -
      dirs.filter(([i, j]) => area.includes(createId([y + i, x + j]))).length;
    return n;
  });
  return values.reduce(sum);
};

const countSegments = (arr) => {
  if (arr.length <= 1) return 1;
  let ret = 1;
  let last = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] != last + 1) ret++;
    last = arr[i];
  }
  return ret;
};

const computeSides = (area) => {
  const posArea = area.map(createPos);
  const leftEdge = posArea.filter(
    ([y, x]) => !area.includes(createId([y, x - 1]))
  );
  const leftGroups = [...groupBy(leftEdge, ([y, x]) => x).values()].map(
    (group) => group.map(([y, x]) => y).sort((a, b) => a - b)
  );

  const rightEdge = posArea.filter(
    ([y, x]) => !area.includes(createId([y, x + 1]))
  );
  const rightGroups = [...groupBy(rightEdge, ([y, x]) => x).values()].map(
    (group) => group.map(([y, x]) => y).sort((a, b) => a - b)
  );

  const topEdge = posArea.filter(
    ([y, x]) => !area.includes(createId([y - 1, x]))
  );
  const topGroups = [...groupBy(topEdge, ([y, x]) => y).values()].map((group) =>
    group.map(([y, x]) => x).sort((a, b) => a - b)
  );

  const botEdge = posArea.filter(
    ([y, x]) => !area.includes(createId([y + 1, x]))
  );
  const botGroups = [...groupBy(botEdge, ([y, x]) => y).values()].map((group) =>
    group.map(([y, x]) => x).sort((a, b) => a - b)
  );

  const segments = [...leftGroups, ...rightGroups, ...topGroups, ...botGroups]
    .map(countSegments)
    .reduce(sum);
  // console.log("segments", segments);
  return segments;
};

const solve1 = (input = "") => {
  const matrix = input.split(LF).map((row) => row.split(""));
  const h = matrix.length;
  const w = matrix[0].length;
  const seen = new Set();
  const areas = [];

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const id = createId([i, j]);
      if (seen.has(id)) continue;
      const area = floodFill(matrix)([i, j]);
      const n = matrix[i][j];
      areas.push([n, area]);
      area.forEach((el) => seen.add(el));
    }
  }

  const cost = areas
    .map(([n, area]) => computePerimeter(area) * area.length)
    .reduce(sum);
  return cost;
};

const solve2 = (input = "") => {
  const matrix = input.split(LF).map((row) => row.split(""));
  const h = matrix.length;
  const w = matrix[0].length;
  const seen = new Set();
  const areas = [];

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const id = createId([i, j]);
      if (seen.has(id)) continue;
      const area = floodFill(matrix)([i, j]);
      const n = matrix[i][j];
      areas.push([n, area]);
      area.forEach((el) => seen.add(el));
    }
  }

  const cost = areas.map(([n, area]) => computeSides(area) * area.length);
  const sumValue = cost.reduce(sum);
  return sumValue;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 1374934
console.log("::part2 =>", solve2(input));
// ::part2 => 841078
