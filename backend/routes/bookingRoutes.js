import express from "express";
import { createBooking, getMyBookings, getAllBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/", protect, admin, getAllBookings);

export default router;
