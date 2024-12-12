"use client"

import { useState } from "react"
import { FormProgress } from "./form-progress"
import { PersonalInfoForm } from "./personal-info"
import { EventDetailsForm } from "./event-details"
import { VenueSelectionForm } from "./venue-selection"
import { SetupRequirementsForm } from "./setup-requirements"
import { AdditionalServicesForm } from "./additional-services"
import { useToast } from "@/components/ui/use-toast"
import type {
  PersonalInfoSchema,
  EventDetailsSchema,
  VenueSelectionSchema,
  SetupRequirementsSchema,
  AdditionalServicesSchema,
  QuoteRequestSchema,
} from "@/lib/schemas/quote-request"

const FORM_STEPS = [
  {
    title: "Personal Info",
    description: "Your contact details"
  },
  {
    title: "Event Details",
    description: "About your event"
  },
  {
    title: "Venue",
    description: "Choose facilities"
  },
  {
    title: "Setup",
    description: "Tables and chairs"
  },
  {
    title: "Services",
    description: "Additional options"
  }
]

export function QuoteFormContainer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<QuoteRequestSchema>>({
    personalInfo: {},
    eventDetails: {},
    venueSelection: {},
    setupRequirements: {},
    additionalServices: {}
  })
  const { toast } = useToast()

  const handlePersonalInfoSubmit = (data: PersonalInfoSchema) => {
    setFormData(prev => ({ ...prev, personalInfo: data }))
    setCurrentStep(1)
  }

  const handleEventDetailsSubmit = (data: EventDetailsSchema) => {
    setFormData(prev => ({ ...prev, eventDetails: data }))
    setCurrentStep(2)
  }

  const handleVenueSelectionSubmit = (data: VenueSelectionSchema) => {
    setFormData(prev => ({ ...prev, venueSelection: data }))
    setCurrentStep(3)
  }

  const handleSetupRequirementsSubmit = (data: SetupRequirementsSchema) => {
    setFormData(prev => ({ ...prev, setupRequirements: data }))
    setCurrentStep(4)
  }

  const handleAdditionalServicesSubmit = async (data: AdditionalServicesSchema) => {
    const finalFormData = {
      ...formData,
      additionalServices: data
    }

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit quote request')
      }

      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your request and get back to you within 24 hours.",
      })

      // Reset form after successful submission
      setCurrentStep(0)
      setFormData({
        personalInfo: {},
        eventDetails: {},
        venueSelection: {},
        setupRequirements: {},
        additionalServices: {}
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <FormProgress currentStep={currentStep} steps={FORM_STEPS} />
      
      <div className="mt-8">
        {currentStep === 0 && (
          <PersonalInfoForm
            onNext={handlePersonalInfoSubmit}
            defaultValues={formData.personalInfo}
          />
        )}
        {currentStep === 1 && (
          <EventDetailsForm
            onNext={handleEventDetailsSubmit}
            onBack={handleBack}
            defaultValues={formData.eventDetails}
          />
        )}
        {currentStep === 2 && (
          <VenueSelectionForm
            onNext={handleVenueSelectionSubmit}
            onBack={handleBack}
            defaultValues={formData.venueSelection}
          />
        )}
        {currentStep === 3 && (
          <SetupRequirementsForm
            onNext={handleSetupRequirementsSubmit}
            onBack={handleBack}
            defaultValues={formData.setupRequirements}
          />
        )}
        {currentStep === 4 && (
          <AdditionalServicesForm
            onNext={handleAdditionalServicesSubmit}
            onBack={handleBack}
            defaultValues={formData.additionalServices}
          />
        )}
      </div>
    </div>
  )
}