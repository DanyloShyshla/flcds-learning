import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  return (
    <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Typography variant="h6">iLearn</Typography>
      <Box>
        <Button
          onClick={() => {
            navigate("/");
          }}
          color="inherit"
        >
          Home
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          color="inherit"
        >
          About
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          color="inherit"
        >
          Contact
        </Button>
      </Box>
      {!localStorage.getItem("token") ? (
        <Box>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            color="inherit"
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            color="inherit"
          >
            Sign Up
          </Button>
        </Box>
      ) : (
        <IconButton
          onClick={() => {
            navigate("/profile");
          }}
          aria-label="account"
        >
          <AccountCircleIcon />
        </IconButton>
      )}
    </Stack>
  );
}

export default Navbar;
