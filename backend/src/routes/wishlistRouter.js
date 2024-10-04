import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addWishlist,
  deleteWishlist,
  getWishlistEachUser,
} from "../controllers/wishlistController.js";

let router = express.Router();

router.post("/addWishlist", authenticateToken, addWishlist);
router.get("/getWishlistEachUser", authenticateToken, getWishlistEachUser);
router.delete("/deleteWishlist", authenticateToken, deleteWishlist);

export default router;
