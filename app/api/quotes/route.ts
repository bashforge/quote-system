import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { QuoteService } from "@/lib/services/quote.service"
import { quoteRequestSchema } from "@/lib/schemas/quote-request"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = quoteRequestSchema.parse(body)
    
    const quote = await QuoteService.createQuote(validatedData)
    
    // Here you would typically send email notifications
    // We'll implement email functionality later
    
    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error('Quote creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create quote request' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    
    const quotes = await QuoteService.findAll(status || undefined)
    return NextResponse.json(quotes)
  } catch (error) {
    console.error('Quote fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}