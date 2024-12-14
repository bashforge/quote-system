import { z } from "zod"
import { quoteRequestSchema } from "@/lib/schemas/quote-request"

export type CreateQuoteInput = z.infer<typeof quoteRequestSchema>

export interface UpdateQuoteInput {
  status?: "pending" | "quoted" | "accepted" | "expired"
  amount?: number
  adminNotes?: string
}

export interface Quote {
  id: string
  personalInfo: {
    firstName: string
    lastName: string
    companyName?: string
    address: string
    phone: string
    email: string
  }
  eventDetails: {
    eventName: string
    startDateTime: Date
    endDateTime: Date
    earlyCheckIn: boolean
    earlyCheckInTime?: Date
    rentalType: "hourly" | "daily"
    duration: number
    eventType: string
    eventTypeOther?: string
  }
  venueSelection: {
    facilities: {
      grandBallroom: boolean
      outdoorPatio: boolean
      weddingSite: boolean
      sideRooms: boolean
      kitchen: boolean
      miniConferenceRooms: boolean
      churchSanctuary: boolean
      parkingLot: boolean
    }
  }
  setupRequirements: {
    tables: {
      count: number
      needLinens: boolean
      needSetupHelp: boolean
    }
    chairs: {
      count: number
      needSetupHelp: boolean
    }
    setupChange: boolean
  }
  additionalServices?: {
    soundSystem: boolean
    wirelessMicrophone: boolean
    ledWall: boolean
    ledScreen: boolean
    foodAndDrinks: boolean
    vendors?: Array<{
      name: string
      phone: string
      email: string
      type: string
    }>
    pointOfContact?: {
      name: string
      phone: string
      email: string
    }
    specialRequirements?: string
  }
  status: "pending" | "quoted" | "accepted" | "expired"
  amount?: number
  adminNotes?: string
  createdAt: Date
  updatedAt: Date
}