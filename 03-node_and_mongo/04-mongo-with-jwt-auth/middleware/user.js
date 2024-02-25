const { User } = require("../db/index")

async function userMiddleware(req, res, next) {
	// Implement user auth logic
	// You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
	const username = req.headers.username
	const password = req.headers.password
	try {
		const user = await User.findOne({ username, password })
		if (user) {
			req.user = user
			next()
		} else {
			res.status(403).json({ error: "Unauthorized access" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = userMiddleware
