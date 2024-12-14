import { NextResponse } from "next/server"
import { createAdminUser } from "@/lib/services/admin"
import { validateSetupToken } from "@/lib/auth/setup-token"
import { setupRequestSchema } from "@/lib/schemas/setup"

export async function POST(req: Request) {
  try {
    // Validate setup token
    const setupToken = req.headers.get("x-setup-token")
    if (!validateSetupToken(setupToken)) {
      return NextResponse.json(
        { error: "Invalid setup token" },
        { status: 401 }
      )
    }

    // Validate request body
    const body = await req.json()
    const validatedData = setupRequestSchema.parse(body)

    // Create admin user
    await createAdminUser({
      email: validatedData.email,
      password: validatedData.password,
    })

    return NextResponse.json(
      { message: "Admin user created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to create admin user:", error)
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    )
  }
}