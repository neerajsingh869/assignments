import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    let navigate = useNavigate();

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [published, setPublished] = React.useState("");

    function formValidation() {
        let isFormValid = true;
        let alertMsg = null;
        
        if(!title) {
            alertMsg = (alertMsg === null) ? "-> Title field is mandatory. " : 
                                    alertMsg + "\n-> Title field is mandatory. ";
            isFormValid = false;
        } else {
            if(title.length >= 50) {
                alertMsg = (alertMsg === null) ? "-> Title field excess 50 characters limit. " :
                                        alertMsg + "\n-> Title field excess 50 characters limit. ";
                isFormValid = false;
            }
        }

        if(!description) {
            alertMsg = (alertMsg === null) ? "-> Description field is mandatory. " : 
                                    alertMsg + "\n-> Description field is mandatory. ";
            isFormValid = false;
        } else {
            if(description.length >= 150) {
                alertMsg = (alertMsg === null) ? "-> Description field excess 150 characters limit. " :
                                        alertMsg + "\n-> Description field excess 150 characters limit. ";
                isFormValid = false;
            }
        }

        if(!imageUrl) {
            alertMsg = (alertMsg === null) ? "-> ImageUrl field is mandatory. " : 
                                    alertMsg + "\n-> ImageUrl field is mandatory. ";
            isFormValid = false;
        } else {
            if(!verifyUrlInput(imageUrl)) {
                alertMsg = (alertMsg === null) ? "-> ImageUrl format is not valid. " :
                                    alertMsg + "\n-> ImageUrl format is not valid. ";
                isFormValid = false;
            }
        }

        if(!price) {
            alertMsg = (alertMsg === null) ? "-> Price field is mandatory. " : 
                                    alertMsg + "\n-> Price field is mandatory. ";
            isFormValid = false;
        } else {
            if(price < 0) {
                alertMsg = (alertMsg === null) ? "-> Price of course cannot be negative. " :
                                    alertMsg + "\n-> Price of course cannot be negative. ";
                isFormValid = false;
            }   
        }
        
        if(!published) {
            alertMsg = (alertMsg === null) ? "-> Published field is mandatory. " : 
                                    alertMsg + "\n-> Published field is mandatory. ";
            isFormValid = false;
        }

        console.log(alertMsg);

        return {
            isFormValid, alertMsg
        };
    }

    function verifyUrlInput(url) {
        const urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
        return urlPattern.test(url);
    }
    
    async function validateFormAndCreateCourse(e){
        e.preventDefault();

        let {isFormValid, alertMsg} = formValidation();
        console.log(title, description, imageUrl, price, published);
        console.log(typeof(price));
        console.log(typeof(published));
        if(!isFormValid) {
            window.alert(alertMsg);
        } else {
            try {
                let response = await axios.post("http://localhost:3000/admin/courses", {
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    price: Number(price),
                    published: (published === "true"),
                    'HTTP_CONTENT_LANGUAGE': self.language
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                }); 
                window.alert(response.data.message);
                navigate('/courses');
            } catch (err) {
                if(err.response.status === 403){
                    window.alert("Your session ended. Please login again");
                    props.handleIsAdminLoggedIn(false);
                    navigate('/login');
                }
                else{
                    window.alert("Something went wrong. Please see the logs");
                    console.log(err.response);
                }
            }
        }
    }

    return (
        // static page
        <main className="ele-center">
            <section className="createCourse-section">
                <header className="text-center">
                    <h1>Create Course Panel</h1>
                </header>
                <div className="createCourseForm-wrapper">
                    <form action="">
                        <div className="mb-normal">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-normal">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-normal">
                            <label htmlFor="image-url">Image Url</label>
                            <input type="url" id="image-url" onChange={e => setImageUrl(e.target.value)} />
                        </div>
                        <div className="mb-large d-flex jc-between">
                            <div>
                                <label htmlFor="price">Price</label>
                                <br />
                                <input type="number" id="price" onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="published">Published</label>
                                <br />
                                <select name="" id="published" onChange={e => setPublished(e.target.value)} >
                                    <option value="" selected disabled hidden>Please select</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button type="submit" onClick={e => validateFormAndCreateCourse(e)} >Create Course</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );

}

export default CreateCourse;