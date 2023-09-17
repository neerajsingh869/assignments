import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import PurchasedCourses from './components/PurchasedCourses';
import PurchaseCourse from './components/PurchaseCourse';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import './App.css'

function App() {

  return (
    <>
      <RecoilRoot>
        <Router>
          <NavBar />
          <InitUser />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/courses' element={<ShowCourses />} />
            <Route path='/courses/purchases' element={<PurchasedCourses />} />
            <Route path='/courses/:courseId' element={<PurchaseCourse />} />
          </Routes>
        </Router> 
      </RecoilRoot>
    </>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState);

  React.useEffect(() => {
        const init = async () => {
          try {
              let response = await axios.get('http://localhost:3000/users/me', {
                  headers: {
                      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                  }
              });
              console.log(response);
              if (response.data.username) {
                  setUser({
                    userEmail: response.data.username
                  });
                  console.log("User state changed from app.jsx");
              }
          } catch (error) {
              console.log(error.stack);
              setUser({
                userEmail: null
              });
          }
      }

      init();
  }, []);

  return (
    <></>
  )
}

export default App
