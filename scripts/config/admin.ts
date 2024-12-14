import { z } from 'zod'

const adminConfigSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type AdminConfig = z.infer<typeof adminConfigSchema>

export function getAdminConfig(): AdminConfig {
  const config = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  }

  const result = adminConfigSchema.safeParse(config)
  
  if (!result.success) {
    throw new Error(
      'Invalid admin configuration. Please check ADMIN_EMAIL and ADMIN_PASSWORD in your .env file.'
    )
  }

  return result.data
}