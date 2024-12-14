const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Ensure the prisma directory exists
const prismaDir = path.join(process.cwd(), 'prisma')
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir)
}

// Combine schema files
const schemaFiles = ['quote.prisma', 'user.prisma']
let combinedSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

`

for (const file of schemaFiles) {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'lib', 'db', 'schema', file),
    'utf8'
  )
  combinedSchema += content + '\n'
}

// Write combined schema
fs.writeFileSync(
  path.join(prismaDir, 'schema.prisma'),
  combinedSchema
)

// Generate Prisma client and push schema
try {
  console.log('Generating Prisma Client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
  
  console.log('Pushing schema to database...')
  execSync('npx prisma db push', { stdio: 'inherit' })
  
  console.log('Database setup completed successfully!')
} catch (error) {
  console.error('Error setting up database:', error)
  process.exit(1)
}