const express = require("express");
const app = express();
const fs = require("fs");
const port = 5050;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  const videoList = JSON.parse(fs.readFileSync("./data/videos.json"));
  res.status(200).json(videoList);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});