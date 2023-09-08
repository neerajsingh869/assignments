import React from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";

function NavBar({ userEmail, setUserEmail }) {
    const navigate = useNavigate();

    // simple method to logout user by removing jwt token
    function logoutUser() {
        localStorage.removeItem('admin-token');
        setUserEmail(null);
        navigate('/');
    }

    console.log("userEmail val in navbar : " + userEmail);

    return (
        <header className="nav-header eleV-center">
            <nav className="d-flex jc-between">
                <div>
                    <h1>
                        <Link to="/" className="nav-link">CourseBazzar</Link>
                    </h1>
                </div>
                <ul className="d-flex eleV-center">
                    {userEmail ? (
                        <>
                            <li>
                                <Link to="/about" className="nav-link">Create Course</Link>
                            </li>
                            <li>
                                <Link to="/courses" className="nav-link">All Courses</Link>
                            </li>
                            <li>
                                <Link to="/" className="nav-link" onClick={logoutUser}>Logout</Link>
                            </li>
                        </>
                    ): (
                        <>
                            <li>
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )

}

export default NavBar;