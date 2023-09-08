import React from "react";
import axios from "axios";
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

    const [userEmail, setUserEmail] = React.useState(null);

    React.useEffect(() => {
        async function init() {
            try {
                const response = await axios.get(`http://localhost:3000/admin/me`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                }); 
                console.log("Response data from app : " + response.data);
                if (response.data.username) {
                    setUserEmail(response.data.username);
                }
            } catch (err) {
                console.log(err.response);
            }
        }

        init();
    }, []);
    
    return (
        <>  
            <Router>
                <NavBar userEmail={userEmail} setUserEmail={setUserEmail} />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<CreateCourse />} />
                    <Route path="/update/:courseId" element={<UpdateCourse />} />
                    <Route path="/courses" element={<ShowCourses />} />
                </Routes>
            </Router>
        </>
    );

}

export default App;