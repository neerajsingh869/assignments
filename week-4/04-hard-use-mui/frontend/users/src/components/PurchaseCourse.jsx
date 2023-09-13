import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import "./styles.css";

function PurchaseCourse() {

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
                            image="https://img-b.udemycdn.com/course/240x135/4920048_b156.jpg"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} sx={{ display: "flex" }}>
                        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course Title
                                </Typography>
                                <Typography variant="body1">
                                    Lizards are a widespread group of squamate Lizards are a widespread group of squamate 
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
                                <Button variant="contained" size="large" sx={{
                                    width: "100%",
                                    borderRadius: "8px"
                                }}>
                                    Buy Now
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Grid>
                </Grid>
                
                
            </Card>
        </Container>
    );

}

export default PurchaseCourse;