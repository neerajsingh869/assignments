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
import './App.css'

function App() {
  console.log("App page re-renders");

  const [ userEmail, setUserEmail ] = React.useState(null);

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
                    setUserEmail(response.data.username);
                }
            } catch (error) {
                console.log(error.stack);
            }
        }

        init();
    }, []);

  return (
    <>
      <Router>
        <NavBar userEmail={userEmail} setUserEmailState={setUserEmail} />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login setUserEmailState={setUserEmail} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses' element={<ShowCourses />} />
          <Route path='/courses/purchases' element={<PurchasedCourses />} />
          <Route path='/courses/:courseId' element={<PurchaseCourse />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
