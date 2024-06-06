import { describe, expect, it } from "@jest/globals";
import { sum } from "../index";

describe("sum function", () => {
	it("should add 1 + 2 to equal 3", () => {
		expect(sum(1, 2)).toBe(3);
	});

	it("should add -1 + -2 to equal -3", () => {
		expect(sum(-1, -2)).toBe(-3);
	});

	it("should add 0 + 0 to equal 0", () => {
		expect(sum(0, 0)).toBe(0);
	});
});
