import 'dotenv/config'
import { connectToDatabase } from '@/lib/db/mongodb'
import { getAdminConfig } from './config/admin'
import { createAdminUser } from './services/create-admin'

async function main() {
  try {
    // Load and validate admin configuration
    const config = getAdminConfig()

    // Connect to database
    await connectToDatabase()
    
    // Create admin user
    await createAdminUser(config)
    
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

main()