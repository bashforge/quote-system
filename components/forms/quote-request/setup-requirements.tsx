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
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { setupRequirementsSchema, type SetupRequirementsSchema } from "@/lib/schemas/quote-request"

interface SetupRequirementsFormProps {
  onNext: (data: SetupRequirementsSchema) => void
  onBack: () => void
  defaultValues?: Partial<SetupRequirementsSchema>
}

export function SetupRequirementsForm({ onNext, onBack, defaultValues }: SetupRequirementsFormProps) {
  const form = useForm<SetupRequirementsSchema>({
    resolver: zodResolver(setupRequirementsSchema),
    defaultValues: {
      tables: {
        count: 0,
        needLinens: false,
        needSetupHelp: false,
      },
      chairs: {
        count: 0,
        needSetupHelp: false,
      },
      setupChange: false,
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tables Setup</CardTitle>
            <CardDescription>
              Specify your table requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="tables.count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Tables</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tables.needLinens"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Table Linens</FormLabel>
                    <FormDescription>
                      Additional fee will apply for table linens
                    </FormDescription>
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

            <FormField
              control={form.control}
              name="tables.needSetupHelp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Setup Assistance</FormLabel>
                    <FormDescription>
                      Need help with table setup and removal?
                    </FormDescription>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chairs Setup</CardTitle>
            <CardDescription>
              Specify your chair requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="chairs.count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Chairs</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chairs.needSetupHelp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Setup Assistance</FormLabel>
                    <FormDescription>
                      Need help with chair setup and removal?
                    </FormDescription>
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
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="setupChange"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Setup Change Required</FormLabel>
                <FormDescription>
                  Will your event require a change in setup? (e.g., transitioning from ceremony to reception)
                </FormDescription>
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