import React from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

function ShowCourses({ handleIsUserLoggedInState }) {

    let navigate = useNavigate();

    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    React.useEffect(() => {
        async function fetchCourses() {
            try {
                let response = await axios.get("http://localhost:3000/users/courses", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('user-token')
                    }
                }); 
                setCourses(response.data.courses);
            } catch (err) {
                console.log(err);
                if(err.response.status === 403){
                    window.alert("Your session ended. Please login again");
                    localStorage.removeItem('user-token');
                    handleIsUserLoggedInState(false);
                    navigate('/login')
                }
                else{
                    window.alert("Something went wrong. Please see the logs");
                    console.log(err.response);
                }
            }
        }
        fetchCourses();
    }, []);

    return (
        <main style={{height:"auto", padding:"5rem 0rem 2rem 0rem"}}>
            <div className="courses-wrapper d-flex flex-wrap">
                {courses.map(course => {
                    return (
                        <Course key={course.id} courseInfo={course}/>
                    );
                })}
            </div>
        </main>
    );

}

function Course({ courseInfo }) {
    
    return (
        <section className="course-card mb-large-normal">
            <Link to={`/courses/${courseInfo.id}`} state={{courseInfo: courseInfo}}>
                <div>
                    <img src={courseInfo.imageUrl} alt="" className="course-img"/>
                </div>
                <div style={{padding:"1.5rem 2rem"}}>
                    <div className="mb-large">
                        <div className="mb-small fs-normal">{courseInfo.title}</div>
                        <div>{courseInfo.description}</div>
                    </div>
                    <div className="d-flex jc-between">
                        <button className="course-action-btn fs-normal">
                            {courseInfo.price}
                        </button>
                    </div>
                </div>   
            </Link>
        </section>
    );
}

export default ShowCourses;