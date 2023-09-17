import React from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { userState } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import "./styles.css"

function ShowCourses() {
    const navigate = useNavigate();

    const [courses, setCourses] = React.useState(null);
    const setUser = useSetRecoilState(userState);
    const [pubOrUnpubBtn, setPubOrUnpubBtn] = React.useState(false);
    
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    React.useEffect(() => {
        const getCourses = async () => {
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
                    setUser({
                        isLoading: false,
                        userEmail: null
                    });
                }
                else{
                    window.alert("Something went wrongs. Please see the logs");
                    console.log(err.response);
                }
            }
        };

        getCourses();
    }, [pubOrUnpubBtn]);

    async function publishOrUnpublishCourse(id, isPublished) {
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
            setPubOrUnpubBtn(!pubOrUnpubBtn);
        } catch (err) {
            console.log(err);
            if(err.response.status === 403){
                window.alert("Your session ended. Please login again");
                navigate('/login');
                setUser({
                    isLoading: false,
                    userEmail: null
                });
            }
            else{
                window.alert("Something went wrong. Please see the logs");
                console.log(err.response);
            }
        }
    }

    if (!courses) {
        return (
            <Box className="full-container ele-center">
                <CircularProgress />
            </Box>
        )
    }
    
    return (
        <Container component="main" maxWidth="xl" sx={{
            paddingBottom: "2rem"
        }}>
            <Box>
                <Typography variant="h4" align="center" sx={{
                    padding: "2rem 0rem 0.5rem"
                }}>
                    Courses
                </Typography>
                <Grid container spacing={{ xs: 4, sm: 3, md: 5, lg: 6 }} sx={{
                    padding: "2rem"
                }}>
                    {courses.map(course => {
                        return (
                            <CourseCard key={course._id} course={course} 
                                publishOrUnpublishCourseFn={publishOrUnpublishCourse} />
                        )
                    })}
                </Grid>
            </Box>
        </Container>
    );

}

function CourseCard({ course, publishOrUnpublishCourseFn }) {
    const navigate = useNavigate();
    
    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card variant="outlined" sx={{
                    boxShadow: "0 0 8px 0px rgba(0,0,0,.12)",
                    borderRadius: "10px"
                }}>
                    <CardMedia
                        sx={{ minHeight: 300 }}
                        image={course.imageLink}
                        title="green iguana"
                    />
                    <CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {course.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                                height: 40 
                            }}>
                                {course.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                            
                        }}>
                            <Button variant="outlined" 
                                    size="large" 
                                    sx={{ borderRadius: "8px", flexGrow: "1" }}
                                    onClick={ () => {
                                        navigate(`/update/${course._id}`);
                                    } }>
                                Update
                            </Button>
                            <Button variant="outlined" 
                                    size="large" 
                                    sx={{ borderRadius: "8px", flexGrow: "1" }}>
                                Delete
                            </Button>
                        </CardActions>
                        <CardActions>
                            {course.published === true ? 
                                <Button variant="contained" size="large" color="success"  
                                        sx={{
                                            width: "100%",
                                            borderRadius: "8px"
                                        }}
                                        onClick={() => publishOrUnpublishCourseFn(course._id, false)}>
                                    UnPublish
                                </Button> : 
                                <Button variant="contained" size="large" 
                                        sx={{
                                            width: "100%",
                                            borderRadius: "8px"
                                        }}
                                        onClick={() => publishOrUnpublishCourseFn(course._id, true)}>
                                    Publish
                                </Button>
                            }
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default ShowCourses;