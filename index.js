require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const videoRouter = require('./routes/videos.js');

app.use('/videos', videoRouter);
app.use(cors());

const BACK_END = process.env.PORT;
app.listen(BACK_END || 5500, () => {
  console.log(`The server is running on ${BACK_END}! You better go catch it`);
});