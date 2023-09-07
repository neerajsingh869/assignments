// immport necessary libaries
const express = require('express');
const { authenticateJwt } = require('../middlewares/auth');
const adminController = require('../controllers/admin-controller');

// define constant variables
const router = express.Router();

// define all admin routes
router.get('/me', authenticateJwt, adminController.getMyInfo);
router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/courses', authenticateJwt, adminController.createCourse);
router.put('/courses/:courseId', authenticateJwt, adminController.editCourse);
router.get('/courses', authenticateJwt, adminController.getCourses);
router.get('/courses/:courseId', authenticateJwt, adminController.getCourse);

// export router
module.exports = router;