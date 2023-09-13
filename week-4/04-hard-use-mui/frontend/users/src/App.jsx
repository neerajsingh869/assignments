import React from 'react'
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

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
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
