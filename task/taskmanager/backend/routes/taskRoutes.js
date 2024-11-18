const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Import Task model

// Fetch all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  const { title, description, dueDate, dueTime } = req.body;
  try {
    const newTask = new Task({ title, description, dueDate, dueTime, completed: false });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an existing task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, dueTime, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, dueTime, completed },
      { new: true } // Return the updated document
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle task completion
router.put("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
