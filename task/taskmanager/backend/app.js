const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes"); // Import task routes

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/tasks", taskRoutes); // Mount task routes

// Serve React app in production
if (process.env.NODE_ENV === "production") {
  // Set static folder to React's build folder
  app.use(express.static(path.join(__dirname, "task", "src", "build")));

  // For any other route, serve the React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "task", "src", "build", "index.html"));
  });
}

// Port configuration
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");

    // Start the server after DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the database connection function
connectDB();

// Default route (optional, for testing server availability)
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});
