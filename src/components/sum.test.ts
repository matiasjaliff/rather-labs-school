import { it, expect } from "vitest";
import sum from "./sum";

it("summing 5 and 2 returns 7", () => {
  expect(sum(5, 2)).toBe(7);
});
