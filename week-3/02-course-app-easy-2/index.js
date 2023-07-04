const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const SECRET_KEY = 'secret';
const TOKEN_EXPIRTY = '1h';

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  let adminDtls = req.body;
  jwt.sign(adminDtls, SECRET_KEY, {expiresIn: TOKEN_EXPIRTY}, (err, token) => {
    if(err){
      res.status(400).json({error : err.message});
    }
    else{
      adminDtls.token = token;
      ADMINS.push(adminDtls);
      res.status(200).json({ 
        message: 'Admin created successfully', 
        token: token 
      });
    }
  })
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let adminUsername = req.headers.username;
  let adminPwd = req.headers.password;
  let isAdminPresent = false;
  let isCorrectCredentials = false;
  let jwtToken = null;
  for(let admin of ADMINS){
    if(admin.username === adminUsername){
      isAdminPresent = true;
      if(admin.password === adminPwd){
        isCorrectCredentials = true;
        jwtToken = admin.token;
      }
      break;
    }
  }
  if(isAdminPresent){
    if(isCorrectCredentials){
      res.json({ message: 'Logged in successfully', token: jwtToken });
    }
    else{
      res.status(400).json({message: 'Please enter right password.'});
    }
  }
  else{
    res.status(400).json({message: 'Admin not Found. Please signup.'});
  }
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  let adminToken = req.headers.authorization;
  if(typeof(adminToken) !== "undefined"){
    adminToken = adminToken.split(" ")[1];
    jwt.verify(adminToken, SECRET_KEY, (err, adminDtls) => {
      if(err){
        res.status(400).json({error : err.message});
      }else{
        let isTokenAdmins = false;
        for(let admin of ADMINS){
          if(admin.username == adminDtls.username){
            isTokenAdmins = true;
            break;
          }
        }
        if(isTokenAdmins){
          let course = req.body;
          course.id = Date.now();
          COURSES.push(course);
          res.json({ message: 'Course created successfully', courseId: course.id });
        }
        else{
          res.status(400).json({message: 'Only Admins can create Course.'})
        }
      }
    });
  }
  else{
    res.status(400).json({message: 'Please provide Token'});
  }
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  let adminToken = req.headers.authorization;
  if(typeof(adminToken) !== "undefined"){
    adminToken = adminToken.split(" ")[1];
    jwt.verify(adminToken, SECRET_KEY, (err, adminDtls) => {
      if(err){
        res.status(400).json({error : err.message});
      }else{
        let isTokenAdmins = false;
        for(let admin of ADMINS){
          if(admin.username == adminDtls.username){
            isTokenAdmins = true;
            break;
          }
        }
        if(isTokenAdmins){
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
        }
        else{
          res.status(400).json({message: 'Only Admins can update Course details.'});
        }
      }
    });
  }
  else{
    res.status(400).json({message: 'Please provide Token'});
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  let adminToken = req.headers.authorization;
  if(typeof(adminToken) !== "undefined"){
    adminToken = adminToken.split(" ")[1];
    jwt.verify(adminToken, SECRET_KEY, (err, adminDtls) => {
      if(err){
        res.status(400).json({error : err.message});
      }else{
        let isTokenAdmins = false;
        for(let admin of ADMINS){
          if(admin.username == adminDtls.username){
            isTokenAdmins = true;
            break;
          }
        }
        if(isTokenAdmins){
          res.send({courses: COURSES});
        }
        else{
          res.status(400).json({message: 'Only Admins can see courses on this route.'});
        }
      }
    });
  }
  else{
    res.status(400).json({message: 'Please provide Token'});
  }
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let userDtls = req.body;
  jwt.sign(userDtls, SECRET_KEY, {expiresIn: TOKEN_EXPIRTY}, (err, token) => {
    if(err){
      res.status(400).json({error : err.message});
    }
    else{
      userDtls.token = token;
      USERS.push(userDtls);
      res.status(200).json({ 
        message: 'User created successfully', 
        token: token 
      });
    }
  })
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  let userUsername = req.headers.username;
  let userPwd = req.headers.password;
  let isUserPresent = false;
  let isCorrectCredentials = false;
  let jwtToken = null;
  for(let user of USERS){
    if(user.username === userUsername){
      isUserPresent = true;
      if(user.password === userPwd){
        isCorrectCredentials = true;
        jwtToken = user.token;
      }
      break;
    }
  }
  if(isUserPresent){
    if(isCorrectCredentials){
      res.json({ message: 'Logged in successfully', token: jwtToken });
    }
    else{
      res.status(400).json({message: 'Please enter right password.'});
    }
  }
  else{
    res.status(400).json({message: 'User not Found. Please signup.'});
  }
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  let userToken = req.headers.authorization;
  if(typeof(userToken) !== "undefined"){
    userToken = userToken.split(" ")[1];
    jwt.verify(userToken, SECRET_KEY, (err, userDtls) => {
      if(err){
        res.status(400).json({error : err.message});
      }else{
        let isTokenUsers = false;
        for(let user of USERS){
          if(user.username == userDtls.username){
            isTokenUsers = true;
            break;
          }
        }
        if(isTokenUsers){
          res.json({courses: COURSES});
        }
        else{
          res.status(400).json({message: 'Only Users can see courses on this route.'});
        }
      }
    });
  }
  else{
    res.status(400).json({message: 'Please provide Token'});
  }
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  let userToken = req.headers.authorization;
  if(typeof(userToken) !== "undefined"){
    userToken = userToken.split(" ")[1];
    jwt.verify(userToken, SECRET_KEY, (err, userDtls) => {
      if(err){
        res.status(400).json({error : err.message});
      }else{
        let isTokenUsers = false;
        for(let user of USERS){
          if(user.username == userDtls.username){
            isTokenUsers = true;
            break;
          }
        }
        if(isTokenUsers){
          let courseID = req.params.courseId;
          let isCoursePresent = false;
          for(let course of COURSES){
            if(course.id === Number(courseID)){
              isCoursePresent = true;
              for(let user of USERS){
                if(user.username === userDtls.username){
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
        }
        else{
          res.status(400).json({message: 'Only Valid Users can purchase course.'});
        }
      }
    });
  }
  else{
    res.status(400).json({message: 'Please provide Token'});
  }
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  let userToken = req.headers.authorization;
  if(typeof(userToken) !== "undefined"){
    userToken = userToken.split(" ")[1];
    jwt.verify(userToken, SECRET_KEY, (err, userDtls) => {
      if(err){
        res.status(400).json({error : err.message});
      }else{
        let isTokenUsers = false;
        for(let user of USERS){
          if(user.username == userDtls.username){
            isTokenUsers = true;
            break;
          }
        }
        if(isTokenUsers){
          let userCourses = [];
          for(let user of USERS){
            if(user.username === userDtls.username){
              userCourses = user.purchasedCourses;
              break;
            }
          }
          res.json({purchasedCourses: userCourses});
        }
        else{
          res.status(400).json({message: 'Only Valid user can see puchased courses.'});
        }
      }
    });
  }
  else{
    res.status(400).json({message: 'Please provide Token'});
  }
});

app.use((req, res, next) => {
  res.status(404).send("Route not found");
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
