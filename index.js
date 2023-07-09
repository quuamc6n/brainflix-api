const express = require("express");
const app = express();
const fs = require("fs");
const port = 5050;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/videos", (req, res) => {
  const videoList = JSON.parse(fs.readFileSync("./data/video-details.json"));
  res.status(200).json(videoList);
});

app.get("/videos/:id", (req, res) => {
  const videoList = JSON.parse(fs.readFileSync("./data/video-details.json"));

  const selectedVideo = videoList.find((video) => {
    return (video.id === req.params.id);
  });
  res.status(200).json(selectedVideo);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});