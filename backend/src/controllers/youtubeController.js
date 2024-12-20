import { google } from "googleapis";
import axios from "axios";
import express from "express";
import OAuth2Data from "../config/client_secret_108808695683-n65u96924261elknp0apubc5gbo2ac2l.apps.googleusercontent.com.json" assert { type: "json" }; // Use assert { type: "json" }
import fs from "fs";

const app = express();

app.set("view engine", "ejs");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

export const getApiYoutube = async (req, res) => {
  const videoId = req.params.id;
  const apiKey = "AIzaSyB1kLP2XmB4jQcg2EZOkdSHoTHhOpbh9Iw"; // Store your API Key in an .env file
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const videoData = response.data;
    res.json(videoData); // Send the response as JSON
  } catch (error) {
    console.error("Error fetching video details:", error);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
};

export const authApiYoutube = async (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/youtube.upload",
  });

  res.redirect(url);
};

export const oAuthApiYoutube = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
    res.send(tokens);
  } catch (error) {
    console.log("error: " + error);
    res.status(500).send("error oauth");
  }
};

export const uploadVideo = async (req, res) => {
  const { title, desc } = req.body;
  const file = req.file;

  if (!file) {
    console.error("No video file uploaded.");
    return res.status(400).send({ error: "No video file uploaded" });
  }

  oauth2Client.setCredentials({
    access_token:
      "ya29.a0ARW5m74MMSWApeeG3xvcbEt1UGqeIdo_BKfslHaVPVayTB1eDnVwo5b8Ts-ftMnwspCcl8uU6YCrTJfWxV2XWX0vjdATLOwsXR7Qp41iBqIUm7VqOLRjnJ1UEX0m4rIHx-R0a7MazM_IXU5510jiA1eiBUtJkKJonRjojUtVaCgYKAckSARESFQHGX2MiLkKTcyS1N46OwaKPr6Jz4A0175",
    refresh_token:
      "1//0er7vaI1Kmcz6CgYIARAAGA4SNwF-L9IroykcRmrQLBVxaGmQYnw72u0Nq5FGRewpr-X88hHqEz_bM2ENjN47VX1CkpPiljm_ZYs",
    scope: "https://www.googleapis.com/auth/youtube.upload",
  });

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  try {
    console.log("Starting video upload...");
    const response = await youtube.videos.insert({
      requestBody: {
        snippet: {
          title: title,
          description: desc,
        },
        status: {
          privacyStatus: "unlisted",
        },
      },
      part: "snippet,status",
      media: {
        body: fs.createReadStream(file.path),
      },
    });

    console.log("Video uploaded successfully:", response.data);

    // Clean up the uploaded file after processing
    fs.unlinkSync(file.path);

    res.status(200).send({
      message: "Video uploaded successfully!",
      video: response.data,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    fs.unlinkSync(file.path);
    res.status(500).send({
      error: "Error uploading video to YouTube",
      details: error.message,
    });
  }
};
