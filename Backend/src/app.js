import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();

// Normalize origins by stripping any trailing slashes to prevent string mismatch bugs
const rawOrigins = [
  process.env.FRONTEND_URL,
  process.env.DOCS_URL,
  "https://vercel.app", // Explicit hardcoded fallback for absolute safety
  "http://localhost:3000",
  "http://localhost:5173", // Adding your Vite port in case you test locally
];

const allowedOrigins = rawOrigins
  .filter(Boolean)
  .map((url) => url.replace(/\/\$/, "")); // Removes a trailing slash if present

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or Postman requests which don't send an origin header
      if (!origin) return callback(null, true);

      // Normalize incoming origin header to compare evenly
      const normalizedOrigin = origin.replace(/\/\$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;
