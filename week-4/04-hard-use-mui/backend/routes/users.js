// immport necessary libaries
const express = require('express');
const usersController = require('../controllers/users-controller');

// define constant variables
const router = express.Router();

// define all users routes
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/courses', usersController.getCourses);
router.post('/courses/:courseId', usersController.purchaseCourse);
router.get('/purchasedCourses', usersController.getPurchasedCourses);

// export router
module.exports = router;