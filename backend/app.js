import express from "express";

import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import surveyRoutes from "./routes/survey.routes.js";
import responseRoutes from "./routes/response.routes.js";
import path from "path";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

app.use(express.static(path.join(CURRENT_WORKING_DIR, "backend/dist/app")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compress());
app.use(helmet());

app.use(cors());

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", surveyRoutes);
app.use("/", responseRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, "dist/app/index.html"));
});
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
