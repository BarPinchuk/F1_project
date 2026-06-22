import driverRoutes from "./routes/drivers.routes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createLogger } from "./utils/logger.js"; // ודא שהנתיב מדויק למיקום הקובץ אצלך

dotenv.config();

export const app = express();
const logger = createLogger("App");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.http(`${req.method} request to ${req.url}`);
  next();
});

app.use("/api/drivers", driverRoutes);

app.use((err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});
