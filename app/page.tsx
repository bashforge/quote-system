import { Button } from "@/components/ui/button"
import { FeaturesGrid } from "@/components/features-grid"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your Perfect Event Starts Here
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Get an instant quote for your next event. From weddings to corporate gatherings,
            we've got you covered.
          </p>
          <Button size="lg" className="mb-12" asChild>
            <Link href="/request-quote">
              Request a Quote
            </Link>
          </Button>
          <FeaturesGrid />
        </div>
      </main>
    </div>
  )
}