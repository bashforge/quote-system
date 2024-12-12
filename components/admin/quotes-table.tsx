"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import { QuoteDetailsDialog } from "./quote-details-dialog"
import type { Quote } from "@/lib/db/models/quote"

interface QuotesTableProps {
  status: "all" | "pending" | "quoted" | "accepted" | "expired"
}

export function QuotesTable({ status }: QuotesTableProps) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Add loading state and error handling */}
            <TableRow>
              <TableCell>{format(new Date(), "MMM d, yyyy")}</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>Wedding Reception</TableCell>
              <TableCell>{format(new Date(), "MMM d, yyyy")}</TableCell>
              <TableCell>
                <Badge>Pending</Badge>
              </TableCell>
              <TableCell>$2,500</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedQuote({} as Quote)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <QuoteDetailsDialog
        quote={selectedQuote}
        open={!!selectedQuote}
        onOpenChange={(open) => !open && setSelectedQuote(null)}
      />
    </>
  )
}