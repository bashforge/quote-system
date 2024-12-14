import { z } from "zod"

const databaseConfigSchema = z.object({
  uri: z.string().url(),
  name: z.string(),
})

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>

export function getDatabaseConfig(): DatabaseConfig {
  const config = {
    uri: process.env.MONGODB_URI,
    name: "event-center",
  }

  try {
    return databaseConfigSchema.parse(config)
  } catch (error) {
    console.error("Invalid database configuration:", error)
    throw new Error("Invalid database configuration. Check your environment variables.")
  }
}