import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import UpdateCourse from './components/UpdateCourse';
import NavBar from './components/NavBar';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(
        localStorage.getItem('admin-token') || false
    );

    // find initial state of isAdminLoggedInState
    React.useEffect(() => {
        console.log("someone changed isAdminLoggedIn state");
    }, [isAdminLoggedIn]);

    return (
        <>  
            <Router>
                <NavBar isAdminLoggedIn={isAdminLoggedIn} handleIsAdminLoggedIn={setIsAdminLoggedIn} />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<CreateCourse isAdminLoggedIn={isAdminLoggedIn} handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    <Route path="/update/:id" element={<UpdateCourse isAdminLoggedIn={isAdminLoggedIn} handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    <Route path="/courses" element={<ShowCourses handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                </Routes>
            </Router>
        </>
    );

}

export default App;