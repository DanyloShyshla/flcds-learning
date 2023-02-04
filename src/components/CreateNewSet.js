import { Box, Button, Card, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:5000/api/v1/";

function CreateNewSet() {
  const [cards, setCards] = useState([]);
  const [sentences, setSentences] = useState([]);

  // useEffect(() => {

  //   getSentences();
  // });

  const boldWord = (sentence, word) => {
    const parts = sentence.split(word);
    return (
      <span>
        {parts[0]}
        <b>{word}</b>
        {parts[1]}
      </span>
    );
  };

  const getSentences = async () => {
    const word = "Great";
    const res = await axios.get(API_URL + "sentence/" + word.toLocaleLowerCase());
    setSentences(
      res.data.map((item, index) => (
        <Grid item xs={12}>
          <TextField
            disabled
            fullWidth
            name="word"
            id=""
            variant="standard"
            value={<span>{item}</span>}
            control={<Checkbox />}
          />
          {/* <FormControlLabel key={index} value={item} control={<Checkbox />} label={item} /> */}
        </Grid>
      ))
    );
  };

  const addCard = () => {
    setCards([]);
  };

  const createSet = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    console.log(event.currentTarget.name.value);

    const token = localStorage.getItem("token");
    // TODO: Move this to User component
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .post(API_URL + "sets", { name: event.currentTarget.name.value }, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createCard = (event) => {
    event.preventDefault();

    console.log({
      word: event.currentTarget.word.value,
      definition: event.currentTarget.definition.value,
      sentence: event.currentTarget.sentence.labelValue,
    });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box p={8}>
        <Grid component="form" onSubmit={createSet} noValidate container spacing={2} p={2}>
          <Grid item xs={8}>
            <TextField required fullWidth id="setName" label="Set name" name="name" variant="outlined" />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained" size="large" color="primary">
              Create
            </Button>
          </Grid>
        </Grid>
        {/* <Box 
          component="form" 
          noValidate 
          display="flex" 
          alignItems="center" 
          mb={2}
          
          >
          <TextField 
            required
            fullWidth
            id="setName"
            label="Set name" 
            name="name"
            variant="outlined" />
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          >
          Create
          </Button>
        </Box> */}

        <Card component="form" onSubmit={createCard} noValidate variant="outlined" p={2}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={6}>
              <TextField fullWidth name="word" id="" label="Word" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="definition" id="" label="Definition" variant="standard" />
            </Grid>
            {sentences.slice(0, 5)}
            <Grid item xs={6}>
              <TextField fullWidth name="customSentence" id="" label="Enter your custom sentence" variant="standard" />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" variant="contained" color="primary">
                Add sentence
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={getSentences} variant="contained" color="primary">
                View tences
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={addCard} variant="contained" color="secondary">
                Add Card
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}

export default CreateNewSet;
