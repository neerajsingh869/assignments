// immport necessary libaries
const express = require('express');
const usersRouter = require('./users');
const adminsRouter = require('./admins');

// define constant variables
const router = express.Router();

// redirect all admin incoming routes to adminsRouter
router.use('/admin', adminsRouter);
// redirect all user incoming routes to usersRouter
router.use('/users', usersRouter);

// export router
module.exports = router;