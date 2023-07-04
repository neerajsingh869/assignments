const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Function to authenticate admin
function authenticator(Clients, adminOrUser, username, password){
  let isClientPresent = false;
  let isCorrectCredentials = false;
  for(let client of Clients){
    if(client.username === username){
      isClientPresent = true;
      if(client.password === password){
        isCorrectCredentials = true;
      }
      break;
    }
  }
  if(isClientPresent){
    if(isCorrectCredentials){
      return {
        statusCode: 200,
        message: 'Logged in successfully'
      }
    }
    else{
      return {
        statusCode: 400,
        message: 'Please enter right password.'
      }
    }
  }
  else{
    return {
        statusCode: 400,
        message: adminOrUser + ' not Found. Please signup.' 
      }
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  let adminDtls = req.body;
  ADMINS.push(adminDtls);
  res.json({message: 'Admin created successfully'});
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let adminUsername = req.headers.username;
  let adminPwd = req.headers.password;
  let authDtls = authenticator(ADMINS, 'Admin', adminUsername, adminPwd);
  res.status(authDtls.statusCode).json({message: authDtls.message});
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  let adminUsername = req.headers.username;
  let adminPwd = req.headers.password;
  let authDtls = authenticator(ADMINS, 'Admin', adminUsername, adminPwd);
  if(authDtls.statusCode === 200){
    let course = req.body;
    course.id = Date.now();
    COURSES.push(course);
    res.json({ message: 'Course created successfully', courseId: course.id });
  }else{
    res.status(authDtls.statusCode).json({message: authDtls.message});
  }
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  let adminUsername = req.headers.username;
  let adminPwd = req.headers.password;
  let authDtls = authenticator(ADMINS, 'Admin', adminUsername, adminPwd);
  if(authDtls.statusCode === 200){
    let newCourseDtls = req.body;
    let courseID = req.params.courseId;
    let isCourseUpdated = false;
    for(let course of COURSES){
      if(course.id === Number(courseID)){
        course.title = newCourseDtls.title;
        course.description = newCourseDtls.description;
        course.price = newCourseDtls.price;
        course.imageLink = newCourseDtls.imageLink;
        course.published = newCourseDtls.published;
        isCourseUpdated = true;
        break;
      }
    }
    if(isCourseUpdated){
      res.json({ message: 'Course updated successfully' });
    }
    else{
      res.json({message: 'Course not found.'});
    }
  }else{
    res.status(authDtls.statusCode).json({message: authDtls.message});
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  let adminUsername = req.headers.username;
  let adminPwd = req.headers.password;
  let authDtls = authenticator(ADMINS, 'Admin', adminUsername, adminPwd);
  if(authDtls.statusCode === 200){
    res.send({courses: COURSES});
  }else{
    res.status(authDtls.statusCode).json({message: authDtls.message});
  }
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let userDtls = req.body;
  userDtls.purchasedCourses = [];
  USERS.push(userDtls);
  res.json({message: 'User created successfully'});
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  let userUsername = req.headers.username;
  let userPwd = req.headers.password;
  let authDtls = authenticator(USERS, 'User', userUsername, userPwd);
  res.status(authDtls.statusCode).json({message: authDtls.message});
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  let userUsername = req.headers.username;
  let userPwd = req.headers.password;
  let authDtls = authenticator(USERS, 'User', userUsername, userPwd);
  if(authDtls.statusCode === 200){
    res.send({courses: COURSES});
  }else{
    res.status(authDtls.statusCode).json({message: authDtls.message});
  }
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  let userUsername = req.headers.username;
  let userPwd = req.headers.password;
  let authDtls = authenticator(USERS, 'User', userUsername, userPwd);
  if(authDtls.statusCode === 200){
    let courseID = req.params.courseId;
    let isCoursePresent = false;
    for(let course of COURSES){
      if(course.id === Number(courseID)){
        isCoursePresent = true;
        for(let user of USERS){
          if(user.username === userUsername){
            user.purchasedCourses = [];
            user.purchasedCourses.push(course);
            break;
          }
        }
        break;
      }
    }
    if(isCoursePresent){
      res.json({ message: 'Course purchased successfully' });
    }
    else{
      res.json({message: 'No such course exist.'});
    }
  }else{
    res.status(authDtls.statusCode).json({message: authDtls.message});
  }
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  let userUsername = req.headers.username;
  let userPwd = req.headers.password;
  let authDtls = authenticator(USERS, 'User', userUsername, userPwd);
  if(authDtls.statusCode === 200){
    let userCourses = [];
    for(let user of USERS){
      if(user.username === userUsername){
        userCourses = user.purchasedCourses;
        break;
      }
    }
    res.json({purchasedCourses: userCourses});
  }else{
    res.status(authDtls.statusCode).json({message: authDtls.message});
  }
});

app.use((req, res, next) => {
  res.status(404).send("Route not found");
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
