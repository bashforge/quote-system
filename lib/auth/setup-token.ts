import crypto from "crypto"

// Generate a random setup token on server start
const SETUP_TOKEN = crypto.randomBytes(32).toString("hex")

export function validateSetupToken(token: string | null): boolean {
  if (!token) return false
  return token === SETUP_TOKEN
}

// Export the token so it can be used in setup scripts
export function getSetupToken(): string {
  return SETUP_TOKEN
}