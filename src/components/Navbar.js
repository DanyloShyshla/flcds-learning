import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

function Navbar() {
  return (
        <Stack
          // position="fixed"
          p={2}
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          spacing={2}>
            <Typography variant="h6">My App</Typography>
            <Box>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact</Button>
            </Box>
            <Box>
            <Button color="inherit">Sign In</Button>
            <Button color="inherit">Sign Up</Button>
            </Box>
            <IconButton aria-label="account"><AccountCircleIcon /></IconButton>
        </Stack>
  );
}

export default Navbar;