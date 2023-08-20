import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css"

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
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
            let response = await axios.post("http://localhost:3000/admin/signup", {username, password});
            window.alert(response.data.message);
            // after successful registration, take admin to login page
            navigate('/login');
            console.log(response.data);   
        } catch (err) {
            window.alert(err.response.data.message);
            console.log(err.response.data);
        }
    }

    return (
        // static page
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Create an Admin Account</h1>
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
                            <button type="submit" onClick={(e) => validateFormAndSubmit(e)} >Register</button>
                        </div>
                    </form>
                </div>
                <div className="text-center fs-medium">
                    <p>
                        Have already an account? &nbsp;
                        <span>
                            <Link to="/login">Login here</Link>
                        </span>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Register;