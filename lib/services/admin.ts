import { hashPassword } from "@/lib/auth/password"
import { connectToDatabase } from "@/lib/db/mongodb"
import { User } from "@/lib/db/models/user"

interface CreateAdminParams {
  email: string
  password: string
}

export async function createAdminUser({ email, password }: CreateAdminParams) {
  try {
    await connectToDatabase()
    console.log('Connected to database');

    const existingAdmin = await User.findOne({ email })
    if (existingAdmin) {
      console.log('Admin user already exists');
      throw new Error("Admin user already exists")
    }

    const hashedPassword = await hashPassword(password)
    console.log('Password hashed successfully');
    
    const adminUser = await User.create({
      email,
      password: hashedPassword,
      role: "admin",
    })

    console.log('Admin user created successfully:', adminUser.email);
    return adminUser;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}