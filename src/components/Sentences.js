import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import * as React from "react";
import { useLocation } from "react-router-dom";
const theme = createTheme();

export default function Sentences() {
  const location = useLocation();

  return <Box>{location.state.set_id}</Box>;
}
