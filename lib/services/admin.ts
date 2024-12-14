import { hashPassword } from "@/lib/auth/password"
import { connectToDatabase } from "@/lib/db/mongodb"
import { User } from "@/lib/db/models/user"

interface CreateAdminParams {
  email: string
  password: string
}

export async function createAdminUser({ email, password }: CreateAdminParams) {
  await connectToDatabase()

  const existingAdmin = await User.findOne({ email })
  if (existingAdmin) {
    throw new Error("Admin user already exists")
  }

  const hashedPassword = await hashPassword(password)
  
  await User.create({
    email,
    password: hashedPassword,
    role: "admin",
  })
}