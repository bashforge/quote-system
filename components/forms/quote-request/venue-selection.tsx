"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { venueSelectionSchema, type VenueSelectionSchema } from "@/lib/schemas/quote-request"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const FACILITIES = [
  {
    id: "grandBallroom",
    label: "Grand Ballroom",
    description: "Our largest venue space, perfect for grand celebrations"
  },
  {
    id: "outdoorPatio",
    label: "Outdoor Patio",
    description: "Beautiful open-air space for ceremonies or receptions"
  },
  {
    id: "weddingSite",
    label: "Wedding Site",
    description: "Dedicated space for wedding ceremonies"
  },
  {
    id: "sideRooms",
    label: "Side Rooms",
    description: "Additional rooms for preparation or breakout sessions"
  },
  {
    id: "kitchen",
    label: "Kitchen",
    description: "Full-service kitchen for catering needs"
  },
  {
    id: "miniConferenceRooms",
    label: "Mini Conference Rooms",
    description: "Smaller rooms perfect for meetings or workshops"
  },
  {
    id: "churchSanctuary",
    label: "Church Main Sanctuary",
    description: "Sacred space for religious ceremonies"
  },
  {
    id: "parkingLot",
    label: "Event Center Parking Lot",
    description: "110 Free parking spaces available"
  }
] as const

interface VenueSelectionFormProps {
  onNext: (data: VenueSelectionSchema) => void
  onBack: () => void
  defaultValues?: Partial<VenueSelectionSchema>
}

export function VenueSelectionForm({ onNext, onBack, defaultValues }: VenueSelectionFormProps) {
  const form = useForm<VenueSelectionSchema>({
    resolver: zodResolver(venueSelectionSchema),
    defaultValues: {
      facilities: defaultValues?.facilities || {
        grandBallroom: false,
        outdoorPatio: false,
        weddingSite: false,
        sideRooms: false,
        kitchen: false,
        miniConferenceRooms: false,
        churchSanctuary: false,
        parkingLot: false,
      },
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Facilities</CardTitle>
            <CardDescription>
              Choose the facilities you need for your event
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACILITIES.map((facility) => (
              <FormField
                key={facility.id}
                control={form.control}
                name={`facilities.${facility.id}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base">
                        {facility.label}
                      </FormLabel>
                      <FormDescription>
                        {facility.description}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Previous Step
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  )
}