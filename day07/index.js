import { getDirName, readInput, sum } from "../shared/index.js";

const test = false;
const LF = "\n";
const inputFileName = test ? "test-input.txt" : "input.txt";
const dirname = getDirName(import.meta.url);
const input = readInput(dirname, inputFileName).trim();

const binary = (N, bits) => N.toString(2).padStart(bits, "0");
const ternary = (N, bits) => N.toString(3).padStart(bits, "0");

const solve1 = (input = "") => {
  const rows = input.split(LF).map((row) => {
    const x = row.split(": ");
    return [+x[0], x[1].split(" ").map(Number)];
  });

  const res = rows.map((row) => {
    const [val, terms] = row;
    console.log(`should check ${val} and ${terms}`);
    const max = Math.pow(2, terms.length - 1) - 1;
    const x = [...Array(max + 1).keys()].map((xx) =>
      binary(xx, terms.length - 1)
    );
    const y = x.map((xx) => {
      const xxx = xx.split("");
      console.log(xxx);
      let s = terms[0];
      for (let i = 0; i < xxx.length; i++) {
        const op = xxx[i];
        s = op == "0" ? s + terms[i + 1] : s * terms[i + 1];
      }
      return s;
    });

    console.log([val, y]);

    return [val, y];
  });
  const filtered = res.filter(([t, s]) => s.includes(t));
  const values = filtered.map(([val]) => val);
  return values.reduce(sum);
};

const solve2 = (input = "") => {
  const rows = input.split(LF).map((row) => {
    const x = row.split(": ");
    return [+x[0], x[1].split(" ").map(Number)];
  });

  const res = rows.map((row) => {
    const [val, terms] = row;
    console.log(`should check ${val} and ${terms}`);
    const max = Math.pow(3, terms.length - 1) - 1;
    const x = [...Array(max + 1).keys()].map((xx) =>
      ternary(xx, terms.length - 1)
    );

    // console.log(max);
    // console.log(x);

    const y = x.map((xx) => {
      const xxx = xx.split("");
    //   console.log(xxx);
      let s = terms[0];
      for (let i = 0; i < xxx.length; i++) {
        const op = xxx[i];
        switch(op) {
            case "0": s = s + terms[i + 1]; break;
            case "1": s = s * terms[i + 1]; break;
            case "2": s = Number(`${s}${terms[i + 1]}`); break;
        }
        // s = op == "0" ? s + terms[i + 1] : s * terms[i + 1];
      }
      return s;
    });

    // console.log([val, y]);

    return [val, y];
  });
    const filtered = res.filter(([t, s]) => s.includes(t));
    const values = filtered.map(([val]) => val);
    return values.reduce(sum);
};

// console.log("::part1 =>", solve1(input));
// ::part1 =>
console.log("::part2 =>", solve2(input));
// ::part2 =>
