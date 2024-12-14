export const ROLES = {
  ADMIN: "ADMIN",
} as const

export const QUOTE_STATUS = {
  PENDING: "PENDING",
  QUOTED: "QUOTED",
  ACCEPTED: "ACCEPTED",
  EXPIRED: "EXPIRED",
} as const

export type Role = keyof typeof ROLES
export type QuoteStatus = keyof typeof QUOTE_STATUS