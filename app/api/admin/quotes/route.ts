import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/db/mongodb"
import { Quote } from "@/lib/db/models/quote"

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    await connectToDatabase()
    
    const query = status && status !== "all" ? { status } : {}
    const quotes = await Quote.find(query).sort({ createdAt: -1 })

    return NextResponse.json(quotes)
  } catch (error) {
    console.error("Failed to fetch quotes:", error)
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updateData } = body

    await connectToDatabase()
    
    const quote = await Quote.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    )

    if (!quote) {
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error("Failed to update quote:", error)
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    )
  }
}