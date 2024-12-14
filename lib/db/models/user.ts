import mongoose from "mongoose"
import { UserRole } from "@/lib/types/auth"

export interface IUser {
  email: string
  password: string
  role: UserRole
  createdAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
})

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)