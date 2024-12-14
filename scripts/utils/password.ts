import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const SALT_ROUNDS = 12
  return bcrypt.hash(password, SALT_ROUNDS)
}