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


router.get(
  "/most-searched",
  getMostSearchedDoctors
);

router.get(
  "/top-ten",
  getTopTenDoctors
);

router.get("/", getDoctors);


router.get("/:id", getDoctorById);


export default router;
