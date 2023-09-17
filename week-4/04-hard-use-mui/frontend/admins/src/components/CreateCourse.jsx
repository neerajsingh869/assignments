import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userState } from '../store/atoms/user';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import "./styles.css"

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    let navigate = useNavigate();

    const setUser = useSetRecoilState(userState);

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [published, setPublished] = React.useState(false);
    
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let response = await axios.post("http://localhost:3000/admin/courses", {
                title: title,
                description: description,
                imageLink: imageUrl,
                price: Number(price),
                published: published
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }); 
            window.alert(response.data.message);
            navigate('/courses');
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

    return (
        <>  
            <Container component="main" maxWidth="md" className="full-container ele-center">
                <Paper elevation={24} sx={{
                    height: "60%",
                    width: "65%",
                    flexDirection: "column",
                    padding: "30px",
                    borderRadius: "10px"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}>
                        <Typography component="h1" variant="h5">
                            Create Course Panel
                        </Typography>
                    </Box>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="title"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    onChange={ (event) => setTitle(event.target.value) }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="description"
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    onChange={ (event) => setDescription(event.target.value) }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="imageUrl"
                                    name="imageUrl"
                                    label="Image Url"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    onChange={ (event) => setImageUrl(event.target.value) }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="price"
                                    name="price"
                                    label="Price"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    onChange={ (event) => setPrice(event.target.value) }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, display: "flex" }}>
                                    <InputLabel id="published">Published</InputLabel>
                                    <Select
                                        labelId="publispublishedhedLabel"
                                        id="published"
                                        value={published}
                                        onChange={(event) => setPublished(event.target.value)}
                                        label="Published">
                                        <MenuItem value={true}>True</MenuItem>
                                        <MenuItem value={false}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            Create Course
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );

}

export default CreateCourse;