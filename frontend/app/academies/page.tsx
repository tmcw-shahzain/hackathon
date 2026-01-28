"use client"

import { useState } from "react"
import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Users, Calendar, Building2, BarChart3, Search } from "lucide-react"
import Image from "next/image"

// Mock data
const academies = [
  {
    id: "1",
    name: "Spring Football Academy",
    startDate: "Jan 15, 2026",
    endDate: "Mar 30, 2026",
    status: "IN PROGRESS" as const,
    studentCount: 24,
    location: "North London",
  },
  {
    id: "2",
    name: "Career Skills Workshop Series",
    startDate: "Feb 1, 2026",
    endDate: "Feb 28, 2026",
    status: "READY" as const,
    studentCount: 18,
    location: "Central London",
  },
  {
    id: "3",
    name: "Summer Sports Camp",
    startDate: "Jun 1, 2026",
    endDate: "Aug 31, 2026",
    status: "WAITING ILP" as const,
    studentCount: 30,
    location: "South London",
  },
  {
    id: "4",
    name: "Autumn Fitness Program",
    startDate: "Sep 1, 2026",
    endDate: "Nov 30, 2026",
    status: "WAITING ILP" as const,
    studentCount: 20,
    location: "East London",
  },
]

const statusConfig = {
  "IN PROGRESS": "bg-blue-100 text-blue-700 border-blue-200",
  "READY": "bg-green-100 text-green-700 border-green-200",
  "WAITING ILP": "bg-amber-100 text-amber-700 border-amber-200",
}

export default function AcademiesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAcademies = academies.filter((academy) =>
    academy.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            <Image
              src="/street-league-charcoal.webp"
              alt="Street League"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-base font-semibold text-sidebar-foreground">
              Street League
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { name: "Dashboard", icon: BarChart3, href: "/" },
                  { name: "Students", icon: Users, href: "/students" },
                  { name: "Timetable", icon: Calendar, href: "/timetable" },
                  { name: "Academies", icon: Building2, href: "/academies" },
                  { name: "Analytics", icon: BarChart3, href: "/analytics" },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <Icon className="size-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <SidebarTrigger className="-ml-2 size-8" />
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">Academies</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="size-9 ring-2 ring-border/20">
                <AvatarImage src="/avatar.webp" alt="Shahzain" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Academies</h1>
            <p className="text-sm text-muted-foreground">
              Manage and view all academy programs
            </p>
          </div>

          {/* Search and Create */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search academies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Link href="/academies/new">
              <Button className="gap-2">
                + Create New Academy
              </Button>
            </Link>
          </div>

          {/* Academy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAcademies.map((academy) => (
              <Link
                key={academy.id}
                href={`/academies/${academy.id}`}
                className="block bg-card border border-border rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1 truncate">
                      {academy.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {academy.startDate} - {academy.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      📍 {academy.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      👤 {academy.studentCount} students
                    </div>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wide ${
                      statusConfig[academy.status]
                    }`}
                  >
                    {academy.status}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredAcademies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">
                No academies found matching your search.
              </p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
