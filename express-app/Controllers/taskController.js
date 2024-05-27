//create the functions : create, update, delete, and read.

import Task from "../Models/task.js";
import User from "../Models/user.js";

//create function to create tasks
export const createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;

  try {
    const taskTitle = await Task.findOne({ title: title });
    if (taskTitle) {
      console.log("task already created");
      return res.status(404).json({ message: "task already created" });
    }
    const user = await User.findOne({ email: assignedTo });
    if (!user) {
      console.log("user not found.");
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

//read function to read tasks
export const readTask = async (req, res) => {};

//update function to update tasks
export const updateTask = async (req, res) => {};

//delete function to delete tasks
export const deleteTask = async (req, res) => {};
