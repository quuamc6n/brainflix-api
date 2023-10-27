require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 5050;
const API_KEY = process.env.API_KEY
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
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

app.post("/videos", (req, res) => {
  const { title, description } = req.body;
  const id = uuidv4();

  const uploadData = {
    id,
    title,
    description,
    image: "https://brainflexbackend.onrender.com/images/brainflix_static.png",
    channel: "Cat's Eyes",
    views: 101010,
    likes: 101010,
    timestamp: Date(),
    comments: [
      {
        id: "c93c16f0-4795-45d1-b0da-21696d54f25aa",
        name: "Fionna Miller",
        comment:
          "I added an a to the end of each of these comments' IDs. I am also hard coding these comments just to make them different. However, I am keeping the names and times to avoid any errors :)",
        likes: 6,
        timestamp: 1631816492000,
      },
      {
        id: "99938bd4-67f9-4404-ad3e-b23a6ad05717a",
        name: "Suzie Maxwell",
        comment:
          "I added an a to the end of each of these comments' IDs. I am also hard coding these comments just to make them different. However, I am keeping the names and times to avoid any errors :)",
        likes: 1,
        timestamp: 1631799181000,
      },
      {
        id: "fc2e9a8c-7daa-4e14-980d-5467ca2054eca",
        name: "Alasie Rivers",
        comment:
          "I added an a to the end of each of these comments' IDs. I am also hard coding these comments just to make them different. However, I am keeping the names and times to avoid any errors :)",
        likes: 0,
        timestamp: 1631716921000,
      },
    ],
  };

  const currentData = JSON.parse(fs.readFileSync("./data/video-details.json"));
  currentData.push(uploadData);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(currentData));

  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});