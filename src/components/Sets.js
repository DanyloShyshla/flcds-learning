import { Box, Button, Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const API_URL = "http://127.0.0.1:5000/api/v1/";

function Sets() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardSets, setCardSets] = useState([]);

  useEffect(() => {
    fetchSets();
  }, []);

  const newSetRedirect = () => {
    navigate("create-learning-set");
  };

  const fetchSets = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.get(API_URL + "sets" + "?page=1&per_page=100", config).then((response) => {
      setCardSets(
        response.data.items.map((item, index) => (
          <Card variant="outlined" py={2} style={{ margin: "1em" }}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={7}>
                <Typography variant="h6" id={item.id}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button fullWidth variant="outlined" color="secondary" disabled>
                  Flashcards
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate("/profile/sentences", {
                      state: {
                        set_id: item.id,
                      },
                    });
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Sentences
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate("/profile/set-info", {
                      state: {
                        set_id: item.id,
                      },
                    });
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  View
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))
      );
    });
    // console.log(cardSets);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" px={4}>
        <Typography variant="h6">Sets</Typography>
        <Button variant="contained" color="primary" onClick={newSetRedirect}>
          Add new set
        </Button>
      </Box>
      {/* <Button onClick={sentenceNavigate}>Nav</Button> */}
      <Box p={4}>{cardSets}</Box>
    </>
  );
}

export default Sets;
