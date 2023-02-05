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
    console.log(cardRefId);
    // const token = localStorage.getItem("token");
    // const config = { headers: { Authorization: `Bearer ${token}` } };

    // await axios.delete(API_URL + "cards/" + e.target.id, config).then((response) => {
    //   console.log(response);
    //   fetchSets();
    // });
  };

  const fetchSets = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.get(API_URL + "cards?" + `set_id=${29}` + "&page=1&per_page=100", config).then((response) => {
      response.data.items.map((item, index) =>
        setCards(
          <Card
            inputRef={item.id}
            key={index}
            component="form"
            onSubmit={handleCardDelete}
            noValidate
            variant="outlined"
            p={2}
            style={{ marginTop: "1em" }}
          >
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
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
              {item.sentences.map((sentence) => (
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
          </Card>
        )
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
