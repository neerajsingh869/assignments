import React from "react";
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
import "./styles.css";

function Register() {
    let navigate = useNavigate();

    const [ userEmail, setUserEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response = await axios.post("http://localhost:3000/admin/signup", {
                username: userEmail, 
                password: password
            });
            window.alert(response.data.message);
            navigate('/login');
        } catch (err) {
            window.alert(err.response.data.message);
            console.log(err.response.data);
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
                        Create an Admin Account
                    </Typography>
                </Box>
                <Box component="form" onSubmit={ handleSubmit } sx={{ mt: 1 }}>
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
                        Register
                    </Button>
                    <Grid container>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Link to="/login" variant="body2">
                                {"Already have an account? Login here"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );

}

export default Register;