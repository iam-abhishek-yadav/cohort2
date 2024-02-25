const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db/index');

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    try {
        const { username, password } = req.body;
        const exists = await User.findOne({username});
        if(exists) {
            return res.status(400).json({error: 'user already exists'});
        }

        const newUser = new User({username, password});
        await newUser.save();

        res.status(200).json({message: 'User created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({courses: courses});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const {courseId} = req.params;
        const user = req.user;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({error: 'Course not found'});
        }
        if(user.purchasedCourses.includes(courseId.toString())){
            return res.status(400).json({message: 'Course already purchased'});
        }
        user.purchasedCourses.push(course);
        await user.save();
        res.status(200).json({message: 'Course purchased successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = req.user;
        const purchasedCoursesIds = user.purchasedCourses;
        const purchasedCourses = await Course.find({ _id: { $in: purchasedCoursesIds } });
        res.status(200).json({purchasedCourses: purchasedCourses});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router