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
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Users, Calendar, Building2, BarChart3, Search } from "lucide-react"
import Image from "next/image"

// Mock data
const students = [
  { id: "1", name: "James Wilson", performance: "excellent", attendance: "90%", location: "North London" },
  { id: "2", name: "Sarah Thompson", performance: "good", attendance: "85%", location: "Central London" },
  { id: "3", name: "Michael Brown", performance: "excellent", attendance: "92%", location: "East London" },
  { id: "4", name: "Emma Davis", performance: "needs-improvement", attendance: "75%", location: "South London" },
  { id: "5", name: "David Miller", performance: "good", attendance: "88%", location: "West London" },
  { id: "6", name: "Olivia Garcia", performance: "excellent", attendance: "95%", location: "North London" },
  { id: "7", name: "Lucas Martinez", performance: "good", attendance: "83%", location: "Central London" },
  { id: "8", name: "Sophia Anderson", performance: "excellent", attendance: "91%", location: "East London" },
]

const performanceConfig = {
  excellent: { label: "On track", color: "bg-emerald-500/12 text-emerald-700" },
  good: { label: "Good", color: "bg-primary/15 text-primary" },
  "needs-improvement": { label: "Needs support", color: "bg-amber-500/12 text-amber-700" },
  poor: { label: "At risk", color: "bg-red-500/12 text-red-600" },
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <span className="text-sm font-medium">Students</span>
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
            <h1 className="text-2xl font-bold mb-1">Students</h1>
            <p className="text-sm text-muted-foreground">
              View and manage all enrolled students
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student, index) => (
              <Link
                key={student.id}
                href={`/students/${student.id}`}
                className="block bg-card border border-border rounded-lg p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 avatar-gradient-${(index % 6) + 1}`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1 truncate">
                      {student.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      📍 {student.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className="font-medium">{student.attendance}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        performanceConfig[student.performance as keyof typeof performanceConfig].color
                      }`}
                    >
                      {performanceConfig[student.performance as keyof typeof performanceConfig].label}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">
                No students found matching your search.
              </p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
