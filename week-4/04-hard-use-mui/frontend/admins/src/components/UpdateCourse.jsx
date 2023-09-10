import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { courseState } from '../store/atoms/course';
import { isCourseLoadingState, courseTitleState, courseDescriptionState, coursePriceState, courseImgState, courseDetailsState } from '../store/selectors/course';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function UpdateCourse() {
    let navigate = useNavigate();

    console.log("Update course component re-renders");

    const { courseId } = useParams();
    console.log(courseId);

    const setCourse = useSetRecoilState(courseState);
    const isCourseLoading = useRecoilValue(isCourseLoadingState);
    
    React.useEffect(() => {
        async function fetchCourse() {
            try {
                let response = await axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                });
                setCourse({
                    isLoading: false,
                    course: response.data.course
                });
            } catch (err) {
                console.log(err.response);
                if(err.response.status === 403){
                    window.alert("Your session ended. Please login again");
                    navigate('/login')
                }
                else{
                    window.alert("Something went wrongs. Please see the logs");
                    console.log(err.response);
                }
                setCourse({
                    isLoading: false,
                    course: null
                });
            }
        }
        fetchCourse();
    }, []);

    if(isCourseLoading) {
        return <Loading />
    }

    return (
        <main>
            <Header />
            <div className="d-flex form-course-wrapper">
                <UpdateForm />
                <CourseCard />
            </div>
        </main>
    )
}

function Header() {
    console.log("Update course Header component re-renders");
    const courseTitle = useRecoilValue(courseTitleState);

    return (
        <div style={{width: "100vw", height: "40vh", backgroundColor: "grey"}}>
            <h1 style={{display: "flex", justifyContent: "center", paddingTop: "2.5rem", color: "#2d0080"}}>
                { courseTitle }
            </h1>
        </div>
    )
};

function UpdateForm() {
    let navigate = useNavigate();

    console.log("Update course form component re-renders");
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = React.useState(courseDetails.course.title);
    const [description, setDescription] = React.useState(courseDetails.course.description);
    const [imageUrl, setImageUrl] = React.useState(courseDetails.course.imageLink);
    const [price, setPrice] = React.useState(courseDetails.course.price);
    const [published, setPublished] = React.useState(courseDetails.course.published);

    function formValidation() {
        let isFormValid = true;
        let alertMsg = null;
        console.log(title, description, imageUrl, price, published);

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

        if(published === "") {
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
    
    async function validateFormAndUpdateCourse(e){
        e.preventDefault();

        let {isFormValid, alertMsg} = formValidation();
        
        if(!isFormValid) {
            window.alert(alertMsg);
        } else {
            try {
                let updateCourseUrl = `http://localhost:3000/admin/courses/${courseDetails.course._id}`;
                await axios.put(updateCourseUrl, {
                    title: title,
                    description: description,
                    imageLink: imageUrl,
                    price: Number(price),
                    published: (published === "true"),
                    'HTTP_CONTENT_LANGUAGE': self.language
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                }); 
                let updatedCourse = {
                    _id: courseDetails.course._id,
                    title: title,
                    description: description,
                    imageLink: imageUrl,
                    price: Number(price),
                    published: published === "true"
                }
                setCourse({
                    isLoading: false,
                    course: updatedCourse
                });
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
        <section className="createCourse-section" style={{backgroundColor: "white", 
                                                          minHeight: "28rem", 
                                                          maxWidth: "32rem", 
                                                          alignSelf: "flex-end",
                                                          border: "0 solid white",
                                                          boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.1)"}}>
            <header className="text-center">
                <h1>Update Course Panel</h1>
            </header>
            <div className="createCourseForm-wrapper">
                <form action="">
                    <div className="mb-normal">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="mb-normal">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={e => setDescription(e.target.value)} value={description} />
                    </div>
                    <div className="mb-normal">
                        <label htmlFor="image-url">Image Url</label>
                        <input type="url" id="image-url" onChange={e => setImageUrl(e.target.value)} value={imageUrl} />
                    </div>
                    <div className="mb-large d-flex jc-between">
                        <div>
                            <label htmlFor="price">Price</label>
                            <br />
                            <input type="number" id="price" onChange={e => setPrice(e.target.value)} value={price} />
                        </div>
                        <div>
                            <label htmlFor="published">Published</label>
                            <br />
                            <select name="" id="published" onChange={e => setPublished(e.target.value)} value={published} >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button type="submit" onClick={e => validateFormAndUpdateCourse(e)}>Update Course</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

function CourseCard() {

    console.log("Update course Card component re-renders");

    return (
        <section className="course-card mb-large-normal" style={{backgroundColor: "white", height: "24rem", maxWidth: "25rem"}}>
            <div>
                <CourseCardImage />
            </div>
            <div style={{padding: "1rem 2rem"}}>
                <CourseCardTitle /> 
                <CourseCardDescription />
            </div>
            <CourseCardPrice />
        </section>
    )
}

function CourseCardImage() {

    console.log("Update course Card Image component re-renders");
    const courseImg = useRecoilValue(courseImgState);

    return (
        <div>
            <img src={courseImg} alt="" className="course-img"/>
        </div>
    )
}

function CourseCardTitle() {

    console.log("Update course Card Title component re-renders");
    const courseTitle = useRecoilValue(courseTitleState);

    return (
        <div className="mb-small fs-normal">
            {courseTitle}
        </div>
    )
}

function CourseCardDescription() {

    console.log("Update course Card Description component re-renders");
    const courseDesc = useRecoilValue(courseDescriptionState);
    
    return (
        <div>{courseDesc}</div>
    )
}

function CourseCardPrice() {

    console.log("Update course Card Price component re-renders");
    const coursePrice = useRecoilValue(coursePriceState);
    
    return (
        <div className="ele-center fs-large">Rs {coursePrice}</div>
    )
}


export default UpdateCourse;