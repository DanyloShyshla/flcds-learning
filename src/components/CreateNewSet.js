import { Box, Button, Card, Checkbox, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const API_URL = "http://127.0.0.1:5000/api/v1/";

function CreateNewSet() {
  const [cardSetId, setCardSetId] = useState(0);
  const [cards, setCards] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [cardSentences, setCardSentences] = useState([]);
  const wordRef = useRef("");

  useEffect(() => {}, cardSentences);

  const test = () => {
    console.log(cardSetId);
  };

  const addCardsToUI = () => {};

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
    console.log(wordRef.current.value);
    const word = wordRef.current.value;
    const res = await axios.get(API_URL + "sentence/" + word.toLocaleLowerCase());
    setCardSentences(res.data);
    setSentences(
      res.data.map((item, index) => (
        <Grid item xs={12}>
          <TextField
            key={index}
            disabled
            fullWidth
            name="sentence"
            id=""
            variant="standard"
            value={item}
            control={<Checkbox />}
          />
        </Grid>
      ))
    );
  };

  const addCard = () => {};

  const createSet = async (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    console.log(event.currentTarget.name.value);

    const token = localStorage.getItem("token");
    // TODO: Move this to User component
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios
      .post(API_URL + "sets", { name: event.currentTarget.name.value }, config)
      .then((response) => {
        console.log(response.data, response.data.id);
        setCardSetId(response.data.id);
        console.log(cardSetId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createCard = (event) => {
    event.preventDefault();

    const card = {
      word: event.currentTarget.word.value,
      definition: event.currentTarget.definition.value,
      set_id: cardSetId,
      sentences: cardSentences.slice(0, 10),
    };
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .post(API_URL + "cards", card, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(card);
    setCards([
      ...cards,
      <Card component="form" noValidate variant="outlined" p={2} style={{ "margin-top": "1em" }}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary">
              Delete
            </Button>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth name="word" id="" label="Word" value={card.word} variant="standard" />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              name="definition"
              id=""
              label="Definition"
              value={card.definition}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Card>,
    ]);
  };

  return (
    <Box>
      <Box p={8}>
        <Grid component="form" onSubmit={createSet} noValidate container spacing={2} py={2}>
          <Grid item xs={8}>
            <TextField required fullWidth id="setName" label="Set name" name="name" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" fullWidth variant="contained" size="large" color="primary">
              Create
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" fullWidth variant="contained" size="large" color="primary" disabled>
              Save
            </Button>
          </Grid>
        </Grid>
        {cardSetId ? (
          <Card component="form" onSubmit={createCard} noValidate variant="outlined" p={2}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <Button onClick={getSentences} variant="contained" color="primary" style={{ margin: "1em" }}>
                  View tences
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                  Create Card
                </Button>
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth inputRef={wordRef} name="word" id="" label="Word" variant="standard" />
              </Grid>
              <Grid item xs={8}>
                <TextField fullWidth name="definition" id="" label="Definition" variant="standard" />
              </Grid>
              {sentences.slice(0, 5)}
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="customSentence"
                  id=""
                  label="Enter your custom sentence"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <Button fullWidth variant="contained" color="primary">
                  Add sentence
                </Button>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Typography>Create new set to start adding new cards</Typography>
        )}
        {cards}
      </Box>
    </Box>
  );
}

export default CreateNewSet;
