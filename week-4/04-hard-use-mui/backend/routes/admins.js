// immport necessary libaries
const express = require('express');
const adminController = require('../controllers/admin-controller');

// define constant variables
const router = express.Router();

// define all admin routes
router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/courses', adminController.createCourse);
router.put('/courses/:courseId', adminController.editCourse);
router.get('/courses', adminController.getCourses);

// export router
module.exports = router;