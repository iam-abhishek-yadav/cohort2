import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prismaClient } from "../__mocks__/db";

vi.mock("../db");

describe("Post /sum", () => {
	it("should add 1 + 2 to equal 3", async () => {
		prismaClient.sum.create.mockResolvedValue({
			id: 1,
			a: 1,
			b: 2,
			result: 3,
		});
		vi.spyOn(prismaClient.sum, "create");
		const res = await request(app).post("/sum").send({
			a: 1,
			b: 2,
		});
		expect(prismaClient.sum.create).toHaveBeenCalledWith({
			data: {
				a: 1,
				b: 2,
				result: 3,
			},
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(3);
	});

	it("should add -1 + -2 to equal -3", async () => {
		prismaClient.sum.create.mockResolvedValue({
			id: 2,
			a: -1,
			b: -2,
			result: -3,
		});
		vi.spyOn(prismaClient.sum, "create");
		const res = await request(app).post("/sum").send({
			a: -1,
			b: -2,
		});
		expect(prismaClient.sum.create).toHaveBeenCalledWith({
			data: {
				a: -1,
				b: -2,
				result: -3,
			},
		});
		expect(res.statusCode).toBe(200);
		expect(res.body.answer).toBe(-3);
	});

	it("should add 0 + 0 to equal 0", async () => {
		prismaClient.sum.create.mockResolvedValue({
			id: 3,
			a: 0,
			b: 0,
			result: 0,
		});
		vi.spyOn(prismaClient.sum, "create");
		const res = await request(app).post("/sum").send({
			a: 0,
			b: 0,
		});
		expect(prismaClient.sum.create).toHaveBeenCalledWith({
			data: {
				a: 0,
				b: 0,
				result: 0,
			},
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
