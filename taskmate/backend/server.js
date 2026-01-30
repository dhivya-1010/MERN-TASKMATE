const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmate")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------------- ROUTES ---------------- */

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD task
app.post("/api/tasks", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Task name is required" });
  }

  const newTask = new Task({
    name: req.body.name,
    time: new Date().toLocaleString(),
    completed: false,
  });

  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

// UPDATE task (edit / checkbox)
app.put("/api/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updatedTask);
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ success: true });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
