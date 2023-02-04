import React from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom';


function Sets() {
  const navigate = useNavigate();

  const newSetRedirect = () => {
    navigate('create-learning-set');
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Typography variant="h6">Sets</Typography>
        <Button variant="contained" color="primary" onClick={newSetRedirect}>Add new set</Button>
      </Box>
      <Box p={2}>
        <Paper elevation={1}>
          <Box display="flex" alignItems="center" p={2}>
          <Typography>Name</Typography>
            <Box m={1} />
            <Button variant="contained" color="primary">Flashcards</Button>
            <Box m={1} />
            <Button variant="contained" color="primary">Sentences</Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default Sets;