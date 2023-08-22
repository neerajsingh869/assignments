import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Register() {

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Create an Account</h1>
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
                            <input type="password" id="password"/>
                        </div>
                        <div>
                            <button type="submit" >Register</button>
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