import { Task } from "../models/task.model.js";

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const task = await Task.create({
      title,
      description,
      author: req.user._id,
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user._id });
    return res.status(200).json({ Tasks: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getPublicFeed = async (req, res) => {
  try {
    const getFeed = await Task.find().populate("author", "username email");
    return res.status(200).json({ Feed: getFeed });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true },
    );

    return res.status(200).json({ task: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { createTask, getMyTasks, getPublicFeed, updateTask, deleteTask };
