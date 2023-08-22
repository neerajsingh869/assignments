import React from "react";
import "./styles.css";

function PurchaseCourse() {

    let isCoursePurchased = true;

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
                            Buy {props.courseInfo.price}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );

}

export default PurchaseCourse;