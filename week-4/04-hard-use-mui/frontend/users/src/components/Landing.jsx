import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./styles.css";

function Landing() {
    console.log("Landing page re-renders");

    return (
        <Box component="main" className="outer-container">
            <Typography variant="h4">
                Welcome to CourseBazzar!
            </Typography>
        </Box>
    );

}

export default Landing;