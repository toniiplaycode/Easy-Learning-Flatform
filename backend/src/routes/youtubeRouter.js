import express from "express";
import { getApiYoutube } from "../controllers/youtubeController.js";

let router = express.Router();

router.get("/video/:id", getApiYoutube);

export default router;
