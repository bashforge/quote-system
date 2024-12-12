"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">EventQuote</div>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/request-quote">Request Quote</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}