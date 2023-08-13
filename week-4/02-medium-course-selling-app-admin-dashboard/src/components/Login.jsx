import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login(props) {
    const navigate = useNavigate();
    // const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    // another way to use css in react
    // const shortStyles = {
    //     mainStyle : {
    //         width:"100vw",
    //         height:"100vh"
    //     }
    // }

    function verifyEmailInput(email){
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    async function loginAdmin(e) {
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
            // landing page will decide where to send admin
            // props.adminStateChange(true);
            navigate('/');     
        } catch (err) {
            console.log(err);
            window.alert(err.response.data.message);
            // props.adminStateChange(false);
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
                            <input type="email" id="username" onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-large">
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button type="submit" onClick={e => loginAdmin(e)}>Login</button>
                        </div>
                    </form>
                </div>
                <div className="text-center fs-medium">
                    <p>
                        Don't have an account? &nbsp;
                        <span>
                            <a href="/register">Register here</a>
                        </span>
                    </p>
                </div>
            </section>
        </main>
        // <div>
        //     {/* <h1>Login to admin dashboard</h1>
        //     <br/>
        //     Email - <input type={"text"} onChange={e => setEmail(e.target.value)} />
        //     <br/>
        //     <button>Login</button>
        //     <br/>
        //     New here? <a href="/register">Register</a> */}
        // </div>
    );
}

export default Login;