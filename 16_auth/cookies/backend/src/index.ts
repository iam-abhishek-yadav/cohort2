import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = "mysupersecret";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

interface AuthRequest extends Request {
	user?: { id: number; username: string };
}

const getUserByUsernameAndPassword = async (
	username: string,
	password: string
) => {
	const user = await prisma.user.findUnique({ where: { username } });
	if (user && user.password === password) {
		return user;
	}
	return null;
};

const getUserById = async (id: number) => {
	const user = await prisma.user.findUnique({ where: { id } });
	return user;
};

app.get("/user", async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).send("Access denied. No token provided");
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
			id: number;
		};
		const user = await getUserById(decoded.id);
		if (!user) return res.status(404).send("User not found.");
		res.send({ userId: user.id, username: user.username });
	} catch (error) {
		res.status(400).send("Invalid token");
	}
});

app.post("/signin", async (req, res) => {
	const { username, password } = req.body;
	const user = await getUserByUsernameAndPassword(username, password);
	if (!user) return res.status(400).send("Invalid username or password.");
	const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
	res.cookie("token", token, { httpOnly: true, secure: true });
	res.send("Logged in!");
});

app.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	try {
		const newUser = await prisma.user.create({
			data: { username, password },
		});
		res.status(201).send("User created!");
	} catch (error) {
		res.status(400).send("Error creating user.");
	}
});

app.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.json({ message: "Logged out!" });
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
