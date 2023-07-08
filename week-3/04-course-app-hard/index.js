const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

const SECRET_KEY_ADMIN = 'secretAdmin';
const SECRET_KEY_USER = 'secretUser';

app.use(express.json());

// In order to connect to your mongodb database (here, I am connecting to sellcoursesdb database)
mongoose.connect('mongodb+srv://neerajsingh869:HhA5ofblJxLvtqlN@cluster0.zokxlcy.mongodb.net/sellcoursesdb');

// Defining schema for admins, users, and courses
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

// Creating mongoose model for admins, users, and courses
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

// Admin JWT authorization middleware
const authenticateAdminJwt = (req, res, next) => {
  let adminAuth = req.headers.authorization;
  if(adminAuth){
    let adminToken = adminAuth.split(" ")[1];
    jwt.verify(adminToken, SECRET_KEY_ADMIN, (err, data) => {
      if(err){
        res.status(403).json({message: 'Authorization failed', error: err.message});
        return;
      }
      req.admin = data;
      next();
    })
  }
  else{
    res.status(401).json({message: 'Please provide jwt token'});
  }
};

// User authorization middleware
const authenticateUserJwt = (req, res, next) => {
  let userAuth = req.headers.authorization;
  if(userAuth){
    let userToken = userAuth.split(" ")[1];
    jwt.verify(userToken, SECRET_KEY_USER, (err, data) => {
      if(err){
        res.status(403).json({message: 'Authorization failed', error: err.message});
        return;
      }
      req.user = data;
      next();
    })
  }
  else{
    res.status(401).json({message: 'Please provide jwt token'});
  }
};

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  let {username, password} = req.body;
  try{
    let isAdminPresent = await Admin.findOne({username});
    if(isAdminPresent){
      res.status(400).send('Admin already exists');
    }
    else{
      await Admin.create({username, password});
      let token = jwt.sign({ username }, SECRET_KEY_ADMIN, { expiresIn: '1h' });
      res.json({message: 'Admin created successfully', token});
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  let {username, password} = req.headers;
  try{
    let isAdminPresent = await Admin.findOne({username, password});
    if(isAdminPresent){
      let token = jwt.sign({ username }, SECRET_KEY_ADMIN, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    }
    else{
      res.status(403).json({ message: 'Invalid username or password' });
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.post('/admin/courses', authenticateAdminJwt, async (req, res) => {
  // logic to create a course
  try{
    let isCoursePresent = await Course.findOne(req.body);
    if(isCoursePresent){
      res.status(400).json({message: 'Course already exists'});
    }
    else{
      let course = new Course(req.body);
      await course.save();
      res.json({ message: 'Course created successfully', courseId: course.id });
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.put('/admin/courses/:courseId', authenticateAdminJwt, async (req, res) => {
  // logic to edit a course
  try{
    let isCourseUpdated = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
    if(isCourseUpdated){
      res.json({message: 'Course updated successfully'});
    }
    else{
      res.status(404).json({message: 'Course not found'});
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.get('/admin/courses', authenticateAdminJwt, async (req, res) => {
  // logic to get all courses
  try{
    let courses = await Course.find({});
    res.json({courses});
  }
  catch(error){
    res.status(400).send(err);
  }
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  let {username, password} = req.body;
  try{
    let isUserPresent = await User.findOne({username});
    if(isUserPresent){
      res.status(400).send('User already exists');
    }
    else{
      await User.create({username, password});
      let token = jwt.sign({ username }, SECRET_KEY_USER, { expiresIn: '1h' });
      res.json({message: 'User created successfully', token});
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  let {username, password} = req.headers;
  try{
    let isUserPresent = await User.findOne({username, password});
    if(isUserPresent){
      let token = jwt.sign({ username }, SECRET_KEY_USER, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    }
    else{
      res.status(403).json({ message: 'Invalid username or password' });
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.get('/users/courses', authenticateUserJwt, async (req, res) => {
  // logic to list all courses (must be published)
  try{
    let courses = await Course.find({published: true});
    res.json({courses})
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.post('/users/courses/:courseId', authenticateUserJwt, async (req, res) => {
  // logic to purchase a course
  try{
    let course = await Course.findById(req.params.courseId);
    if(course){
      let user = await User.findOne({username: req.user.username});
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    }
    else{
      res.status(404).json({message: 'Course not found'});
    }
  }
  catch(error){
    res.status(400).send(err);
  }
});

app.get('/users/purchasedCourses', authenticateUserJwt, async (req, res) => {
  // logic to view purchased courses
  try{
    let user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    res.json({purchasedCourses: user.purchasedCourses});
  }
  catch(error){
    res.status(400).send(err);
  }
});

// for other routes
app.use((req, res, next) => {
  res.status(404).json({message: 'Route not found'});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
