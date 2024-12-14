import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { QuoteService } from "@/lib/services/quote.service"

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    
    const quotes = await QuoteService.findAll(status || undefined)
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

    const quote = await QuoteService.updateQuote(id, updateData)

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