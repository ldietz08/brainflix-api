require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const videoRouter = require("./routes/videos.js");

app.use("/videos", videoRouter);
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

const BACK_END_URL = process.env.PORT;
app.listen(BACK_END_URL || "http://localhost:5000", () => {
  console.log(
    `The server is running on ${BACK_END_URL}! You better go catch it`
  );
});
