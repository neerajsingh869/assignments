import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css";

function NavBar(props) {

    // simple method to logout user by removing jwt token
    function logoutUser() {
        console.log("user logged out");
        localStorage.removeItem('admin-token');
        props.handleIsAdminLoggedIn(false);
        console.log(localStorage);
    }

    return (
        <header className="nav-header eleV-center">
            <nav className="d-flex jc-between">
                <div>
                    <h1>
                        <Link to="/" className="nav-link">CourseBazzar</Link>
                    </h1>
                </div>
                <ul className="d-flex eleV-center">
                    {props.isAdminLoggedIn ? (
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