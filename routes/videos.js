const express = require("express");
const path = require("node:path");
const router = express.Router();
const cors = require("cors");

router.use(express.json());
router.use(cors());

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

// const { v4: uuidv4 } = require("uuid");
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
    channel: "Cute Cats",
    image: "http://localhost:8080/images/christmas-kitty.jpg",
    description: description,
    views: "2,000,8021",
    likes: "558,453",
    duration: "60:00",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date().getTime(),
    comments: [
      {
        id: "823f6f49-db71-49fe-9918-bde8d8da6a4axme",
        name: "Marco Polo",
        comment: "Unbelievable.",
        likes: 0,
        timestamp: 1630790612005,
      },
      {
        id: "797ca18c-4fd4-4887-b9f4-3ec098e8121dxmr",
        name: "Albert Einstein",
        comment: "Amazing video",
        likes: 1,
        timestamp: 1630762456006,
      },
      {
        id: "fcc1cbf2-e332-4b49-9643-c08ddd8f85afxmf",
        name: "Roger Federer",
        comment: "Wonderful video",
        likes: 0,
        timestamp: 1630678260008,
      },
    ],
  };

  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  res.status(201).json(newVideo);
});

module.exports = router;
