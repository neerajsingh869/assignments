import React from "react";
import axios from "axios";  
import { useNavigate } from "react-router-dom";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing(props) {
    const navigate = useNavigate();

    React.useEffect(() => {
        async function isAdminLoggedIn() {
            console.log("Inside admin loggin check");
            console.log(localStorage.getItem('admin-token'));
            // check whether token in present or not
            if(localStorage.getItem('admin-token')){
                // if token is present, check whether it is expired or not
                try {
                    await axios.get("http://localhost:3000/admin/courses", {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                        }
                    });  
                    props.adminStateChange(true);
                    navigate('/courses');
                } catch (err) {
                    console.log(err);
                    window.alert("Your session has ended. Please login again.");
                    localStorage.removeItem('admin-token');
                    props.adminStateChange(false);
                }
            } else {
                localStorage.removeItem('admin-token');
                props.adminStateChange(false);
            }
        }
        isAdminLoggedIn();
    }, []);

    return (
        <main style={{width:"100vw"}}>
            <div className="welcomePage-wrapper ele-center">
                <h1>
                    Welcome to course selling website!
                </h1>
            </div>
        </main>
        // <div>
        //     <h1>Welcome to course selling website!</h1>
        //     <a href="/register">Register</a>
        //     <br/>
        //     <a href="/login">Login</a>
        // </div>
    );
}

export default Landing;