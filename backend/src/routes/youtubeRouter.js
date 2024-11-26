import express from "express";
import multer from "multer";
import {
  authApiYoutube,
  getApiYoutube,
  oAuthApiYoutube,
  uploadVideo,
} from "../controllers/youtubeController.js";

let router = express.Router();

router.get("/video/:id", getApiYoutube);

const upload = multer({ dest: "uploads/" });
export const uploadMiddleware = upload.single("video");

// 2 route để lấy asscess_token và refresh_token từ google console
router.get("/auth", authApiYoutube);
router.get("/oAuth", oAuthApiYoutube);
router.post("/uploadVideo", uploadMiddleware, uploadVideo);

export default router;
