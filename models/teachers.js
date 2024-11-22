import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    subject: { type: String, required: true },
    teacherId: { type: Number, required: true, unique: true },
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

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
