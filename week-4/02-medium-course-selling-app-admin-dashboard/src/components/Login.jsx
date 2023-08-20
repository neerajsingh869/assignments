import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css"

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login(props) {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function verifyEmailInput(email){
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    async function validateFormAndSubmit(e) {
        e.preventDefault();

        let isEmailInputValid = verifyEmailInput(username.trim());

        if(!isEmailInputValid){
            window.alert("Please enter valid email");
            return;
        }

        try {
            let response = await axios.post("http://localhost:3000/admin/login", {
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    username: username,
                    password: password
                }
            });
            console.log(response.data); 
            // save jwt token in localStorage to monitor user session
            localStorage.setItem('admin-token', response.data.token);
            console.log(localStorage);
            window.alert(response.data.message); 
            // after successful login, take admin to landing page
            props.handleIsAdminLoggedIn(true);
            navigate('/courses');   
        } catch (err) {
            console.log(err);
            window.alert(err.response.data.message);
            localStorage.removeItem('admin-token');
            props.handleIsAdminLoggedIn(false);
        }
    }

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Login to admin dashboard</h1>
                </header>
                <div>
                    <form action="">
                        <div className="mb-normal">
                            <label htmlFor="username">Email</label>
                            <br />
                            <input type="email" id="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-large">
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" onClick={(e) => validateFormAndSubmit(e)}>Login</button>
                        </div>
                    </form>
                </div>
                <div className="text-center fs-medium">
                    <p>
                        Don't have an account? &nbsp;
                        <span>
                            <Link to="/register">Register here</Link>
                        </span>
                    </p>
                </div>
            </section>
        </main>
    );

}

export default Login;