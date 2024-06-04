import express from "express";
import { prismaclient } from "./db";

export const app = express();

app.use(express.json());

app.post("/sum", async (req, res) => {
	const { a, b } = req.body;
	if (a > 1000000 || b > 1000000) {
		return res.status(422).json({
			message: "Sorry we dont support big numbers",
		});
	}
	const result = a + b;

	const request = await prismaclient.request.create({
		data: {
			a: a,
			b: b,
			answer: result,
			type: "ADD",
		},
	});
	res.json({ answer: result, id: request.id });
});
