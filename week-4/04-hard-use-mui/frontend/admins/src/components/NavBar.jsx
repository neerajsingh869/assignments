import React from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";

function NavBar({ isAdminLoggedIn, handleIsAdminLoggedIn }) {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = React.useState(null);

    React.useEffect(() => {
        console.log("hi from navbar");
        async function init() {
            try {
                const response = await axios.get(`http://localhost:3000/admin/me`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                });
                console.log(response.data);
                if (response.data.username) {
                    setUserEmail(response.data.username);
                }
            } catch (err) {
                console.log(err.response);
            }
        }

        init();
    }, []);

    // simple method to logout user by removing jwt token
    function logoutUser() {
        localStorage.removeItem('admin-token');
        window.location = '/';
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