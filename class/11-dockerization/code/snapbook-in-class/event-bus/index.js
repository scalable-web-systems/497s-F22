import express from "express";
import logger from "morgan";
import axios from "axios";

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://posts:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://comments:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://query:4002/events", event).catch((err) => {
    console.log(err.message);
  });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
