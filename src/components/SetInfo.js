import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/v1/";

const theme = createTheme();

export default function SetInfo() {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const cardRefId = useRef("");
  useEffect(() => {
    fetchSets();
  }, []);

  const handleCardDelete = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id.value + " deleted");
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.delete(API_URL + "cards/" + e.currentTarget.id.value, config).then((response) => {
      console.log(response);
      fetchSets();
    });
  };

  const fetchSets = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios
      .get(API_URL + "cards?" + `set_id=${location.state.set_id}` + "&page=1&per_page=100", config)
      .then((response) => {
        setCards(
          response.data.items.map((item, index) => (
            <Card
              ref={cardRefId}
              key={index}
              component="form"
              onSubmit={handleCardDelete}
              noValidate
              variant="outlined"
              p={2}
              style={{ marginTop: "1em" }}
            >
              {/* <form ref={cardRefId} onSubmit={handleCardDelete}> */}
              <Grid container spacing={2} p={2}>
                <Grid item xs={1}>
                  <TextField fullWidth name="id" value={item.id} variant="standard" disabled />
                </Grid>
                <Grid item xs={11}>
                  <Button type="submit" variant="contained" color="secondary">
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth name="word" id="" label="Word" value={item.word} variant="standard" />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    name="definition"
                    id=""
                    label="Definition"
                    value={item.definition}
                    variant="standard"
                  />
                </Grid>
                {item.sentences.slice(0, 5).map((sentence) => (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="definition"
                      id=""
                      label="Definition"
                      value={sentence.value}
                      variant="standard"
                    />
                  </Grid>
                ))}
              </Grid>
              {/* </form> */}
            </Card>
          ))
        );
      });
    console.log(cards);
  };
  return (
    <div>
      <Box p={4}>{cards}</Box>
    </div>
  );
}
