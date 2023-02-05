import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "@mui/material";
import { useLocation } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/v1/";

const FlashCardSentence = () => {
  const location = useLocation();
  const [isLearning, setIsLearning] = useState(false);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` }, mode: "cors" };
  const [isFinished, setIsFinished] = useState(false);
  const [displayColor, setDisplayColor] = useState("lavender");
  const [totalCards, setTotalCards] = useState(0);
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState();
  const [currentSentence, setCurrentSentence] = useState("");
  const [items, setItems] = useState([{ word: "", sentences: [{ value: "" }] }]);
  const [inputWord, setInputWord] = useState("");
  const [actualWord, setActualWord] = useState("");
  const [cardId, setCardId] = useState(0);

  const fetchItems = async () => {
    const response = await axios.get(API_URL + `cards?set_id=29&page=1&per_page=10`, config);
    console.log(response);
    let all_items = response.data.items;
    let item = response.data.items[Math.floor(Math.random() * all_items.length)];
    setItems(all_items);
    setCurrentItem(item);
    setCurrentSentence(item.sentences[Math.floor(Math.random() * item.sentences.length)].value);
    setActualWord(item.word);
    setCardId(item.id);
    setIsLearning(true);
  };

  const markAsLearned = async () => {
    const response = await axios.put(API_URL + "cards/" + cardId, { learned: true }, config);
  };

  const handleInput = (event) => {
    setInputWord(event.target.value);

    if (event.target.value.toLocaleLowerCase() === actualWord.toLocaleLowerCase()) {
      setDisplayColor("green");
    } else if (event.target.value === "") {
      setDisplayColor("lavender");
    } else {
      setDisplayColor("red");
    }
  };

  function stopPropagation(e) {
    e.stopPropagation();
  }

  const handleRightSwipe = (event) => {
    setInputWord("");
    setTotalCards(totalCards + 1);

    if (actualWord.toLocaleLowerCase() === inputWord.toLocaleLowerCase()) {
      markAsLearned();
      setScore(score + 1);
    }
    if (totalCards === (items.length - 1) * 50) {
      setIsFinished(true);
    }

    let item = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(item);
    setCurrentSentence(item.sentences[Math.floor(Math.random() * item.sentences.length)].value);
    setActualWord(item.word);
  };

  const getDisplaySentence = () => {
    let currentWord = currentItem.word.toLocaleLowerCase();
    let sentenceWords = currentSentence.split(" ");
    return sentenceWords.map((w) =>
      w.toLocaleLowerCase() === currentWord ||
      w.toLocaleLowerCase() === currentWord + "ed" ||
      w.toLocaleLowerCase() === currentWord + "s" ||
      w.toLocaleLowerCase() === currentWord + "ing" ? (
        <input type="text" value={inputWord} onChange={handleInput} style={{ margin: "5px" }} />
      ) : (
        w + " "
      )
    );
  };

  const startNewLearning = () => {
    setIsFinished(false);
    setTotalCards(0);
    setScore(0);
    fetchItems();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {!isLearning ? (
        <Button onClick={fetchItems}>Start Learning</Button>
      ) : !isFinished ? (
        <Card
          variant="outlined"
          onClick={handleRightSwipe}
          style={{
            padding: "90px 50px 90px 50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25vh",
            width: "50vw",
            background: "lavender",
            borderColor: displayColor,
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          <div
            onClick={stopPropagation}
            style={{
              padding: "45px 45px 45px 45px",
              borderRadius: "5px",
              background: "lightblue",
            }}
          >
            {getDisplaySentence()}
          </div>
        </Card>
      ) : (
        <div>
          <Button onClick={startNewLearning}>Start Learning</Button>
          <div>
            {score} / {totalCards}
          </div>
        </div>
      )}
    </div>
  );
};
export default FlashCardSentence;
