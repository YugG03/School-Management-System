import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"], // You can add more roles as needed
    default: "admin",
  },
  // You can add other fields like email, name, etc.
});

const User = mongoose.model("User", userSchema);

export default User;
