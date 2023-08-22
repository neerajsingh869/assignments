import React from "react";
import "./styles.css";

function ShowCourses() {

    const [courses, setCourses] = React.useState([]);

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

function Course(props) {
    
    return (
        <section className="course-card mb-large-normal">
            <Link to={`/courses/${props.courseInfo.id}`} state={{courseInfo: props.courseInfo}}>
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
                            {props.courseInfo.price}
                        </button>
                    </div>
                </div>   
            </Link>
        </section>
    );
}

export default ShowCourses;