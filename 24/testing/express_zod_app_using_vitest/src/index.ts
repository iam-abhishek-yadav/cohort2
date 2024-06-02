import express from "express";
import { z } from "zod";

export const app = express();
app.use(express.json());

const sumInput = z.object({
	a: z.number(),
	b: z.number(),
});

app.post("/sum", (req, res) => {
	const body = sumInput.safeParse(req.body);

	if (!body.success) {
		return res.status(422).json({
			message: "Incorrect Inputs",
		});
	}

	const answer = body.data.a + body.data.b;
	res.json({ answer });
});

app.get("/sum", (req, res) => {
	const body = sumInput.safeParse({
		a: Number(req.headers["a"]),
		b: Number(req.headers["b"]),
	});

	if (!body.success) {
		return res.status(422).json({
			message: "Incorrect inputs",
		});
	}

	const answer = body.data.a + body.data.b;

	res.json({
		answer,
	});
});
