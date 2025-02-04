import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ensure name is mandatory
      trim: true, // Remove extra spaces from the name
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Not required for Google users
    },
    userRole: {
      type: String,
      default: "normalUser", // Default value is "normalUser"
      trim: true, // Remove extra spaces from the userRole
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
