const { Router } = require("express")
const adminMiddleware = require("../middleware/admin")
const router = Router()
const { Course, Admin } = require("../db/index")

// Admin Routes
router.post("/signup", async (req, res) => {
	// Implement admin signup logic
	try {
		const { username, password } = req.body
		const exists = await Admin.findOne({ username })
		if (exists) {
			return res.status(400).json({ error: "Admin already exists" })
		}

		const newAdmin = new Admin({ username, password })
		await newAdmin.save()

		res.status(200).json({ message: "Admin created successfully" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

router.post("/courses", adminMiddleware, async (req, res) => {
	// Implement course creation logic
	try {
		const { title, description, price, imageLink } = req.body
		const newCourse = new Course({
			title,
			description,
			price,
			imageLink,
			published: true,
		})
		const savedCourse = await newCourse.save()
		res.status(200).json({
			message: "Course created successfully",
			courseId: savedCourse._id,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

router.get("/courses", adminMiddleware, async (req, res) => {
	// Implement fetching all courses logic
	try {
		const courses = await Course.find({})
		res.status(200).json({ courses: courses })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

module.exports = router
