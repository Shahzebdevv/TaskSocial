import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://railway.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;
