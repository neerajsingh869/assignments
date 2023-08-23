import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginOrRegisterForm from "./LoginOrRgisterForm";
import "./styles.css";

function Register() {

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Create an Account</h1>
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