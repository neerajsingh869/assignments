import React from "react";
import "./styles.css";

function PurchaseCourse({ courseInfo }) {

    let isCoursePurchased = true;

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
                    {isCoursePurchased ? (
                        <>
                            <button className="course-action-btn fs-normal">
                                View Course
                            </button>
                            <button className="course-action-btn fs-normal">
                                View Invoice
                            </button>
                        </>
                    ) : (
                        <button className="course-action-btn fs-normal">
                            Buy {courseInfo.price}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );

}

export default PurchaseCourse;