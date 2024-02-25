// jwtAuthMiddleware.js
const jwt = require("jsonwebtoken")

const authenticateJWT = (req, res, next) => {
	const token = req.header("Authorization")

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" })
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Forbidden" })
		}

		req.user = user
		next()
	})
}

module.exports = authenticateJWT
