import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css"

function NavBarBeforeLogin() {
    return (
        // <header className="nav-header eleV-center">
        //     <nav className="d-flex jc-between">
        //         <div>
        //             <h1>
        //                 <Link to="/" className="nav-link">CourseBazzar</Link>
        //             </h1>
        //         </div>
        //         <ul className="d-flex eleV-center">
        //             <li>
        //                 <Link to="/login" className="nav-link">Login</Link>
        //             </li>
        //             <li>
        //                 <Link to="/register" className="nav-link">Register</Link>
        //             </li>
        //         </ul>
        //     </nav>
        // </header>

        // static page
        <header className="nav-header eleV-center">
            <nav className="d-flex jc-between">
                <div>
                    <h1>
                        CourseBazzar
                    </h1>
                </div>
                <ul className="d-flex eleV-center">
                    <li>
                        Login
                    </li>
                    <li>
                        Register
                    </li>
                </ul>
            </nav>
        </header>
    )
}

function NavBarAfterLogin() {

    function logoutUser() {
        console.log("user logged out");
        localStorage.removeItem('admin-token');
        console.log(localStorage);
    }

    return (
        // <header className="nav-header eleV-center">
        //     <nav className="d-flex jc-between">
        //         <div>
        //             <h1>
        //                 <Link to="/" className="nav-link">CourseBazzar</Link>
        //             </h1>
        //         </div>
        //         <ul className="d-flex eleV-center">
        //             <li>
        //                 <Link to="/about" className="nav-link">Create Course</Link>
        //             </li>
        //             <li>
        //                 <Link to="/courses" className="nav-link">All Courses</Link>
        //             </li>
        //             <li>
        //                 <Link to="/" className="nav-link" onClick={logoutUser}>Logout</Link>
        //             </li>
        //         </ul>
        //     </nav>
        // </header>

        // static page
        <header className="nav-header eleV-center">
            <nav className="d-flex jc-between">
                <div>
                    <h1>
                        CourseBazzar
                    </h1>
                </div>
                <ul className="d-flex eleV-center">
                    <li>
                        Create Course
                    </li>
                    <li>
                        All Courses
                    </li>
                    <li>
                        Logout
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export { NavBarBeforeLogin, NavBarAfterLogin };