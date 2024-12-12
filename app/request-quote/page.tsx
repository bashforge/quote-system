import { QuoteFormContainer } from "@/components/forms/quote-request/quote-form-container"

export default function RequestQuote() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Request a Quote</h1>
          <p className="text-muted-foreground mb-12 text-center">
            Fill out the form below to request a quote for your event. We&apos;ll get back to you within 24 hours.
          </p>
          <QuoteFormContainer />
        </div>
      </div>
    </div>
  )
}