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
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";

function ShowCourses() {
    const navigate = useNavigate();

    const [ courses, setCourses ] = React.useState(null);

    React.useEffect(() => {
        const getCourses = async () => {
            try {
                let response = await axios.get('http://localhost:3000/users/courses', {
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                console.log(response.data);
                if (response.data.courses) {
                    setCourses(response.data.courses);
                }
            } catch (error) {
                console.log(error.stack);
                if (error.response.status === 403) {
                    window.alert("Session has ended. Please login again");
                    navigate('/login');
                }
            }
        };

        getCourses();
    }, []);

    if (!courses) {
        return (
            <Box className="outer-container">
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
                            <CourseCard key={course._id} course={course}/>
                        )
                    })}
                </Grid>
            </Box>
        </Container>
    );

}

function CourseCard({ course }) {
    const navigate = useNavigate();

    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card variant="outlined" sx={{
                    boxShadow: "0 0 8px 0px rgba(0,0,0,.12)",
                    borderRadius: "10px"
                }}>
                    <CardMedia
                        sx={{ height: 200 }}
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
                        <CardContent sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Typography variant="body1">
                                Rs {course.price}
                            </Typography>
                            <CardActions>
                                <Button variant="outlined" 
                                        size="large" 
                                        sx={{ borderRadius: "8px" }}
                                        onClick={ () => {
                                            navigate(`/courses/${course._id}`);
                                        } }>
                                    Buy Now
                                </Button>
                            </CardActions>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="large" sx={{
                                width: "100%",
                                borderRadius: "8px"
                            }}>
                                Course Preview
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default ShowCourses;