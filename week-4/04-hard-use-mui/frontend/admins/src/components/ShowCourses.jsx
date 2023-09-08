import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css"

function ShowCourses() {
    const navigate = useNavigate();

    const [courses, setCourses] = React.useState([]);
    const [pubOrUnpubBtn, setPubOrUnpubBtn] = React.useState(false);
    console.log("hello");
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
                    navigate('/login');
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
        console.log(id);
        console.log(typeof id);
        let requestUrl = `http://localhost:3000/admin/courses/${id}`;
        let course = courses.find(c => c._id === id);
        try {
            let response = await axios.put(requestUrl, {
                title: course.title,
                description: course.description,
                imageLink: course.imageLink,
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
                        <Course key={course._id} courseInfo={course}
                            publishOrUnpublishCourseFn={publishOrUnpublishCourse}/>
                    );
                })}
            </div>
        </main>
    );

}

function Course({ courseInfo, publishOrUnpublishCourseFn }) {
    
    return (
        <section className="course-card mb-large-normal">
            <div>
                <img src={courseInfo.imageLink} alt="" className="course-img"/>
            </div>
            <div style={{padding:"1.5rem 2rem"}}>
                <div className="mb-large">
                    <div className="mb-small fs-normal">{courseInfo.title}</div>
                    <div>{courseInfo.description}</div>
                </div>
                <div className="d-flex jc-between">
                    <button className="course-action-btn fs-normal">
                        <Link to={`/update/${courseInfo._id}`} state={{courseInfo: courseInfo}}>Update</Link>
                    </button>
                    <button className="course-action-btn fs-normal">
                        Delete
                    </button>
                    {courseInfo.published === true ? 
                        <button className="course-action-btn fs-normal unpublish-btn"
                                onClick={() => publishOrUnpublishCourseFn(courseInfo._id, false)}>
                                UnPublish
                        </button> : 
                        <button className="course-action-btn fs-normal publish-btn" 
                                onClick={() => publishOrUnpublishCourseFn(courseInfo._id, true)}>
                                Publish
                        </button>
                    }
                </div>
            </div>
        </section>
    );
}

export default ShowCourses;