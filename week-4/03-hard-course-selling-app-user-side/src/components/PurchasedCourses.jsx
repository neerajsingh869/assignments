import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function PurchasedCourses() {

    const [purchasedCourses, setPurchasedCourses] = React.useState([]);

    return (
        <main style={{height:"auto", padding:"5rem 0rem 2rem 0rem"}}>
            <div className="courses-wrapper d-flex flex-wrap">
                {purchasedCourses.map(course => {
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
                        View Course
                    </button>
                    <button className="course-action-btn fs-normal">
                        View Invoice
                    </button>
                </div>
            </div>
        </section>
    );
}

export default PurchasedCourses;