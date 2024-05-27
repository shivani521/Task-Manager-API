//create the functions : create, update, delete, and read.

import Task from "../Models/task.js";
import User from "../Models/user.js";

//create function to create tasks
export const createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;

  try {
    const taskTitle = await Task.findOne({ title: title });
    if (taskTitle) {
      return res.status(404).json({ message: "task already created" });
    }
    const user = await User.findOne({ email: assignedTo });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo: user._id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//update function to read tasks
export const readTask = async (req, res) => {};

//read function to update tasks
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
