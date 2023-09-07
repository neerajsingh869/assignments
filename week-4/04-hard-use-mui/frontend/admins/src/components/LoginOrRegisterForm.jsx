import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function LoginOrRegisterForm({ formName }) {

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
        if(formName === "Login") {
            try {
                let response = await axios.post("http://localhost:3000/admin/login", {
                    'HTTP_CONTENT_LANGUAGE': self.language
                }, {
                    headers: {
                        username: username,
                        password: password
                    }
                });
                localStorage.setItem('admin-token', response.data.token);
                window.alert(response.data.message); 
                window.location = '/courses';
            } catch (err) {
                console.log(err);
                window.alert(err.response.data.message);
                localStorage.removeItem('admin-token');
            }
        } else {
            try {
                let response = await axios.post("http://localhost:3000/admin/signup", {
                    username, 
                    password
                });
                window.alert(response.data.message);
                window.location = '/login';
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