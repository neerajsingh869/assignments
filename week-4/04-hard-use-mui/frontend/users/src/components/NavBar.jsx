import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { userEmailState } from '../store/selectors/user';

function NavBar() {
    const navigate = useNavigate();

    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

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
                                        localStorage.removeItem('token');
                                        setUser({
                                            userEmail: null
                                        });
                                        console.log("User state changed from navbar.jsx");
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