"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const JWT_SECRET = "mysupersecret";
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// app.use(
// 	cors({
// 		credentials: true,
// 		origin: "http://localhost:5173",
// 	})
// );
app.use((0, cors_1.default)());
const getUserByEmailAndPassword = (email, password) => {
    if (email === "user@example.com" && password === "password") {
        return { id: 1, email: "user@example.com" };
    }
    return null;
};
const getUserById = (id) => {
    if (id === 1) {
        return { id: 1, email: "user@example.com" };
    }
    return null;
};
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).send("Access denied. No token provided");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = getUserById(decoded.id);
        if (!user)
            return res.status(404).send("User not found.");
        res.send({ userId: user.id, email: user.email });
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
});
app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const user = getUserByEmailAndPassword(email, password);
    if (!user)
        return res.status(400).send("Invalid email or password.");
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h " });
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.send("Logged in!");
});
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out!" });
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../src/index.html"));
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
