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
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";

function App() {
    
    return (
        <RecoilRoot>  
            <Router>
                <NavBar />
                <InitUser />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<CreateCourse />} />
                    <Route path="/update/:courseId" element={<UpdateCourse />} />
                    <Route path="/courses" element={<ShowCourses />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );

}

function InitUser() {
    const setUser = useSetRecoilState(userState);

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
                    setUser({
                        isLoading: false,
                        userEmail: response.data.username
                    })
                } else {
                    setUser({
                        isLoading: false,
                        userEmail: null
                    })
                }
            } catch (err) {
                console.log(err.response);
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        }

        init();
    }, []);

    console.log("App component re-renders");

    return <></>;
}

export default App;