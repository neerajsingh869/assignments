import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    let userEmail = true;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
                            CourseBazzar
                        </Link>
                    </Typography>
                    {!userEmail ? (
                        <> 
                            <Button color="inherit" 
                                    sx={{ fontWeight: "bold" }}
                                    onClick={ () => {
                                        navigate('/login');
                                    } }>
                                Login
                            </Button>
                            <Button color="inherit" 
                                    sx={{ fontWeight: "bold" }}
                                    onClick={ () => {
                                        navigate('/register');
                                    } }>
                                Register
                            </Button>   
                        </>
                    ) : (
                        <> 
                            <Button color="inherit" 
                                    sx={{ fontWeight: "bold" }}
                                    onClick={ () => {
                                        navigate('/courses');
                                    } }>
                                Courses
                            </Button>
                            <Button color="inherit" 
                                    sx={{ fontWeight: "bold" }}
                                    onClick={ () => {
                                        navigate('/courses/purchases');
                                    } }>
                                Purchases
                            </Button>   
                            <Button color="inherit" 
                                    sx={{ fontWeight: "bold" }}
                                    onClick={ () => {
                                        navigate('/');
                                    } }>
                                Logout
                            </Button> 
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;