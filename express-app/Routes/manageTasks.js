import express from "express";
import {
  createTask,
  updateTask,
  readTask,
  deleteTask,
} from "../Controllers/taskController.js";

const router = express.Router();

router.post("/create", createTask);
router.post("/read", readTask);
router.post("/update", updateTask);
router.post("/delete", deleteTask);

export default router;
