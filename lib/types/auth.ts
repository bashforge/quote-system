export type UserRole = "admin"

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}