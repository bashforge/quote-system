"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import type { Quote } from "@/lib/db/models/quote"

interface QuoteDetailsDialogProps {
  quote: Quote | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteDetailsDialog({
  quote,
  open,
  onOpenChange,
}: QuoteDetailsDialogProps) {
  if (!quote) return null

  const handleSubmitQuote = async () => {
    // Implement quote submission logic
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Quote Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Client Name</Label>
              <div className="mt-1">{quote.name}</div>
            </div>
            <div>
              <Label>Event Date</Label>
              <div className="mt-1">
                {format(new Date(quote.date), "PPP")}
              </div>
            </div>
          </div>

          <div>
            <Label>Event Details</Label>
            <div className="mt-1 space-y-2">
              <p>Type: {quote.eventType}</p>
              <p>Attendees: {quote.attendees}</p>
            </div>
          </div>

          <div>
            <Label>Selected Facilities</Label>
            <div className="mt-1">
              {/* Add facility list */}
            </div>
          </div>

          <div>
            <Label>Setup Requirements</Label>
            <div className="mt-1">
              {/* Add setup requirements */}
            </div>
          </div>

          <div>
            <Label>Additional Services</Label>
            <div className="mt-1">
              {/* Add additional services */}
            </div>
          </div>

          <div>
            <Label>Quote Amount</Label>
            <Input type="number" placeholder="Enter quote amount" />
          </div>

          <div>
            <Label>Admin Notes</Label>
            <Textarea placeholder="Add any internal notes about this quote" />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitQuote}>
              Submit Quote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}