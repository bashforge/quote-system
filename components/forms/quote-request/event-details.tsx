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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { eventDetailsSchema, type EventDetailsSchema } from "@/lib/schemas/quote-request"
import { DateTimePicker } from "@/components/ui/date-time-picker"

interface EventDetailsFormProps {
  onNext: (data: EventDetailsSchema) => void
  onBack: () => void
  defaultValues?: Partial<EventDetailsSchema>
}

export function EventDetailsForm({ onNext, onBack, defaultValues }: EventDetailsFormProps) {
  const form = useForm<EventDetailsSchema>({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: defaultValues || {
      earlyCheckIn: false,
      rentalType: "hourly",
      extraHours: 0,
    },
  })

  const watchEventType = form.watch("eventType")
  const watchEarlyCheckIn = form.watch("earlyCheckIn")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Annual Conference 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date & Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="earlyCheckIn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Early Check-in</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Do you need early access to set up?
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {watchEarlyCheckIn && (
          <FormField
            control={form.control}
            name="earlyCheckInTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Early Check-in Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rentalType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rental Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rental type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration ({form.getValues("rentalType") === "hourly" ? "Hours" : "Days"})</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wedding_reception">Wedding Reception</SelectItem>
                  <SelectItem value="wedding_ceremony">Wedding Ceremony</SelectItem>
                  <SelectItem value="standard_reception">Standard Reception</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="workshop">Workshop/Class</SelectItem>
                  <SelectItem value="banquet">Banquet</SelectItem>
                  <SelectItem value="buffet">Buffet</SelectItem>
                  <SelectItem value="dinner_dance">Dinner Dance</SelectItem>
                  <SelectItem value="concert">Concert</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchEventType === "other" && (
          <FormField
            control={form.control}
            name="eventTypeOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specify Event Type</FormLabel>
                <FormControl>
                  <Input placeholder="Please specify your event type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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