import { db } from '@/lib/db/client'
import { hashPassword } from '@/lib/auth/password'
import type { CreateUserInput } from '@/lib/types/user'

export class UserService {
  static async createUser(input: CreateUserInput) {
    const hashedPassword = await hashPassword(input.password)
    
    return db.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        role: input.role || 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
  }

  static async findByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true
      }
    })
  }
}