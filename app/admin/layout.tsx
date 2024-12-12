"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background p-8">
        {children}
      </main>
    </div>
  )
}