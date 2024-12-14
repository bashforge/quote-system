const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const prisma = new PrismaClient()

async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

async function createAdminUser() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file')
  }

  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL }
    })

    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    const hashedPassword = await hashPassword(ADMIN_PASSWORD)
    
    const admin = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('Admin user created successfully:', admin.email)
  } catch (error) {
    console.error('Failed to create admin user:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })