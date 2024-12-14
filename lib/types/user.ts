export interface CreateUserInput {
  email: string
  password: string
  role?: 'ADMIN'
}

export interface User {
  id: string
  email: string
  role: 'ADMIN'
  createdAt: Date
}