import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import UpdateCourse from './components/UpdateCourse';
import { NavBarBeforeLogin, NavBarAfterLogin } from './components/NavBar';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(false);

    // find initial state of isAdminLoggedInState
    React.useEffect(() => {
        if(localStorage.getItem('admin-token')) {
            setIsAdminLoggedIn(true);
        } else {
            setIsAdminLoggedIn(false);
        }
    }, []);

    return (
        <>  
            <Router>
                {isAdminLoggedIn === true ? <NavBarAfterLogin handleIsAdminLoggedIn={setIsAdminLoggedIn} /> : <NavBarBeforeLogin />}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login isAdminLoggedIn={isAdminLoggedIn} handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<CreateCourse handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    <Route path="/update/:id" element={<UpdateCourse handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                    <Route path="/courses" element={<ShowCourses handleIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                </Routes>
            </Router>
        </>
    );

}

export default App;