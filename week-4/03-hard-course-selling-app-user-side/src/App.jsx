import { useState } from 'react';
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

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses' element={<ShowCourses />} />
          <Route path='/courses/purchased' element={<PurchasedCourses />} />
          <Route path='/courses/:id' element={<PurchaseCourse />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
