import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app } from "../index";

describe("POST /sum", () => {
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
});
