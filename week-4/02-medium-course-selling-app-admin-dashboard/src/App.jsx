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
    const [adminState, setAdminState] = React.useState(false);
    const [navBar, setNavBar] = React.useState(null);

    function handleAdminState(newState) {
        setAdminState(newState);
    }

    React.useEffect(() => {
        console.log(adminState);
        if(adminState) {
            setNavBar(<NavBarAfterLogin />);
        } else {
            setNavBar(<NavBarBeforeLogin />);
        }
        console.log(navBar);
    }, [adminState]);

    return (
        <>  
            <Router>
                {navBar}
                <Routes>
                    <Route path="/" element={<Landing adminStateChange={handleAdminState} />} />
                    <Route path="/login" element={<Login adminStateChange={handleAdminState} />} />
                    <Route path="/register" element={<Register adminStateChange={handleAdminState} />} />
                    <Route path="/about" element={<CreateCourse adminStateChange={handleAdminState} />} />
                    <Route path="/update/:id" element={<UpdateCourse adminStateChange={handleAdminState} />} />
                    <Route path="/courses" element={<ShowCourses adminStateChange={handleAdminState} />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;