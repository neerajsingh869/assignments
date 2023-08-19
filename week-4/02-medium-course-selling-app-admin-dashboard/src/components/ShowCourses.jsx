import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css"

function ShowCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = React.useState([]);
    const [pubOrUnpubBtn, setPubOrUnpubBtn] = React.useState(false);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    // React.useEffect(() => {
    //     console.log("hello - I should fire only once");
    //     async function fetchCourses() {
    //         try {
    //             let response = await axios.get("http://localhost:3000/admin/courses", {
    //                 headers: {
    //                     Authorization: 'Bearer ' + localStorage.getItem('admin-token')
    //                 }
    //             }); 
    //             setCourses(response.data.courses);
    //             console.log("courses state: " + courses);
    //             console.log(response.data.courses);
    //         } catch (err) {
    //             console.log(err);
    //             if(err.response.status === 403){
    //                 window.alert("Your session ended. Please login again");
    //                 navigate('/login')
    //             }
    //             else{
    //                 window.alert("Something went wrongs. Please see the logs");
    //                 console.log(err.response);
    //             }
    //         }
    //     }
    //     fetchCourses();
    // }, [pubOrUnpubBtn]);

    async function publishCourse(id) {
        let requestUrl = `http://localhost:3000/admin/courses/${id}`;
        let course = courses.find(c => c.id === id);
        console.log(course);
        console.log(course.published);
        console.log(typeof(course.published));
        console.log(requestUrl);
        try {
            let response = await axios.put(requestUrl, {
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                published: true,
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }); 
            window.alert("Course published successfully.");
            console.log(response.data.message);
            setPubOrUnpubBtn(!pubOrUnpubBtn);
        } catch (err) {
            console.log(err);
            if(err.response.status === 403){
                window.alert("Your session ended. Please login again");
                navigate('/login')
            }
            else{
                window.alert("Something went wrong. Please see the logs");
                console.log(err.response);
            }
        }
    }

    async function unpublishCourse(id) {
        let requestUrl = `http://localhost:3000/admin/courses/${id}`;
        let course = courses.find(c => c.id === id);
        try {
            let response = await axios.put(requestUrl, {
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                published: false,
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }); 
            window.alert("Course unpublished successfully.");
            console.log(response.data.message);
            setPubOrUnpubBtn(!pubOrUnpubBtn);
        } catch (err) {
            console.log(err);
            if(err.response.status === 403){
                window.alert("Your session ended. Please login again");
                navigate('/login')
            }
            else{
                window.alert("Something went wrongs. Please see the logs");
                console.log(err.response);
            }
        }
    }
    
    return (
        // <main style={{height:"auto", padding:"5rem 0rem 2rem 0rem"}}>
        //     <div className="courses-wrapper d-flex flex-wrap">
        //         {courses.map(course => {
        //             return (
        //                 <Course id={course.id}
        //                         title={course.title} 
        //                         description={course.description} 
        //                         imageUrl={course.imageUrl} 
        //                         price={course.price} 
        //                         published={course.published}
        //                         publishCourseFn={publishCourse}
        //                         unpublishCourseFn={unpublishCourse}/>
        //             );
        //         })}
        //     </div>
        // </main>

        // static page
        <main style={{height:"auto", padding:"5rem 0rem 2rem 0rem"}}>
            <div className="courses-wrapper d-flex flex-wrap">
                {courses.map(course => {
                    return (
                        <Course id={course.id}
                                title={course.title} 
                                description={course.description} 
                                imageUrl={course.imageUrl} 
                                price={course.price} 
                                published={course.published}/>
                    );
                })}
            </div>
        </main>
        // <div>
        //     <h1>Create Course Page</h1>
        //     {courses.map(c => <Course title={c.title} />)}
        // </div>
    );
}

function Course(props) {
    console.log(props.id);

    let publishOrUnpublishBtn = null;
    if(props.published === true){
        publishOrUnpublishBtn = <button className="course-action-btn fs-normal unpublish-btn"
                                        onClick={() => props.unpublishCourseFn(props.id)}>
                                        UnPublish
                                </button>;
    } else {
        publishOrUnpublishBtn = <button className="course-action-btn fs-normal publish-btn" 
                                        onClick={() => props.publishCourseFn(props.id)}>
                                        Publish
                                </button>;
    }
    
    return (
        // <section className="course-card mb-large-normal">
        //     <div>
        //         <img src={props.imageUrl} alt="" className="course-img"/>
        //     </div>
        //     <div style={{padding:"1.5rem 2rem"}}>
        //         <div className="mb-large">
        //             <div className="mb-small fs-normal">{props.title}</div>
        //             <div>{props.description}</div>
        //         </div>
        //         <div className="d-flex jc-between">
        //             <button className="course-action-btn fs-normal">
        //                 <Link to={`/update/${props.id}`} state={{id: props.id}}>Update</Link>
        //             </button>
        //             <button className="course-action-btn fs-normal">
        //                 Delete
        //             </button>
        //             {publishOrUnpublishBtn}
        //         </div>
        //     </div>
        // </section>

        /// static page
        <section className="course-card mb-large-normal">
            <div>
                <img src={props.imageUrl} alt="" className="course-img"/>
            </div>
            <div style={{padding:"1.5rem 2rem"}}>
                <div className="mb-large">
                    <div className="mb-small fs-normal">{props.title}</div>
                    <div>{props.description}</div>
                </div>
                <div className="d-flex jc-between">
                    <button className="course-action-btn fs-normal">
                        Update
                    </button>
                    <button className="course-action-btn fs-normal">
                        Delete
                    </button>
                    <button className="course-action-btn fs-normal unpublish-btn">
                            UnPublish
                    </button>
                </div>
            </div>
        </section>
        // <div>
        //     <h1>{props.title}</h1>
        // </div>
    );
}

export default ShowCourses;