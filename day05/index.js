import { getDirName, readInput, sum } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const validRow = (sets) => (row) => {
  for (let i = 0; i < row.length; i++) {
    for (let j = i + 1; j < row.length; j++) {
      if (!sets[row[i]].has(row[j])) return false;
    }
  }
  return true;
};

const createSets = (rules) => {
  const sets = new Set();
  rules.forEach((rule) => {
    const [left, right] = rule;
    const set = sets[left] || new Set();
    set.add(right);
    sets[left] = set;
    sets[right] = sets[right] || new Set();
  });
  return sets;
};

const solve1 = (input = "") => {
  const [rulesStr, numbersStr] = input.split("\n\n");
  const rules = rulesStr.split(LF).map((rule) => rule.split("|").map(Number));
  const numbers = numbersStr.split(LF).map((row) => row.split(",").map(Number));
  const sets = createSets(rules);
  const validRows = numbers.filter((row) => validRow(sets)(row));
  const sumValue = validRows.map((row) => row[Math.floor(row.length / 2)]).reduce(sum);

  return sumValue;
};
const solve2 = (input = "") => {
  const [rulesStr, numbersStr] = input.split("\n\n");
  const rules = rulesStr.split(LF).map((rule) => rule.split("|").map(Number));
  const numbers = numbersStr.split(LF).map((row) => row.split(",").map(Number));
  const sets = createSets(rules);
  const invalidRows = numbers.filter((row) => !validRow(sets)(row));
  const orderRows = invalidRows.map((row) =>
    row.map((num) => [
      num,
      row.reduce((acc, cur, index) => {
        if (cur == num) return acc;
        if (sets[num].has(row[index])) return acc + 1;
        return acc;
      }, 0),
    ])
  );

  const orderedRows = orderRows.map((row) => row.sort((a, b) => b[1] - a[1])).map((row) => row.map(([n, i]) => n));
  const sumValue = orderedRows.map((row) => row[Math.floor(row.length / 2)]).reduce(sum);
  return sumValue;
};

// console.log("::part1 =>", solve1(input));
// ::part1 => 5964
// console.log("::part2 =>", solve2(input));
// ::part2 => 4719
