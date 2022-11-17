const express = require("express");
const path = require("node:path");
const router = express.Router();

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

router.get("/", (_req, res) => {
  try {
    res.status(200).json(videos);
  } catch (err) {
    console.log("Error fetching the videos", err);
  }
});

router.get("/:videoId", (req, res) => {
  const found = videos.find((video) => video.id === req.params.videoId);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Video with ID ${req.params.videoId} not found` });
  }
});

router.post("/post", (req,res) => {
    const {title, description} = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Please provide a title and description"});
    }

    const newVideo = {
      id: "c05b9a93-8682-4ab6-aff2-92ebb4bbfc14",
      title: title,
      channel: "Christmas",
      image: "../public/images/christmas-kitty.jpg",
      description: description,
      views: "0",
      likes: "0",
      duration: "50:00",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: 1668508367,
    };

    videos.push(newVideo);
    writeJSONFile(videosJSONFile, videos);

    res.status(201).json(newVideo)
});


module.exports = router;