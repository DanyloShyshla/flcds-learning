import { createTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/v1/";

const theme = createTheme();

export default function SetInfo() {
  const location = useLocation();
  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios
      .get(API_URL + "cards" + `?set_id=${location.state.set_id}` + "?page=1&per_page=100", config)
      .then((response) => {
        console.log(response.data.items);
      });
  };
  return <div>{location.state.set_id}</div>;
}
