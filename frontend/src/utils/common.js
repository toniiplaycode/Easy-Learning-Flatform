import { toast } from "react-toastify";

export const url = "http://localhost:1234";

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  // Get the day, month, and year and format them
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const formatTime = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
};

export const formatTimeText = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? hours + " giờ " : ""}${
    minutes > 0 ? minutes + " phút " : ""
  }${remainingSeconds > 0 ? remainingSeconds + " giây" : ""}`.trim();
};

export const formatUrlYoutube = (url) => {
  // Check if the URL starts with 'https://www.youtube.com'
  if (!url.startsWith("https://www.youtube.com")) {
    toast.error("Link youtube không hợp lệ !");
    return null; // Return null or handle as necessary
  }

  // Extract the video ID if the URL is valid
  const match = url.match(/v=([^&]+)/);
  if (match && match[1]) {
    return match[1];
  } else {
    toast.error("Invalid YouTube URL. Unable to extract video ID.");
    return null;
  }
};

export const formatDuration = (durationString) => {
  const hoursMatch = durationString.match(/(\d+)H/);
  const minutesMatch = durationString.match(/(\d+)M/);
  const secondsMatch = durationString.match(/(\d+)S/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;

  return hours * 3600 + minutes * 60 + seconds;
};
