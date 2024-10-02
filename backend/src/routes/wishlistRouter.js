import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import { addWishlist } from "../controllers/wishlistController.js";

let router = express.Router();

router.post("/addWishlist", authenticateToken, addWishlist);

export default router;
