import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../index";

// vi.mock('../db', () => ({
//   prismaClient: { sum: { create: vi.fn() }}
// }));

vi.mock("../db");

describe("Post /sum", () => {
	it("should add 1 + 2 to equal 3", async () => {
		const res = await request(app).post("/sum").send({
			a: 1,
			b: 2,
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(3);
	});

	it("should add -1 + -2 to equal -3", async () => {
		const res = await request(app).post("/sum").send({
			a: -1,
			b: -2,
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(-3);
	});

	it("should add 0 + 0 to equal 0", async () => {
		const res = await request(app).post("/sum").send({
			a: 0,
			b: 0,
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(0);
	});

	it("should return 422 if no inputs are provided", async () => {
		const res = await request(app).post("/sum").send({});
		expect(res.statusCode).toBe(422);
		expect(res.body.message).toBe("Incorrect inputs");
	});
});

describe("Get /sum", () => {
	it("should add 1 + 2 to equal 3", async () => {
		const res = await request(app).get("/sum").set({
			a: "1",
			b: "2",
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(3);
	});

	it("should add -1 + -2 to equal -3", async () => {
		const res = await request(app).get("/sum").set({
			a: "-1",
			b: "-2",
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(-3);
	});

	it("should add 0 + 0 to equal 0", async () => {
		const res = await request(app).get("/sum").set({
			a: "0",
			b: "0",
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(0);
	});

	it("should return 422 if no inputs are provided", async () => {
		const res = await request(app).get("/sum").set({});
		expect(res.statusCode).toBe(422);
		expect(res.body.message).toBe("Incorrect inputs");
	});
});
