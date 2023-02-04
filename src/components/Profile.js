import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import Sets from '../components/Sets';



const theme = createTheme();

export default function Profile() {

  return (
    <Box>
      <Typography>Profile page</Typography>
      <Sets />
    </Box>
  );
}