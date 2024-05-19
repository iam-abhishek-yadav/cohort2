import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "mysupersecret";

const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(
// 	cors({
// 		credentials: true,
// 		origin: "http://localhost:5173",
// 	})
// );

app.use(cors());

interface User {
	id: number;
	email: string;
}

interface AuthRequest extends Request {
	user?: User;
}

const getUserByEmailAndPassword = (email: string, password: string) => {
	if (email === "user@example.com" && password === "password") {
		return { id: 1, email: "user@example.com" };
	}
	return null;
};

const getUserById = (id: number): User | null => {
	if (id === 1) {
		return { id: 1, email: "user@example.com" };
	}
	return null;
};

app.get("/user", (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).send("Access denied. No token provided");
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
			id: number;
		};
		const user = getUserById(decoded.id);
		if (!user) return res.status(404).send("User not found.");
		res.send({ userId: user.id, email: user.email });
	} catch (error) {
		res.status(400).send("Invalid token");
	}
});

app.post("/signin", (req, res) => {
	const { email, password } = req.body;
	const user = getUserByEmailAndPassword(email, password);
	if (!user) return res.status(400).send("Invalid email or password.");
	const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h " });
	res.cookie("token", token, { httpOnly: true, secure: true });
	res.send("Logged in!");
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
