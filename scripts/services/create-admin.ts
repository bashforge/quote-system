import { User } from '@/lib/db/models/user'
import { AdminConfig } from '../config/admin'
import { hashPassword } from '../utils/password'

export async function createAdminUser(config: AdminConfig): Promise<void> {
  const existingAdmin = await User.findOne({ email: config.email })
  
  if (existingAdmin) {
    console.log('Admin user already exists')
    return
  }

  const hashedPassword = await hashPassword(config.password)
  
  await User.create({
    email: config.email,
    password: hashedPassword,
    role: 'admin',
  })
  
  console.log('Admin user created successfully')
}