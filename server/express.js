import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import path from "path";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// Serve static files from the "dist" directory
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Other middleware
app.use(compress());
app.use(helmet());

// CORS middleware
app.use(cors());

// Routes
app.use("/", userRoutes);
app.use("/", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else if (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
