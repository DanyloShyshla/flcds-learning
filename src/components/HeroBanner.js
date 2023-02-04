import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {useNavigate} from "react-router-dom";

function HeroBanner() {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Button clicked')
        navigate("/")
    }

    return (
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="primary.main" >
            <Box>
                <Typography variant="h2" color="secondary.contrastText">Welcome to My Website</Typography>
            </Box>
            <Box>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Learn More
                </Button>

            
            </Box>
        </Box>
    );
  }

  export default HeroBanner;