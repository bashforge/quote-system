import { Calendar, Clock, Users, Sparkles } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Flexible Dates",
    description: "Choose from our available dates"
  },
  {
    icon: Users,
    title: "Any Group Size",
    description: "From intimate gatherings to large events"
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Get your quote within 24 hours"
  },
  {
    icon: Sparkles,
    title: "Custom Options",
    description: "Tailor the event to your needs"
  }
]

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      {features.map((feature, index) => (
        <div key={index} className="p-6 bg-card rounded-lg shadow-lg">
          <feature.icon className="w-12 h-12 mb-4 mx-auto text-primary" />
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}