// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js"; // Import user routes
import User from "./models/user.js";
import bcrypt from "bcrypt";
import fileUpload from "express-fileupload";
// import cors from "cors";

dotenv.config();

const app = express();
// app.use(cors({
//   origin: "http://localhost:5000", // Replace with your React app's URL
//   methods: ["GET", "POST", "PATCH", "DELETE"], // Allow only certain methods if needed
//   credentials: true, // Allow cookies to be sent along with requests (if necessary)
// }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
try {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection error:", err);
}

// Use the user routes
app.use("/api", apiRoutes); // Use '/api' prefix for your routes

// Basic route
app.get("/", async (req, res) => {
  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne();

    if (existingAdmin) {
      return res.status(200).json({
        message: "Admin already exists.",
        admin: existingAdmin, // Returning the existing admin details
      });
    }
    const password = process.env.PASSWORD;
    const hashedPassword = await bcrypt.hash(password, 10);
    // If no admin exists, create a default admin
    const defaultAdmin = new User({
      username: process.env.USER, // Default username for the admin
      password: hashedPassword, // Default password (ideally this should be hashed)
    });

    // Save the default admin to the database
    await defaultAdmin.save();
    // Send the response with the admin details
    res.status(201).json({
      message: "Default admin created successfully.",
      admin: {
        // id: defaultAdmin._id,
        username: process.env.USER,
        password: process.env.PASSWORD, // You would return a hashed password in a real-world scenario
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin: " + err.message });
  }
});

app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "Endpoint not found. Please check and try again." });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
