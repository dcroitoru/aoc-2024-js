import { getDirName, readInput } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const createPairs = (arr) => {
  let ret = [];
  for (let i = 0; i < arr.length - 1; i++)
    for (let j = i + 1; j < arr.length; j++) ret.push([arr[i], arr[j]]);
  return ret;
};

const inBounds =
  ([i, j]) =>
  ([min, max]) =>
    i >= min && i < max && j >= min && j < max;

const solve1 = (input = "") => {
  const rows = input.split(LF);
  const size = rows.length;
  // rows.map(row => console.log(row))
  const antenas = {};
  rows.forEach((row, i) =>
    row.split("").forEach((el, j) => {
      if (el == ".") return;
      const antena = antenas[el] || [];
      antena.push([i, j]);
      antenas[el] = antena;
    })
  );

  //   antenas.forEach((v) => console.log(v));
  const valuesArray = Array.from(Object.values(antenas));
  const pairs = valuesArray.map((value) => createPairs(value));
  const antinodes = pairs.flatMap((antenaPairs) =>
    antenaPairs.flatMap(([left, right]) => [
      [left[0] + left[0] - right[0], left[1] + left[1] - right[1]],
      [right[0] + right[0] - left[0], right[1] + right[1] - left[1]],
    ])
  );
  //   console.log(pairs); // Output: [1, 2, 3]
  //   console.log(antinodes);
  const filteredAntinodes = antinodes.filter((node) =>
    inBounds(node)([0, size])
  );
  const uniqueAntinodes = [
    ...new Set(filteredAntinodes.map(([i, j]) => `${i}-${j}`)),
  ];
  //   antinodes.forEach((node) => console.log(node));
  //   console.log(uniqueAntinodes);
  console.log(uniqueAntinodes.length);

  // console.log(antenas);
  // console.log(createPairs([0, 1, 2, 3]));
  // console.log(pairs);
};
const solve2 = (input = "") => {
  const rows = input.split(LF);
  const size = rows.length;
  const antenas = {};
  rows.forEach((row, i) =>
    row.split("").forEach((el, j) => {
      if (el == ".") return;
      const antena = antenas[el] || [];
      antena.push([i, j]);
      antenas[el] = antena;
    })
  );

  const valuesArray = Array.from(Object.values(antenas));
  const pairs = valuesArray.map((value) => createPairs(value));
  const antinodes = pairs.flatMap((antenaPairs) =>
    antenaPairs.flatMap(([left, right]) => {
      const upleft = [];
      let c = left;
      let diff = [left[0] - right[0], left[1] - right[1]];
      while (c[0] >= 0 && c[1] >= 0) {
        upleft.push(c);
        c = [c[0] + diff[0], c[1] + diff[1]];
      }
      const downright = [];
      c = right;
      diff = [right[0] - left[0], right[1] - left[1]];
      while (c[0] < size && c[1] < size) {
        downright.push(c);
        c = [c[0] + diff[0], c[1] + diff[1]];
      }

      return [...upleft, ...downright];
    })
  );
  const filteredAntinodes = antinodes.filter((node) =>
    inBounds(node)([0, size])
  );
  const uniqueAntinodes = [
    ...new Set(filteredAntinodes.map(([i, j]) => `${i}-${j}`)),
  ];

  return uniqueAntinodes.length;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 280
console.log("::part2 =>", solve2(input));
// ::part2 => 958
