import React from "react";
import { Link } from "react-router-dom";
import LoginOrRegisterForm from "./LoginOrRegisterForm";
import "./styles.css";

function Login({ handleIsAdminLoggedIn }) {

    return (
        <main className="ele-center">
            <section className="loginReg-section">
                <header className="text-center">
                    <h1>Login to admin dashboard</h1>
                </header>
                <LoginOrRegisterForm formName={"Login"}
                                handleIsAdminLoggedIn={handleIsAdminLoggedIn}/>
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