export const url = "http://localhost:3000";

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
  const videoId = url.match(/v=([^&]+)/)[1];
  return videoId;
};
