import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/Login.js";
import taskRoutes from "./Routes/manageTasks.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to authenticate and authorize user
export const authenticateUser = (req, res, next) => {
  // Check if user is authenticated (e.g., by verifying JWT token)
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied. Please log in." });
  }

  // Verify JWT token and extract user ID
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Set user object in request for future use
    next(); // Proceed to the next middleware
  });
};


// Routes
app.use("/auth", authRoutes);
app.use("/task", authenticateUser,taskRoutes);

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });


// Protected route
app.get("/home", authenticateUser, (req, res) => {
  res.send(`Welcome home, user ${req.user.userId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
