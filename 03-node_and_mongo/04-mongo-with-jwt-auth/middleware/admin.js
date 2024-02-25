const { Admin } = require("../db/index")
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
	// Implement admin auth logic
	// You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
	const username = req.headers.username
	const password = req.headers.password
	try {
		const admin = await Admin.findOne({ username, password })
		if (admin) {
			req.admin = admin
			next()
		} else {
			res.status(403).json({ error: "Unauthorized access" })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = adminMiddleware
