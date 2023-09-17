import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useParams, useNavigate } from 'react-router-dom';
import { userState } from '../store/atoms/user';
import { courseState } from '../store/atoms/course';
import { isCourseLoadingState, courseTitleState, courseDescriptionState, coursePriceState, courseImgState } from '../store/selectors/course';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function UpdateCourse() {
    let navigate = useNavigate();

    const { courseId } = useParams();

    const setCourse = useSetRecoilState(courseState);
    const isCourseLoading = useRecoilValue(isCourseLoadingState);
    const setUser = useSetRecoilState(userState);
    
    React.useEffect(() => {
        async function fetchCourse() {
            try {
                let response = await axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                    }
                });
                setCourse({
                    isLoading: false,
                    course: response.data.course
                });
            } catch (err) {
                console.log(err.response);
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
                setCourse({
                    isLoading: false,
                    course: null
                });
            }
        }
        fetchCourse();
    }, []);

    if(isCourseLoading) {
        return (
            <Box className="full-container ele-center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box className="full-container">
            <Header />
            <Box className="form-course-wrapper" sx={{
                display: "flex"
            }}>
                <UpdateForm />
                <CourseCard />
            </Box>
        </Box>
    )
}

function Header() {
    const courseTitle = useRecoilValue(courseTitleState);

    return (
        <Box sx={{width: "100vw", height: "40vh", backgroundColor: "#1fbfa3"}}>
            <Typography component="h1" variant="h3" sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2.5rem",
                color: "#ffffff"
            }}>
                { courseTitle }
            </Typography>
        </Box>
    )
};

function UpdateForm() {
    let navigate = useNavigate();

    const [courseDetails, setCourse] = useRecoilState(courseState);
    const setUser = useSetRecoilState(userState);

    const [title, setTitle] = React.useState(courseDetails.course.title);
    const [description, setDescription] = React.useState(courseDetails.course.description);
    const [imageUrl, setImageUrl] = React.useState(courseDetails.course.imageLink);
    const [price, setPrice] = React.useState(courseDetails.course.price);
    const [published, setPublished] = React.useState(courseDetails.course.published);

    React.useEffect(() => {
        setTitle(courseDetails.course.title);
        setDescription(courseDetails.course.description);
        setImageUrl(courseDetails.course.imageLink);
        setPrice(courseDetails.course.price);
        setPublished(courseDetails.course.published);
    }, [courseDetails.course]);

    
    async function handleSubmit(e){
        e.preventDefault();

        try {
            let updateCourseUrl = `http://localhost:3000/admin/courses/${courseDetails.course._id}`;
            await axios.put(updateCourseUrl, {
                title: title,
                description: description,
                imageLink: imageUrl,
                price: Number(price),
                published: published,
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin-token')
                }
            }); 
            let updatedCourse = {
                _id: courseDetails.course._id,
                title: title,
                description: description,
                imageLink: imageUrl,
                price: Number(price),
                published: published
            }
            setCourse({
                isLoading: false,
                course: updatedCourse
            });
        } catch (err) {
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
        <Paper className="full-container ele-center" elevation={24} sx={{
            height: "75%",
            width: "45%",
            flexDirection: "column",
            padding: "15px 30px",
            borderRadius: "10px",
            alignSelf: "flex-end"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <Typography component="h1" variant="h6" sx={{ mt: 3}}>
                    Create Course Panel
                </Typography>
            </Box>
            <Box component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
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
                            size="small"
                            value={title}
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
                            size="small"
                            value={description}
                            onChange={ (event) => {
                                setDescription(event.target.value)
                            } }
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
                            size="small"
                            value={imageUrl}
                            onChange={ (event) => setImageUrl(event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            type="number"
                            id="price"
                            name="price"
                            label="Price"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            size="small"
                            value={price}
                            onChange={ (event) => setPrice(event.target.value) }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ minWidth: 120, display: "flex" }} size="small">
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
                    sx={{ mt: 3, mb: 3 }}
                >
                    Update Course
                </Button>
            </Box>
        </Paper>
    )
}

function CourseCard() {

    return (
        <Card variant="outlined" sx={{
            boxShadow: "0 0 8px 0px rgba(0,0,0,.12)",
            borderRadius: "10px",
            maxHeight: "25rem", 
            width: "25rem"
        }}>
            <CourseCardImage />
            <CardContent>
                <CardContent>
                    <CourseCardTitle /> 
                    <CourseCardDescription />
                </CardContent>
                <CardContent>
                    <CourseCardPrice />
                </CardContent>
            </CardContent>
        </Card>
    )
}

function CourseCardImage() {
    const courseImg = useRecoilValue(courseImgState);

    return (
        <CardMedia
            sx={{ minHeight: 200 }}
            image={courseImg}
            title="green iguana"
        />
    )
}

function CourseCardTitle() {
    const courseTitle = useRecoilValue(courseTitleState);

    return (
        <Typography gutterBottom variant="h6" component="div">
            {courseTitle}
        </Typography>
    )
}

function CourseCardDescription() {
    const courseDesc = useRecoilValue(courseDescriptionState);
    
    return (
        <Typography variant="body2" color="text.secondary" sx={{ 
            height: 30 
        }}>
            {courseDesc}
        </Typography>
    )
}

function CourseCardPrice() {
    const coursePrice = useRecoilValue(coursePriceState);
    
    return (
        <Typography gutterBottom variant="h6" component="div" sx={{ 
            display: "flex",
            justifyContent: "center"
        }}>
            {coursePrice}
        </Typography>
    )
}


export default UpdateCourse;