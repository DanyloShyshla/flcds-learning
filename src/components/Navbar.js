import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Typography variant="h6">iLearn</Typography>
      {!localStorage.getItem("token") ? (
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
      ) : (
        <Box>
          <Button
            onClick={() => {
              navigate("/profile");
            }}
            color="inherit"
          >
            My sets library
          </Button>
        </Box>
      )}
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
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </Stack>
  );
}

export default Navbar;
