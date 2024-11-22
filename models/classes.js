import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Number, // Reference to the Teacher model
      ref: "Teacher", // Add the reference to the Teacher model
      required: true,
    },
    classId: {
      type: Number,
      required: true,
      unique: true
    },
    studentCount: {
      type: Number,
      required: true,
      default: 0, // Defaults to 0 students
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to the current timestamp
      immutable: true, // Prevent modification
    },
  },
  {
    timestamps: true, // Auto-manages createdAt and updatedAt fields
  }
);

const Class = mongoose.model("Class", classSchema);
export default Class;
