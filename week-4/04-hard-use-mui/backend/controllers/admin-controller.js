const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Course = require('../models/course');
const { SECRET } = require('../middlewares/auth');

const getMyInfo = async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (admin) {
        res.json({ username: admin.username });
    } else {
        res.status(403).json({ message: 'Admin doesnt exist' });
    }
}

const signup = async (req, res) => {
    let { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token })
    }
};

const login = async (req, res) => {
    let { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token })
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
};

const createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
};

const editCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

const getCourses = async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
};

const getCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({ course })
};

module.exports = {
    getMyInfo,
    signup, 
    login, 
    createCourse,
    editCourse,
    getCourses,
    getCourse
}