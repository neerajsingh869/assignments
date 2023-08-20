import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css"

function ShowCourses(props) {
    const navigate = useNavigate();

    const [courses, setCourses] = React.useState([]);
    const [pubOrUnpubBtn, setPubOrUnpubBtn] = React.useState(false);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    React.useEffect(() => {
        async function fetchCourses() {
            try {
                let response = await axios.get("http://localhost:3000/admin/courses", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                }); 
                setCourses(response.data.courses);
            } catch (err) {
                console.log(err);
                if(err.response.status === 403){
                    window.alert("Your session ended. Please login again");
                    props.handleIsAdminLoggedIn(false);
                    navigate('/login')
                }
                else{
                    window.alert("Something went wrongs. Please see the logs");
                    console.log(err.response);
                }
            }
        }
        fetchCourses();
    }, [pubOrUnpubBtn]);

    async function publishOrUnpublishCourse(id, isPublished) {
        let requestUrl = `http://localhost:3000/admin/courses/${id}`;
        let course = courses.find(c => c.id === id);
        try {
            let response = await axios.put(requestUrl, {
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                published: isPublished,
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }); 
            if(isPublished === true) {
                window.alert("Course published successfully.");
            } else {
                window.alert("Course unpublished successfully.");
            }
            console.log(response.data.message);
            setPubOrUnpubBtn(!pubOrUnpubBtn);
        } catch (err) {
            console.log(err);
            if(err.response.status === 403){
                window.alert("Your session ended. Please login again");
                props.handleIsAdminLoggedIn(false);
                navigate('/login')
            }
            else{
                window.alert("Something went wrong. Please see the logs");
                console.log(err.response);
            }
        }
    }
    
    return (
        <main style={{height:"auto", padding:"5rem 0rem 2rem 0rem"}}>
            <div className="courses-wrapper d-flex flex-wrap">
                {courses.map(course => {
                    return (
                        <Course key={course.id} courseInfo={course}
                            publishOrUnpublishCourseFn={publishOrUnpublishCourse}/>
                    );
                })}
            </div>
        </main>
    );

}

function Course(props) {
    
    return (
        <section className="course-card mb-large-normal">
            <div>
                <img src={props.courseInfo.imageUrl} alt="" className="course-img"/>
            </div>
            <div style={{padding:"1.5rem 2rem"}}>
                <div className="mb-large">
                    <div className="mb-small fs-normal">{props.courseInfo.title}</div>
                    <div>{props.courseInfo.description}</div>
                </div>
                <div className="d-flex jc-between">
                    <button className="course-action-btn fs-normal">
                        <Link to={`/update/${props.courseInfo.id}`} state={{courseInfo: props.courseInfo}}>Update</Link>
                    </button>
                    <button className="course-action-btn fs-normal">
                        Delete
                    </button>
                    {props.courseInfo.published === true ? 
                        <button className="course-action-btn fs-normal unpublish-btn"
                                onClick={() => props.publishOrUnpublishCourseFn(props.courseInfo.id, false)}>
                                UnPublish
                        </button> : 
                        <button className="course-action-btn fs-normal publish-btn" 
                                onClick={() => props.publishOrUnpublishCourseFn(props.courseInfo.id, true)}>
                                Publish
                        </button>
                    }
                </div>
            </div>
        </section>
    );
}

export default ShowCourses;