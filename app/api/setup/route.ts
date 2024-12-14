import { NextResponse } from "next/server"
import { createAdminUser } from "@/lib/services/admin"
import { validateSetupToken } from "@/lib/auth/setup-token"
import { setupRequestSchema } from "@/lib/schemas/setup"

export async function POST(req: Request) {
  try {
    // Validate setup token
    const setupToken = req.headers.get("x-setup-token")
    if (!validateSetupToken(setupToken)) {
      console.log('Invalid setup token provided');
      return NextResponse.json(
        { error: "Invalid setup token" },
        { status: 401 }
      )
    }

    // Validate request body
    const body = await req.json()
    const validatedData = setupRequestSchema.parse(body)

    // Create admin user
    const adminUser = await createAdminUser({
      email: validatedData.email,
      password: validatedData.password,
    })

    return NextResponse.json(
      { 
        message: "Admin user created successfully",
        email: adminUser.email 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Failed to create admin user:", error)
    
    if (error.message === "Admin user already exists") {
      return NextResponse.json(
        { error: "Admin user already exists" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    )
  }
}