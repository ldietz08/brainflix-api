const express = require("express");
const path = require("node:path");
const router = express.Router();
const cors = require("cors");

router.use(express.json());
const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

const { getNewId, writeJSONFile } = require("../helper/helper");

router.use(cors());

router.get("/", (_req, res) => {
  try {
    res.status(200).json(videos);
  } catch (err) {
    console.log("Error fetching the videos", err);
  }
});

// Read
router.get("/:videoId", (req, res) => {
  const found = videos.find((video) => video.id === req.params.videoId);

  if (found) {
    res.status(200).json(found);
  } else {
    res
      .status(404)
      .json({ error: `Video with ID ${req.params.videoId} not found` });
  }
});

// Create new video
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Please provide a title and description" });
  }

  const newVideo = {
    id: getNewId(),
    title: title,
    channel: "Christmas Kitty",
    image: "http://localhost:8080/images/christmas-kitty.jpg",
    description: description,
    views: "0",
    likes: "0",
    duration: "50:00",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: 1668508367,
  };

  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  res.status(201).json(newVideo);
});

module.exports = router;
