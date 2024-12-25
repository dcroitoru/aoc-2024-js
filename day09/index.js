import { getDirName, readInput, sum } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const solve1 = (input = "") => {
  const blocks = input.split("").flatMap((val, index) => {
    let s = [];
    if (index % 2 !== 0) {
      for (let i = 0; i < val; i++) s.push(".");
      return s;
    }
    for (let i = 0; i < val; i++) s.push(index / 2);
    return s;
  });

  const empty = [];
  const filled = [];
  blocks.forEach((block, index) => {
    block == "." ? empty.push(index) : filled.push(index);
  });
  const reverseFilled = filled.reverse();

  let newDisk = [...blocks];
  empty.forEach((emptyIndex, index) => {
    if (emptyIndex >= reverseFilled[index]) return;
    newDisk[emptyIndex] = blocks[reverseFilled[index]];
    newDisk[reverseFilled[index]] = ".";
  });

  const checksum = newDisk
    .filter((el) => el != ".")
    .reduce((acc, cur, index) => acc + cur * index, 0);

  return checksum;
};

const solve2 = (input = "") => {
  const disk = input.split("").map(Number);
  const files = [];
  const empty = [];
  let pos = 0;
  disk.forEach((val, index) => {
    index % 2 !== 0
      ? empty.push([pos, val])
      : files.push([files.length, pos, val]);
    pos += val;
  });

  files.reverse();
  files.forEach((file) => {
    const [id, pos, len] = file;
    const emptyBlockIndex = empty.findIndex(([bpos, blen]) => blen >= len);
    const emptyBlock = empty[emptyBlockIndex];

    if (!emptyBlock) return;
    if (emptyBlock[0] >= pos) return;
    file[1] = emptyBlock[0];
    const newEmptyBlock = [emptyBlock[0] + len, emptyBlock[1] - len];
    empty[emptyBlockIndex] = newEmptyBlock;
  });

  const sorted = files.sort((a, b) => a[1] - b[1]);
  const newDisk = [];
  sorted.forEach((file) => {
    const [id, pos, len] = file;
    for (let i = pos; i < pos + len; i++) newDisk[i] = id;
  });

  const checksums = sorted.reduce(([id, pos, len]) => {
    let s = 0;
    for (let i = pos; i < pos + len; i++) s = s + i * id;
    return s;
  });

  const checksum = checksums.reduce(sum);
  return checksum;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 6242766523059
// 5602769170 too low
// 88881734731 too low
console.log("::part2 =>", solve2(input));
// ::part2 => 6272188244509
// 8444425634594 too high
