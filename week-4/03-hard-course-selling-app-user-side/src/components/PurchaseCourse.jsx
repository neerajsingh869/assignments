import React from "react"
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./styles.css";

function PurchaseCourse({ handleIsUserLoggedInState }) {

    let location = useLocation();

    let [isCoursePurchased, setIsCoursePurchased] = React.useState(false);

    let courseInfo = location.state.courseInfo;

    React.useEffect(() => {
        async function isCourseAlreadyPurchases() {
            try {
                let response = await axios.get("http://localhost:3000/users/purchasedCourses", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('user-token')
                    }
                }); 
                let purchasedCourses = response.data.purchasedCourses;
                let isCoursePurchased = purchasedCourses.find(course => course.id === courseInfo.id);
                console.log(isCoursePurchased);
                setIsCoursePurchased(isCoursePurchased);
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
        };

        isCourseAlreadyPurchases();
    }, []);

    async function purchaseCourse() {
        try {
            let response = await axios.post(`http://localhost:3000/users/courses/${courseInfo.id}`, {
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('user-token')
                }
            }); 
            setIsCoursePurchased(true);
            console.log(response.data);
            window.alert(response.data.message);
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

    return (
        <main className="ele-center">
            <section className="course-card mb-large-normal">
                <div>
                    <img src={courseInfo.imageUrl} alt="" className="course-img"/>
                </div>
                <div style={{padding:"1.5rem 2rem"}}>
                    <div className="mb-large">
                        <div className="mb-small fs-normal">{courseInfo.title}</div>
                        <div>{courseInfo.description}</div>
                    </div>
                    <div className="d-flex flex-col jc-between">
                        {isCoursePurchased ? (
                            <>
                                <button className="after-purchase-btn fs-normal mb-normal">
                                    View Course
                                </button>
                                <button className="after-purchase-btn fs-normal">
                                    View Invoice
                                </button>
                            </>
                        ) : (
                            <button className="before-purchase-btn fs-normal" onClick={purchaseCourse}>
                                Buy {courseInfo.price}
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );

}

export default PurchaseCourse;