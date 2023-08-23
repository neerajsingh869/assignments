import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginOrRegisterForm from "./LoginOrRgisterForm";
import "./styles.css";

function Login({ handleIsUserLoggedInState }) {

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Login to CourseBazzar</h1>
                </header>
                <LoginOrRegisterForm formName={"Login"}
                                handleIsUserLoggedInState={handleIsUserLoggedInState}/>
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