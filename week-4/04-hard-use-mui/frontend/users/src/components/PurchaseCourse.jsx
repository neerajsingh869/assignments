import React from "react";
import axios from 'axios';;
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import "./styles.css";

function PurchaseCourse() {
    let { courseId } = useParams();

    let [ course, setCourse ] = React.useState(null);
    let [ isPurchased, setIsPurchased ] = React.useState(false);

    React.useEffect(() => {
        const getCourse = async () => {
            try {
                // in get requests, headers are passed as 2nd argument
                let response = await axios.get(`http://localhost:3000/users/courses/${courseId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                if (response.data.course) {
                    setCourse(response.data.course);
                }
            } catch (error) {
                console.log(error.stack);
                if (error.response && error.response.status === 403) {
                    window.alert("Session has ended. Please login again");
                    window.location = '/login';
                }
            }
        }

        const getPurchasedCourses = async () => {
            try {
                let response = await axios.get('http://localhost:3000/users/purchasedCourses', {
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                if (response.data.purchasedCourses) {
                    console.log("response data" + response.data);
                    let purchasedCourses = response.data.purchasedCourses;
                    console.log("Purchased courses: " + purchasedCourses);
                    let purchasedCourse = purchasedCourses.find(course => {
                        console.log(course);
                        console.log(course._id);
                        console.log(courseId);
                        return course._id === courseId;
                    });
                    console.log("Purhcased course: " + purchasedCourse);
                    if (purchasedCourse) {
                        setIsPurchased(true);
                    }
                }
            } catch (error) {
                console.log(error.stack);
                if (error.response.status === 403) {
                    window.alert("Session has ended. Please login again");
                    window.location = '/login';
                }
            }
        };

        getCourse();
        getPurchasedCourses();
    }, []);

    const purchaseCourse = async (event) => {
        event.preventDefault();

        try {
            console.log(localStorage.getItem('token'));
            // in post requests, headers are passed as 3rd argument
            let response = await axios.post(`http://localhost:3000/users/courses/${courseId}`, null, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });
            console.log(response.data);
            if (response.data.message) {
                setIsPurchased(true);
                window.alert(response.data.message);
            }
        } catch (error) {
            console.log(error.stack);
            if (error.response.status === 403) {
                window.alert("Session has ended. Please login again");
                window.location = '/login';
            } else if (error.response.status === 404) {
                window.alert(error.response.data.message);
                window.location = '/courses';
            }
        }
    }

    console.log("Is course purchased? " + isPurchased);

    if (!course) {
        return (
            <Box className="outer-container">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container component="main" maxWidth="lg" sx={{
            padding: "2rem 1rem",
            display: "flex"
        }} className="outer-container">
            <Card variant="outlined" sx={{ 
                width: "95%",
                boxShadow: "0 0 8px 0px rgba(0,0,0,.12)",
                borderRadius: "10px"
            }}>
                <Grid container >
                    <Grid item xs={12} sm={6} md={7} sx={{ display: "flex", justifyContent: "center"}}>
                        <CardMedia 
                            component="img"
                            image={course.imageLink}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} sx={{ display: "flex" }}>
                        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.title}
                                </Typography>
                                <Typography variant="body1">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography gutterBottom variant="body1" component="div">
                                    20+ Hours of Content
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div">
                                    Certificate of Completion
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div">
                                    Live Q&A Sessions
                                </Typography>
                                <Typography variant="body1" component="div">
                                    14-day Return Policy
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {!isPurchased ? (
                                    <>
                                        <Button variant="contained" 
                                                size="large" 
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "8px"
                                                }}
                                                onClick={ purchaseCourse }>
                                            Buy Now
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="contained" 
                                                size="large" 
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "8px"
                                                }}>
                                            Bought
                                        </Button>
                                    </>
                                )}
                            </CardActions>
                        </CardContent>
                    </Grid>
                </Grid>
                
                
            </Card>
        </Container>
    );

}

export default PurchaseCourse;