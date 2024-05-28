import mongoose from "mongoose";

// Define the schema for tasks
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

taskSchema.pre("save", function (next) {
  if (this.isModified("dueDate") || this.isNew) {
    if (typeof this.dueDate === "string") {
      const dateParts = this.dueDate.split("-");
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JS Date
        const year = parseInt(dateParts[2], 10);
        this.dueDate = new Date(year, month, day);
      }
    }
  }
  next();
});

// Create a Task model using the schema
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
