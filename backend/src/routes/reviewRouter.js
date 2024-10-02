import express from "express";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/AuthMiddleware.js";
import {
  addReview,
  deleteReview,
  detailReview,
  getReviewCourse,
  updateReview,
} from "../controllers/reviewController.js";

let router = express.Router();

router.post("/addReview", authenticateToken, addReview);
router.get("/getReviewCourse", getReviewCourse); // lấy review của một course
router.get("/detailReview", detailReview);
router.put("/updateReview", authenticateToken, updateReview);
router.delete("/deleteReview", authenticateToken, deleteReview);

export default router;
