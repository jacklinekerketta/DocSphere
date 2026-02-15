import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Doctor Search API");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
