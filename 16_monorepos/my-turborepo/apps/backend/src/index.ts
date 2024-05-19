import express from "express";
import { NUMBER } from "@repo/common/config";

const app = express();

app.get("/", (req, res) => {
	res.json({
		message: "hello world",
		number: NUMBER,
	});
});

app.listen(3002, () => console.log("Server is listening to Port 3002"));
