import * as z from "zod"

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  companyName: z.string().optional(),
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
})

export const eventDetailsSchema = z.object({
  eventName: z.string().min(2, "Please enter the event name"),
  startDateTime: z.date({
    required_error: "Please select start date and time",
  }),
  endDateTime: z.date({
    required_error: "Please select end date and time",
  }),
  earlyCheckIn: z.boolean().default(false),
  earlyCheckInTime: z.date().optional(),
  rentalType: z.enum(["hourly", "daily"]).default("hourly"),
  duration: z.number().min(1, "Please enter the duration"),
  extraHours: z.number().default(0),
  eventType: z.enum([
    "wedding_reception",
    "wedding_ceremony",
    "standard_reception",
    "meeting",
    "workshop",
    "banquet",
    "buffet",
    "dinner_dance",
    "concert",
    "other"
  ]),
  eventTypeOther: z.string().optional(),
})

export const venueSelectionSchema = z.object({
  facilities: z.object({
    grandBallroom: z.boolean().default(false),
    outdoorPatio: z.boolean().default(false),
    weddingSite: z.boolean().default(false),
    sideRooms: z.boolean().default(false),
    kitchen: z.boolean().default(false),
    miniConferenceRooms: z.boolean().default(false),
    churchSanctuary: z.boolean().default(false),
    parkingLot: z.boolean().default(false),
  }),
})

export const setupRequirementsSchema = z.object({
  tables: z.object({
    count: z.number().min(0).default(0),
    needLinens: z.boolean().default(false),
    needSetupHelp: z.boolean().default(false),
  }),
  chairs: z.object({
    count: z.number().min(0).default(0),
    needSetupHelp: z.boolean().default(false),
  }),
  setupChange: z.boolean().default(false),
})

const vendorSchema = z.object({
  name: z.string().min(2, "Vendor name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  type: z.string().min(2, "Please specify vendor type"),
})

const pointOfContactSchema = z.object({
  name: z.string().min(2, "Contact name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
})

export const additionalServicesSchema = z.object({
  soundSystem: z.boolean().default(false),
  wirelessMicrophone: z.boolean().default(false),
  ledWall: z.boolean().default(false),
  ledScreen: z.boolean().default(false),
  foodAndDrinks: z.boolean().default(false),
  vendors: z.array(vendorSchema).optional(),
  pointOfContact: pointOfContactSchema.optional(),
  specialRequirements: z.string().optional(),
})

export const quoteRequestSchema = z.object({
  personalInfo: personalInfoSchema,
  eventDetails: eventDetailsSchema,
  venueSelection: venueSelectionSchema,
  setupRequirements: setupRequirementsSchema,
  additionalServices: additionalServicesSchema,
})

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>
export type EventDetailsSchema = z.infer<typeof eventDetailsSchema>
export type VenueSelectionSchema = z.infer<typeof venueSelectionSchema>
export type SetupRequirementsSchema = z.infer<typeof setupRequirementsSchema>
export type AdditionalServicesSchema = z.infer<typeof additionalServicesSchema>
export type QuoteRequestSchema = z.infer<typeof quoteRequestSchema>