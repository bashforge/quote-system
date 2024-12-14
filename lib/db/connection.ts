import mongoose from "mongoose"
import { getDatabaseConfig } from "../config/database"

interface ConnectionCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: ConnectionCache | undefined
}

let cached = global.mongooseCache
if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null,
  }
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached?.conn) {
    return cached.conn
  }

  if (!cached?.promise) {
    const config = getDatabaseConfig()

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    cached!.promise = mongoose
      .connect(config.uri, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully")
        return mongoose
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error)
        cached!.promise = null
        throw error
      })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (error) {
    cached!.promise = null
    throw error
  }

  return cached!.conn
}