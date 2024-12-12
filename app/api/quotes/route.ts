import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Quote } from "@/lib/db/models/quote";
import { quoteRequestSchema } from "@/lib/schemas/quote-request";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = quoteRequestSchema.parse(body);
    
    await connectToDatabase();
    const quote = await Quote.create(validatedData);
    
    // Here you would typically send email notifications
    // We'll implement email functionality later
    
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Quote creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create quote request' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const quotes = await Quote.find().sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Quote fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}