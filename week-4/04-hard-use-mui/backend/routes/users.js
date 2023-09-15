// immport necessary libaries
const express = require('express');
const { authenticateJwt } = require('../middlewares/auth');
const usersController = require('../controllers/users-controller');

// define constant variables
const router = express.Router();

// define all users routes
router.get('/me', authenticateJwt, usersController.getMyInfo);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/courses', authenticateJwt, usersController.getCourses);
router.get('/courses/:courseId', authenticateJwt, usersController.getCourseInfo);
router.post('/courses/:courseId', authenticateJwt, usersController.purchaseCourse);
router.get('/purchasedCourses', authenticateJwt, usersController.getPurchasedCourses);

// export router
module.exports = router;