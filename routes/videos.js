const express = require("express");
const path = require("node:path");
const router = express.Router();
const cors = require("cors");

router.use(express.json());
router.use(cors());

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

const fs = require("node:fs");

// Generate unique id for each video
const getNewId = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

// Write to videos.json file
const writeJSONFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (error) => {
    if (error) console.log(error);
  });
};

router.get("/", (_req, res) => {
  try {
    res.status(200).json(videos);
  } catch (err) {
    console.log("Error fetching the videos", err);
  }
});

// Read video id
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

// Post new video
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
    channel: "Cute Cats",
    image: "http://localhost:8080/images/christmas-kitty.jpg",
    description: description,
    views: "2",
    likes: "2",
    duration: "60:00",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date().getTime(),
    comments: [
      {
        id: getNewId(),
        name: "Roger Federer",
        comment:
          "What a lovely selection of Christmas tunes! There’s just something about Christmas music that makes me so calm. Thank you for sharing this slice of nostalgia with us all.",
        likes: 0,
        timestamp: new Date().getTime(),
      },
      {
        id: getNewId(),
        name: "Betty White",
        comment:
          "I thoroughly enjoyed this compilation! It was exactly what I was looking for. I can't wait to share it with my family this Christmas. Wishing everyone a wonderful holiday season.",
        likes: 0,
        timestamp: new Date().getTime(),
      },
    ],
  };

  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  res.status(201).json(newVideo);
});
module.exports = router;
