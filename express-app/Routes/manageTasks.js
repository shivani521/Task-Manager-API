import express from "express";
import {
  createTask,
  updateTask,
  readTask,
  deleteTask,
} from "../Controllers/taskController.js";


const router = express.Router();

router.post("/create", createTask);
router.get("/search", readTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
