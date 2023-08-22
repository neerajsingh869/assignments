import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function NavBar() {

    let isAdminLoggedIn = false;

    return (
        <header className="nav-header eleV-center">
            <nav className="d-flex jc-between">
                <div>
                    <h1>
                        <Link to="/" className="nav-link">CourseBazzar</Link>
                    </h1>
                </div>
                <ul className="d-flex eleV-center">
                    {isAdminLoggedIn ? (
                        <>
                            <li>
                                <Link to="/courses/purchased" className="nav-link">Purchases</Link>
                            </li>
                            <li>
                                <Link to="/courses" className="nav-link">All Courses</Link>
                            </li>
                            <li>
                                <Link to="/" className="nav-link">Logout</Link>
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
    );

}

export default NavBar;