import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Button clicked");
    navigate("/login");
  };

  return (
    <Box height="90vh" display="flex" alignItems="center" justifyContent="center" bgcolor="primary.main">
      <Box>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} px={10}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h2" color="secondary.contrastText">
              Learn in a context
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="secondary.contrastText">
              Learn foreign language interactively with cards and tests using the power of the context sentences.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box></Box>
    </Box>
  );
}

export default HeroBanner;
