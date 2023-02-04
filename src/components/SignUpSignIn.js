import React, { useRef, Component } from 'react';
import { Box, Stack, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';

function SignUpSignIn() {
  const [value, setValue] = React.useState('signUp');
  const usernameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')

  const handleChange = (event) => {
    setValue(event.target.value);
    
  };

  function handleSignUp() {
    console.log(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
    if (!emailRef.current.value || !passwordRef.current.value || !usernameRef.current.value) {
      
    } else {
      const formData = new FormData();
      formData.append('email', emailRef.current.value);
      formData.append('username', usernameRef.current.value);
      formData.append('password', passwordRef.current.value);
      
      axios.post('http://127.0.0.1:5000/api/v1/auth/register', formData)
        .then(response => {
          console.log(response.data);
          localStorage.setItem('token', response.data.access_token);
        })
        .catch(error => {
          console.error(error);
        });
    }
    
  } 

  return (
    <Stack display="flex" alignItems="center" justifyContent="center" height="100vh">
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Option</FormLabel>
          <RadioGroup row aria-label="select-option" name="select-option" value={value} onChange={handleChange}>
            <FormControlLabel value="signUp" control={<Radio />} label="Sign Up" />
            <FormControlLabel value="signIn" control={<Radio />} label="Sign In" />
          </RadioGroup>
        </FormControl>
            <TextField 
                inputRef={emailRef} 
                label="Email" 
                variant="outlined" />
            <TextField 
                inputRef={passwordRef}  
                label="Password" 
                type="password" 
                variant="outlined" />
        {value === 'signUp' ? (
            <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={2}>

                <TextField inputRef={usernameRef} label="Username" variant="outlined" />
                <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
            </Stack>

        ) : (
            <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={2}>

                
                <Button variant="contained" color="primary">Sign In</Button>
            </Stack>
        )}
      </Stack>
  );
}

export default SignUpSignIn;