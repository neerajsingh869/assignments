import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import ShowCourses from './components/ShowCourses';
import PurchasedCourses from './components/PurchasedCourses';
import PurchaseCourse from './components/PurchaseCourse';
import './App.css';

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(
    localStorage.getItem('user-token') || false
  );

  // find initial state of isUserLoggedInState
  React.useEffect(() => {
      console.log("someone changed isUserLoggedIn state");
  }, [isUserLoggedIn]);


  return (
    <>
      <Router>
        <NavBar isUserLoggedIn={isUserLoggedIn} handleIsUserLoggedInState={setIsUserLoggedIn} />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login handleIsUserLoggedInState={setIsUserLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses' element={<ShowCourses handleIsUserLoggedInState={setIsUserLoggedIn} />} />
          <Route path='/courses/purchased' element={<PurchasedCourses handleIsUserLoggedInState={setIsUserLoggedIn} />} />
          <Route path='/courses/:id' element={<PurchaseCourse handleIsUserLoggedInState={setIsUserLoggedIn} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
