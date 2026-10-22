import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();

const rawOrigins = [
  process.env.FRONTEND_URL,
  process.env.DOCS_URL,
  "https://vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

// Clean trailing slashes reliably using endsWith and slice
const allowedOrigins = rawOrigins
  .filter(Boolean)
  .map(url => url.endsWith("/") ? url.slice(0, -1) : url);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    // Normalize incoming browser origin strings
    const normalizedOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin;

    // Added a temporary log so you can inspect exactly what string values are comparing in your Render terminal
    console.log("CORS CHECK - Incoming:", normalizedOrigin, " | Allowed List:", allowedOrigins);

    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;
