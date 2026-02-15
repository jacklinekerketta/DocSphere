import express from "express";
import {
  registerDoctor,
  getDoctors,
  getDoctorById,
  getMostSearchedDoctors,
  getTopTenDoctors,
} from "../controllers/doctorController.js";

import upload from "../middleware/upload.js";

const router = express.Router();
router.post(
  "/",
  upload.single("profile_picture"),
  registerDoctor
);

// STATIC ROUTES FIRST
router.get(
  "/most-searched",
  getMostSearchedDoctors
);

router.get(
  "/top-ten",
  getTopTenDoctors
);

router.get("/", getDoctors);

// DYNAMIC LAST
router.get("/:id", getDoctorById);


export default router;
