"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { Users, Calendar, Building2, BarChart3, Download, Clock, MapPin } from "lucide-react"
import Image from "next/image"

// Mock data - in real app this would come from API based on session ID
const sessionData = {
  "1": {
    time: "09:00",
    duration: "90m",
    moduleName: "Football Fundamentals",
    location: "Field A",
    date: "Monday, January 27, 2026",
    instructor: "Shahzain",
    description: "Introduction to football basics including passing, dribbling, and basic tactics. Focus on building fundamental skills and teamwork.",
    totalStudents: 8,
    present: 8,
    absent: 0,
    status: "In Progress"
  },
  "2": {
    time: "11:00",
    duration: "60m",
    moduleName: "CV Writing Workshop",
    location: "Room B2",
    date: "Monday, January 27, 2026",
    instructor: "Shahzain",
    description: "Learn how to write an effective CV that stands out to employers. Cover formatting, content structure, and best practices.",
    totalStudents: 6,
    present: 5,
    absent: 1,
    status: "Upcoming"
  },
  "3": {
    time: "14:00",
    duration: "75m",
    moduleName: "Fitness Training",
    location: "Gym",
    date: "Monday, January 27, 2026",
    instructor: "Shahzain",
    description: "Physical fitness session focused on strength, endurance, and flexibility. Includes warm-up, circuit training, and cool-down.",
    totalStudents: 12,
    present: 12,
    absent: 0,
    status: "Upcoming"
  },
  "4": {
    time: "16:00",
    duration: "60m",
    moduleName: "Interview Skills",
    location: "Room A1",
    date: "Monday, January 27, 2026",
    instructor: "Shahzain",
    description: "Develop confidence and skills for job interviews. Practice common questions, body language, and professional communication.",
    totalStudents: 5,
    present: 5,
    absent: 0,
    status: "Upcoming"
  }
}

const students = [
  { id: "1", name: "James Wilson", performance: "excellent", avatar: "/avatar.webp" },
  { id: "2", name: "Sarah Thompson", performance: "good", avatar: "/avatar.webp" },
  { id: "3", name: "Michael Brown", performance: "excellent", avatar: "/avatar.webp" },
  { id: "4", name: "Emma Davis", performance: "needs-improvement", avatar: "/avatar.webp" },
  { id: "5", name: "David Miller", performance: "good", avatar: "/avatar.webp" },
  { id: "6", name: "Olivia Garcia", performance: "excellent", avatar: "/avatar.webp" },
  { id: "7", name: "Lucas Martinez", performance: "good", avatar: "/avatar.webp" },
  { id: "8", name: "Sophia Anderson", performance: "excellent", avatar: "/avatar.webp" },
]

export default function SessionPage() {
  const params = useParams()
  const sessionId = params.id as string
  const session = sessionData[sessionId as keyof typeof sessionData] || sessionData["1"]

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
              <span className="text-sm font-medium">Session Details</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="size-9 ring-2 ring-border/20">
                <AvatarImage src="/avatar.webp" alt="Shahzain" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Main Content */}
          <div className="flex-1 overflow-hidden p-4">
            {/* Session Header */}
            <div className="bg-card border border-border rounded-xl p-6 mb-4">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-3">{session.moduleName}</h1>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="size-4" />
                      {session.time} • {session.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      {session.location}
                    </span>
                    <span>{session.date}</span>
                  </div>
                </div>
                <Button className="gap-2">
                  <Download className="size-4" />
                  Download Presentation
                </Button>
              </div>

              <div className="space-y-6">
                {/* Summary Section */}
                <div>
                  <h2 className="text-base font-bold mb-2">Summary</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {session.description}
                  </p>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Duration</div>
                    <div className="text-sm font-medium">{session.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Total Students</div>
                    <div className="text-sm font-medium">{session.totalStudents} enrolled</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Instructor</div>
                    <div className="text-sm font-medium">{session.instructor}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Students Sidebar */}
          <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden">
            <div className="p-4 pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Students</h2>
                <span className="text-xs text-muted-foreground">
                  {session.totalStudents} enrolled
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {students.slice(0, session.totalStudents).map((student, index) => (
                <Link
                  key={student.id}
                  href={`/students/${student.id}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors mb-1.5 group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 avatar-gradient-${(index % 6) + 1}`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-0.5">{student.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {student.performance === 'excellent' && 'On track • 90% attendance'}
                      {student.performance === 'good' && 'Good • 85% attendance'}
                      {student.performance === 'needs-improvement' && 'Needs attention • 75%'}
                      {student.performance === 'poor' && 'At risk • 65% attendance'}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
