import axios from "axios";

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
