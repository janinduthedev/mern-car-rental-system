import express from "express";
import { getCars, createCar, updateCar, deleteCar } from "../controllers/carController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.route("/").get(getCars).post(protect, admin, createCar);
router.route("/:id").put(protect, admin, updateCar).delete(protect, admin, deleteCar);

export default router;
