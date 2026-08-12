import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getMyTasks,
  getPublicFeed,
  updateTask,
} from "../controllers/task.controller.js";

const taskRouter = Router();

// Chaining 'protectedRoute' first ensures identity is pinned to req.user before hitting the controller
taskRouter.route("/create").post(protectedRoute, createTask);
taskRouter.route("/my-tasks").get(protectedRoute, getMyTasks);
taskRouter.route("/feed").get(protectedRoute, getPublicFeed);
taskRouter.route("/:id").put(protectedRoute, updateTask).delete(protectedRoute, deleteTask);

export default taskRouter;
