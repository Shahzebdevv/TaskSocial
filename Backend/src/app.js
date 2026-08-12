import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();

// 2. Configure CORS Middleware before your routes!
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;
