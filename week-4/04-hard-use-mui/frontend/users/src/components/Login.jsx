import React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import "./styles.css";

function Login() {
    const navigate = useNavigate();

    const [ userEmail, setUserEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");

    const setUser = useSetRecoilState(userState);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await axios.post("http://localhost:3000/users/login", {
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    username: userEmail,
                    password: password
                }
            });
            
            localStorage.setItem('token', JSON.stringify(response.data.token));
            window.alert(response.data.message);
            setUser({
                userEmail: userEmail
            });
            console.log("User state changed from login.jsx");
            navigate('/courses');
        } catch (error) {
            console.log(error.stack);
            if (error.response && error.response.status === 403) {
                window.alert(error.response.data.message);
            }
            setUser({
                userEmail: null
            });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className="login-outer-container">
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login to CourseBazzar
                    </Typography>
                </Box>
                <Box component="form" 
                     onSubmit={ handleSubmit } 
                     sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={ (event) => setUserEmail(event.target.value) }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={ (event) => setPassword(event.target.value) }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Register here"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );

}

export default Login;