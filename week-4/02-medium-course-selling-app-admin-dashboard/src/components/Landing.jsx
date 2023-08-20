import React from "react";
import axios from "axios";  
import { useNavigate } from "react-router-dom";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {

    return (
        <main style={{width:"100vw", height:"93.5vh"}}>
            <div className="welcomePage-wrapper ele-center">
                <h1>
                    Welcome to course selling website!
                </h1>
            </div>
        </main>
    );

}

export default Landing;