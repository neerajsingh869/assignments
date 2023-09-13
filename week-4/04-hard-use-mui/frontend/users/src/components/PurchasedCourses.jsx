import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "./styles.css";

function PurchasedCourses() {

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
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />

                </Grid>
            </Box>
        </Container>
    );

}

function CourseCard() {
    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card variant="outlined" sx={{
                    boxShadow: "0 0 8px 0px rgba(0,0,0,.12)",
                    borderRadius: "10px"
                }}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Course Title
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
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