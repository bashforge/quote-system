const { connectToDatabase } = require("../lib/db/mongodb")
const { User } = require("../lib/db/models/user")
const bcrypt = require("bcryptjs")

async function createAdminUser() {
  try {
    await connectToDatabase()
    
    const adminEmail = "admin@example.com"
    const password = "admin123" // Change this to a secure password
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log("Admin user already exists")
      process.exit(0)
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create admin user
    await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    })
    
    console.log("Admin user created successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error creating admin user:", error)
    process.exit(1)
  }
}

createAdminUser()