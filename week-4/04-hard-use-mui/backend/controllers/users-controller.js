const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Course = require('../models/course');
const { SECRET } = require('../middlewares/auth');

const getMyInfo = async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(403).json({ message: 'User doesnt exist' });
    }
}

const signup = async (req, res) => {
    let { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token })
    }
};

const login = async (req, res) => {
    let { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token })
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
};

const getCourses = async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
};

const getCourseInfo = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
        res.json({ course })
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

const purchaseCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
        const user = await User.findOne({ username: req.user.username });
        if (user) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: 'Course purchased successfully' })
        } else {
            res.status(403).json({ message: 'User not found' }); 
        }
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

const getPurchasedCourses = async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
};

module.exports = {
    getMyInfo,
    signup,
    login,
    getCourses,
    getCourseInfo,
    purchaseCourse,
    getPurchasedCourses
}