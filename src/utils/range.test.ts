import { range } from "./range";

it("should return an empty range for 0", () => {
  expect(range(0, 0)).toEqual([]);
});

it("should return a range of one", () => {
  expect(range(0, 1)).toEqual([0]);
});

it("should return a range until upper limit", () => {
  expect(range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

it("should return a range with an offset", () => {
  expect(range(1, 4)).toEqual([1, 2, 3]);
});
