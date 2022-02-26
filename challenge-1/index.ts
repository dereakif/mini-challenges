// Time complexity: O(N)
// Space complexity: O(N)

type mapType = { [key: number]: number };

const findFirstDuplicates = (arr: number[]): number => {
  if (arr.length === 0) return -1;
  const map: mapType = {};
  for (let index = 0; index < arr.length; index++) {
    if (map[arr[index]]) {
      return arr[index];
    }
    map[arr[index]] = arr[index];
  }
  return -1;
};

const case1 = [5, 3, 4, 2, 4, 5];
const case2 = [3, 3];
const case3 = [2, 8, 3, 4];
const case4 = [
  ...Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000)),
];

console.log("case1:", findFirstDuplicates(case1));
console.log("case2:", findFirstDuplicates(case2));
console.log("case3:", findFirstDuplicates(case3));
console.log("case4:", findFirstDuplicates(case4));
