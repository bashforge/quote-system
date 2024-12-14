require('dotenv').config();
const { connectToDatabase } = require('../lib/db/mongodb');
const { User } = require('../lib/db/models/user');
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const SALT_ROUNDS = 12;
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function validateConfig() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL) {
    throw new Error('ADMIN_EMAIL is required in .env file');
  }

  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 6) {
    throw new Error('ADMIN_PASSWORD must be at least 6 characters long');
  }

  return { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };
}

async function createAdminUser(config) {
  const existingAdmin = await User.findOne({ email: config.email });
  
  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  const hashedPassword = await hashPassword(config.password);
  
  await User.create({
    email: config.email,
    password: hashedPassword,
    role: 'admin'
  });
  
  console.log('Admin user created successfully');
}

async function main() {
  try {
    // Load and validate admin configuration
    const config = await validateConfig();

    // Connect to database
    await connectToDatabase();
    
    // Create admin user
    await createAdminUser(config);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

main();