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
import { useNavigate } from 'react-router-dom';
import "./styles.css";

function PurchasedCourses() {
    const navigate = useNavigate();

    const [ purchasedCourses, setPurchasedCourses ] = React.useState(null);

    React.useEffect(() => {
        const getPurchasedCourses = async () => {
            try {
                let response = await axios.get('http://localhost:3000/users/purchasedCourses', {
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                console.log("response: " + response.data);
                if (response.data.purchasedCourses) {
                    console.log("Purchased courses: " + response.data.purchasedCourses);
                    setPurchasedCourses(response.data.purchasedCourses);
                }
            } catch (error) {
                console.log(error.stack);
                if (error.response.status === 403) {
                    window.alert("Session has ended. Please login again");
                    navigate('/login');
                }
            }
        };

        getPurchasedCourses();
    }, []);

    if (!purchasedCourses) {
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
                    Purchased Courses
                </Typography>
                <Grid container spacing={{ xs: 4, sm: 3, md: 5, lg: 6 }} sx={{
                    padding: "2rem"
                }}>
                    {purchasedCourses.map(course => {
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
                        <CardActions>
                            <Button variant="contained" size="large" sx={{
                                width: "100%",
                                borderRadius: "8px"
                            }}>
                                Start Learning
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default PurchasedCourses;