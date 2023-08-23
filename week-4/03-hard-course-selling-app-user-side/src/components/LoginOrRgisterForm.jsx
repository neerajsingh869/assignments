import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

function LoginOrRegisterForm({ formName, handleIsUserLoggedInState }) {

    let navigate = useNavigate();

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
        console.log(formName);
        console.log(typeof formName);
        if(formName === "Login") {
            try {
                let response = await axios.post("http://localhost:3000/users/login", {
                    'HTTP_CONTENT_LANGUAGE': self.language
                }, {
                    headers: {
                        username: username,
                        password: password
                    }
                });
                console.log(response.data); 
                // save jwt token in localStorage to monitor user session
                localStorage.setItem('user-token', response.data.token);
                console.log(localStorage);
                window.alert(response.data.message); 
                // after successful login, take admin to landing page
                handleIsUserLoggedInState(true);
                navigate('/courses');   
            } catch (err) {
                console.log(err);
                window.alert(err.response.data.message);
                localStorage.removeItem('user-token');
                handleIsUserLoggedInState(false);
            }
        } else {
            try {
                console.log(username, password);
                let response = await axios.post("http://localhost:3000/users/signup", {username, password});
                window.alert(response.data.message);
                // after successful registration, take user to login page
                navigate('/login');
                console.log(response.data);   
            } catch (err) {
                window.alert(err.response.data.message);
                console.log(err.response.data);
            }
        }
        
    }

    return (
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
                    <button type="submit" onClick={(e) => validateFormAndSubmit(e)} >{formName}</button>
                </div>
            </form>
        </div>
    )
}

export default LoginOrRegisterForm;