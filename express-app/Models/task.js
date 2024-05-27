import mongoose from "mongoose";

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true 
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false 
  },
  dueDate: {
    type: Date
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create a Task model using the schema
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
