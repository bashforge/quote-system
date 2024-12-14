import { db } from '@/lib/db/client'
import type { CreateQuoteInput, UpdateQuoteInput } from '@/lib/types/quote'

export class QuoteService {
  static async createQuote(input: CreateQuoteInput) {
    return db.quote.create({
      data: {
        personalInfo: {
          create: input.personalInfo
        },
        eventDetails: {
          create: input.eventDetails
        },
        venueSelection: {
          create: input.venueSelection
        },
        setupRequirements: {
          create: input.setupRequirements
        },
        additionalServices: input.additionalServices ? {
          create: {
            ...input.additionalServices,
            vendors: {
              create: input.additionalServices.vendors
            },
            pointOfContact: input.additionalServices.pointOfContact ? {
              create: input.additionalServices.pointOfContact
            } : undefined
          }
        } : undefined
      },
      include: {
        personalInfo: true,
        eventDetails: true,
        venueSelection: true,
        setupRequirements: true,
        additionalServices: {
          include: {
            vendors: true,
            pointOfContact: true
          }
        }
      }
    })
  }

  static async updateQuote(id: string, input: UpdateQuoteInput) {
    return db.quote.update({
      where: { id },
      data: input,
      include: {
        personalInfo: true,
        eventDetails: true,
        venueSelection: true,
        setupRequirements: true,
        additionalServices: {
          include: {
            vendors: true,
            pointOfContact: true
          }
        }
      }
    })
  }

  static async findById(id: string) {
    return db.quote.findUnique({
      where: { id },
      include: {
        personalInfo: true,
        eventDetails: true,
        venueSelection: true,
        setupRequirements: true,
        additionalServices: {
          include: {
            vendors: true,
            pointOfContact: true
          }
        }
      }
    })
  }

  static async findAll(status?: string) {
    return db.quote.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        personalInfo: true,
        eventDetails: true,
        venueSelection: true,
        setupRequirements: true,
        additionalServices: {
          include: {
            vendors: true,
            pointOfContact: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}