import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    studentId: { type: Number, unique: true, required: true },
    classId: {
      type: Number, // Reference to the Class model
      ref: "Class", // Add the reference to the Class model
      required: true,
    },
    profileImageUrl: {
      type: String, // Cloudinary URL
      required: false,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to the current timestamp
      immutable: true, // Prevent modification
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Auto-manages createdAt and updatedAt fields
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
