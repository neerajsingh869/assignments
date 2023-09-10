import React from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { userEmailState, isUserLoadingState } from "../store/selectors/user";

function NavBar() {
    const navigate = useNavigate();

    // navbar component is subscribed to userState atom
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const userLoading = useRecoilValue(isUserLoadingState);

    // simple method to logout user by removing jwt token
    function logoutUser() {
        localStorage.removeItem('admin-token');
        setUser({
            isLoading: false,
            userEmail: null
        })
        navigate('/');
    }

    console.log("userEmail val in navbar : " + userEmail);

    console.log("userLoading val in navbar : " + userLoading);

    console.log("Navbar component re-renders");

    if (userLoading) {
        return (
            <>
                <Loading />
            </>
        )
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