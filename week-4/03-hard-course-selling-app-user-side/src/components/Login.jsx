import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Login() {

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Login to CourseBazzar</h1>
                </header>
                <div>
                    <form action="">
                        <div className="mb-normal">
                            <label htmlFor="username">Email</label>
                            <br />
                            <input type="email" id="username" />
                        </div>
                        <div className="mb-large">
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" id="password" />
                        </div>
                        <div>
                            <button type="submit" >Login</button>
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