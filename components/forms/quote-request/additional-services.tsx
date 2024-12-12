"use client"

import { useFieldArray, useForm } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { additionalServicesSchema, type AdditionalServicesSchema } from "@/lib/schemas/quote-request"

interface AdditionalServicesFormProps {
  onNext: (data: AdditionalServicesSchema) => void
  onBack: () => void
  defaultValues?: Partial<AdditionalServicesSchema>
}

export function AdditionalServicesForm({ onNext, onBack, defaultValues }: AdditionalServicesFormProps) {
  const form = useForm<AdditionalServicesSchema>({
    resolver: zodResolver(additionalServicesSchema),
    defaultValues: {
      soundSystem: false,
      wirelessMicrophone: false,
      ledWall: false,
      ledScreen: false,
      foodAndDrinks: false,
      vendors: [],
      ...defaultValues,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "vendors",
  })

  const watchFoodAndDrinks = form.watch("foodAndDrinks")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Audio/Visual Equipment</CardTitle>
            <CardDescription>
              Select the equipment you need for your event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="soundSystem"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Sound System</FormLabel>
                    <FormDescription>
                      Professional audio system for music and announcements
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
              name="wirelessMicrophone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Wireless Microphone</FormLabel>
                    <FormDescription>
                      Wireless microphone for speeches and presentations
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
              name="ledWall"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">LED Wall</FormLabel>
                    <FormDescription>
                      Large LED wall for stunning visual displays
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
              name="ledScreen"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">LED Screen</FormLabel>
                    <FormDescription>
                      Standard LED screen for presentations
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
            <CardTitle>Food and Beverages</CardTitle>
            <CardDescription>
              Provide information about catering services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="foodAndDrinks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Food and Drinks Service</FormLabel>
                    <FormDescription>
                      Will you be serving food and drinks at the event?
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

            {watchFoodAndDrinks && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Vendors</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "", phone: "", email: "", type: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vendor
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">Vendor {index + 1}</h5>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`vendors.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vendor Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`vendors.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vendor Type</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Catering, Beverages" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`vendors.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`vendors.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="pointOfContact"
              render={({ field }) => (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h5 className="font-medium">Event Point of Contact</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pointOfContact.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pointOfContact.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pointOfContact.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional requirements or special arrangements needed for your event..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Previous Step
          </Button>
          <Button type="submit">Submit Quote Request</Button>
        </div>
      </form>
    </Form>
  )
}