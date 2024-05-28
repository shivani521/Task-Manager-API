//create the functions : create, update, delete, and read.

import Task from "../Models/task.js";
import User from "../Models/user.js";

// Create function to create tasks
export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user.userId; // Retrieve user ID from JWT token

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo: userId, // Store user ID as the assignedTo field
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//function to read tasks
export const readTask = async (req, res) => {
  const { assignedTo, id, title, completed } = req.query;

  try {
    const searchCriteria = {};

    if (id) {
      searchCriteria._id = id;
    }

    if (title) {
      searchCriteria.title = { $regex: title, $options: "i" }; // Case-insensitive regex search
    }

    if (assignedTo) {
      searchCriteria.assignedTo = assignedTo;
    }

    if (completed !== undefined) {
      searchCriteria.completed = completed === "true";
    }

    const tasks = await Task.find(searchCriteria);

    if (tasks.length === 0) {
      console.log("No tasks found");
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//function to update tasks
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log(updates);

  try {
    // Find the task by ID and update it with the new values
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!task) {
      console.log("Task not found");
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task updated successfully");
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete function to delete tasks
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
