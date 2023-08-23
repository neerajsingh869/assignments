import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function NavBar({ isUserLoggedIn, handleIsUserLoggedInState }) {

    // simple method to logout user by removing jwt token
    function logoutUser() {
        console.log("user logged out");
        localStorage.removeItem('user-token');
        handleIsUserLoggedInState(false);
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
                    {isUserLoggedIn ? (
                        <LoggedInMenus onClickLogoutHandler={logoutUser}/>
                    ): (
                        <LoggedOutMenus />
                    )}
                </ul>
            </nav>
        </header>
    );

}

function LoggedInMenus({ onClickLogoutHandler }) {
    return (
        <>
            <li>
                <Link to="/courses/purchased" className="nav-link">Purchases</Link>
            </li>
            <li>
                <Link to="/courses" className="nav-link">All Courses</Link>
            </li>
            <li>
                <Link to="/" className="nav-link" onClick={onClickLogoutHandler} >Logout</Link>
            </li>
        </>
    )
}

function LoggedOutMenus() {
    return (
        <>
            <li>
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
                <Link to="/register" className="nav-link">Register</Link>
            </li>
        </>
    )
}

export default NavBar;