import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse(props) {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [published, setPublished] = React.useState("");

    let navigate = useNavigate();

    // React.useEffect(() => {
    //     async function isAdminLoggedIn() {
    //         console.log("Inside admin loggin check");
    //         console.log(localStorage.getItem('admin-token'));
    //         // check whether token in present or not
    //         if(localStorage.getItem('admin-token')){
    //             // if token is present, check whether it is expired or not
    //             try {
    //                 await axios.get("http://localhost:3000/admin/courses", {
    //                     headers: {
    //                         Authorization: 'Bearer ' + localStorage.getItem('admin-token')
    //                     }
    //                 });  
    //                 props.adminStateChange(true);
    //             } catch (err) {
    //                 console.log(err);
    //                 window.alert("Your session has ended. Please login again.");
    //                 props.adminStateChange(false);
    //                 localStorage.removeItem('admin-token');
    //             }
    //         } else {
    //             localStorage.removeItem('admin-token');
    //             window.alert("You can't access this route. Please login.");
    //             navigate('/login');
    //             props.adminStateChange(false);
    //         }
    //     }
    //     isAdminLoggedIn();
    // }, []);

    function formValidation() {
        let isFormValid = true;
        let alertMsg = null;
        console.log(title, description, imageUrl, price, published);
        console.log("published type :" + typeof(published));
        console.log("published conversion :" + published == "true");
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
                alertMsg = (alertMsg === null) ? "-> Description field excess 50 characters limit. " :
                                        alertMsg + "\n-> Description field excess 50 characters limit. ";
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
    
    console.log("heelo");
    async function createNewCourse(e){
        e.preventDefault();

        let {isFormValid, alertMsg} = formValidation();
        
        if(!isFormValid) {
            window.alert(alertMsg);
        } else {
            try {
                let response = await axios.post("http://localhost:3000/admin/courses", {
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    price: price,
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
        // <main className="ele-center">
        //     <section className="createCourse-section">
        //         <header className="text-center">
        //             <h1>Create Course Panel</h1>
        //         </header>
        //         <div className="createCourseForm-wrapper">
        //             <form action="">
        //                 <div className="mb-normal">
        //                     <label htmlFor="title">Title</label>
        //                     <input type="text" id="title" onChange={e => setTitle(e.target.value)}/>
        //                 </div>
        //                 <div className="mb-normal">
        //                     <label htmlFor="description">Description</label>
        //                     <input type="text" id="description" onChange={e => setDescription(e.target.value)}/>
        //                 </div>
        //                 <div className="mb-normal">
        //                     <label htmlFor="image-url">Image Url</label>
        //                     <input type="url" id="image-url" onChange={e => setImageUrl(e.target.value)}/>
        //                 </div>
        //                 <div className="mb-large d-flex jc-between">
        //                     <div>
        //                         <label htmlFor="price">Price</label>
        //                         <br />
        //                         <input type="number" id="price" onChange={e => setPrice(e.target.value)}/>
        //                     </div>
        //                     <div>
        //                         <label htmlFor="published">Published</label>
        //                         <br />
        //                         <select name="" id="published" onChange={e => setPublished(e.target.value)}>
        //                             <option value="" selected disabled hidden>Please select</option>
        //                             <option value="true">True</option>
        //                             <option value="false">False</option>
        //                         </select>
        //                     </div>
        //                 </div>
        //                 <div>
        //                     <button type="submit" onClick={e => createNewCourse(e)}>Create Course</button>
        //                 </div>
        //             </form>
        //         </div>
        //     </section>
        // </main>

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
                            <input type="text" id="title"/>
                        </div>
                        <div className="mb-normal">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description"/>
                        </div>
                        <div className="mb-normal">
                            <label htmlFor="image-url">Image Url</label>
                            <input type="url" id="image-url"/>
                        </div>
                        <div className="mb-large d-flex jc-between">
                            <div>
                                <label htmlFor="price">Price</label>
                                <br />
                                <input type="number" id="price"/>
                            </div>
                            <div>
                                <label htmlFor="published">Published</label>
                                <br />
                                <select name="" id="published">
                                    <option value="" selected disabled hidden>Please select</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button type="submit">Create Course</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
        // <div>
        //     <h1>Create Course Page</h1>
        //     <input type={"text"} onChange={e => setTitle(e.target.value)} />
        //     <button onClick={() => console.log(title)}>Create Course</button>
        // </div>
    );
}

export default CreateCourse;