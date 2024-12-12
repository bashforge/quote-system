"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuotesTable } from "@/components/admin/quotes-table"
import { QuoteStats } from "@/components/admin/quote-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function QuotesDashboard() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quote Management</h1>
      </div>

      <QuoteStats />

      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Quotes</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="quoted">Quoted</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <QuotesTable status="all" />
            </TabsContent>
            <TabsContent value="pending">
              <QuotesTable status="pending" />
            </TabsContent>
            <TabsContent value="quoted">
              <QuotesTable status="quoted" />
            </TabsContent>
            <TabsContent value="accepted">
              <QuotesTable status="accepted" />
            </TabsContent>
            <TabsContent value="expired">
              <QuotesTable status="expired" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}