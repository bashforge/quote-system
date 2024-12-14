// Use environment variable for setup token
const SETUP_TOKEN = process.env.SETUP_TOKEN

if (!SETUP_TOKEN) {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Warning: SETUP_TOKEN environment variable is not set. Admin setup endpoint will be unavailable."
  )
}

export function validateSetupToken(token: string | null): boolean {
  if (!SETUP_TOKEN || !token) return false
  return token === SETUP_TOKEN
}

// For debugging purposes in development
if (process.env.NODE_ENV === "development") {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Setup Token: ${SETUP_TOKEN}`
  )
}