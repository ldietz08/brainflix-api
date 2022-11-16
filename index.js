require("dotenv").config();
const BACK_END = process.env.PORT;

const express = require("express");
const path = require("node:path");
const app = express();

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(BACK_END || 5500, () => {
  console.log(`The server is running on ${BACK_END}! You better go catch it`);
});

const videoRouter = require('./routes/videos.js');

app.use('/videos', videoRouter);