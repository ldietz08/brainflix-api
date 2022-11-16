const express = require("express");
const path = require("node:path");
const app = express();

const router = express.Router();

const videos = path.join(__dirname, "../data/videos.json");

router.get("/", (_req, res) => {
  try {
    res.status(200).json(videos);
  } catch (err) {
    console.log("Error fetching the videos", err);
  }
});

router.get("/:videoId", (_req, res) => {
  const found = videos.find((video) => video.id === req.params.videoId);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Video with ID ${req.params.videoId} not found` });
  }
});

module.exports = router;
