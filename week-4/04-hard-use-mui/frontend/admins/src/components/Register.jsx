import React from "react";
import { Link } from "react-router-dom";
import LoginOrRegisterForm from "./LoginOrRegisterForm";
import "./styles.css";

function Register() {

    console.log("Register component re-renders");

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Create an Admin Account</h1>
                </header>
                <LoginOrRegisterForm formName={"Register"}/>
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