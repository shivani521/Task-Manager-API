import express from "express";
import { authenticateUser } from "../index.js";
import {
  createTask,
  updateTask,
  readTask,
  deleteTask,
} from "../Controllers/taskController.js";


const router = express.Router();

router.post("/create", authenticateUser, createTask);
router.get("/search", authenticateUser, readTask);
router.put("/update/:id", authenticateUser, updateTask);
router.delete("/delete/:id", authenticateUser, deleteTask);

export default router;
