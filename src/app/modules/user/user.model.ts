import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, requried: true },
    password: { type: String, requried: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ["student", "admin", "faculty"] },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);
