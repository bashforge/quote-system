"use client"

import { cn } from "@/lib/utils"

interface FormProgressProps {
  currentStep: number
  steps: Array<{
    title: string
    description: string
  }>
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs text-muted-foreground">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}