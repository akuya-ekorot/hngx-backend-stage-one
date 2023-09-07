#!/usr/bin/env node

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name) {
    return res.status(400).json({
      message: "Please provide a slack name in the query params as slack_name",
      status_code: 400,
    });
  }

  if (!track) {
    return res.status(400).json({
      message: "Please provide a track in the query params as track",
      status_code: 400,
    });
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  res.status(200).json({
    slack_name,
    current_day: days[new Date().getDay()],
    // utc timestamp
    current_time: new Date().toISOString(),
    track,
    github_file_url:
      "https://github.com/akuya-ekorot/hngx-backend-stage-one/blob/main/index.js",
    github_repo_url: "https://github.com/akuya-ekorot/hngx-backend-task-one",
    status_code: 200,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
