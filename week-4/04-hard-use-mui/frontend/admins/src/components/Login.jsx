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
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import "./styles.css";

function Login() {
    const navigate = useNavigate();

    const [ userEmail, setUserEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");

    const setUser = useSetRecoilState(userState);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await axios.post("http://localhost:3000/admin/login", {
                'HTTP_CONTENT_LANGUAGE': self.language
            }, {
                headers: {
                    username: userEmail,
                    password: password
                }
            });
            localStorage.setItem('admin-token', response.data.token);
            window.alert(response.data.message); 
            navigate('/courses');
            setUser({
                isLoading: false,
                userEmail: userEmail
            });
        } catch (err) {
            console.log(err);
            window.alert(err.response.data.message);
            localStorage.removeItem('admin-token');
            setUser({
                isLoading: false,
                userEmail: null
            });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className="login-container ele-center flex-column">
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
                        Login to Admin Dashboard
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