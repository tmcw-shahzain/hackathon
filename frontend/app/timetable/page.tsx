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
import { Users, Calendar, Building2, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Mock data
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]

const sessions = [
  {
    id: "1",
    day: "Monday",
    time: "09:00",
    duration: "90m",
    moduleName: "Football Fundamentals",
    location: "Field A",
    students: 8,
    instructor: "Shahzain",
  },
  {
    id: "2",
    day: "Monday",
    time: "11:00",
    duration: "60m",
    moduleName: "CV Writing Workshop",
    location: "Room B2",
    students: 6,
    instructor: "Shahzain",
  },
  {
    id: "3",
    day: "Monday",
    time: "14:00",
    duration: "75m",
    moduleName: "Fitness Training",
    location: "Gym",
    students: 12,
    instructor: "Shahzain",
  },
  {
    id: "4",
    day: "Monday",
    time: "16:00",
    duration: "60m",
    moduleName: "Interview Skills",
    location: "Room A1",
    students: 5,
    instructor: "Shahzain",
  },
  {
    id: "5",
    day: "Tuesday",
    time: "10:00",
    duration: "60m",
    moduleName: "Leadership Workshop",
    location: "Room C1",
    students: 10,
    instructor: "Shahzain",
  },
  {
    id: "6",
    day: "Tuesday",
    time: "14:00",
    duration: "90m",
    moduleName: "Football Training",
    location: "Field B",
    students: 15,
    instructor: "Shahzain",
  },
  {
    id: "7",
    day: "Wednesday",
    time: "09:00",
    duration: "60m",
    moduleName: "Team Building",
    location: "Main Hall",
    students: 20,
    instructor: "Shahzain",
  },
  {
    id: "8",
    day: "Wednesday",
    time: "13:00",
    duration: "90m",
    moduleName: "Skills Development",
    location: "Workshop Room",
    students: 8,
    instructor: "Shahzain",
  },
  {
    id: "9",
    day: "Thursday",
    time: "11:00",
    duration: "60m",
    moduleName: "Career Guidance",
    location: "Room A2",
    students: 7,
    instructor: "Shahzain",
  },
  {
    id: "10",
    day: "Thursday",
    time: "15:00",
    duration: "75m",
    moduleName: "Physical Training",
    location: "Gym",
    students: 12,
    instructor: "Shahzain",
  },
  {
    id: "11",
    day: "Friday",
    time: "10:00",
    duration: "60m",
    moduleName: "Presentation Skills",
    location: "Room B1",
    students: 9,
    instructor: "Shahzain",
  },
  {
    id: "12",
    day: "Friday",
    time: "14:00",
    duration: "90m",
    moduleName: "Match Practice",
    location: "Field A",
    students: 16,
    instructor: "Shahzain",
  },
]

export default function TimetablePage() {
  const [currentWeek, setCurrentWeek] = useState("Jan 27 - Jan 31, 2026")

  const getSessionsForDayAndTime = (day: string, time: string) => {
    return sessions.filter((s) => s.day === day && s.time === time)
  }

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
              <span className="text-sm font-medium">Timetable</span>
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
          {/* Header with Week Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Weekly Timetable</h1>
              <p className="text-sm text-muted-foreground">
                View and manage your weekly schedule
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronLeft className="size-4" />
                Previous Week
              </Button>
              <div className="px-4 py-2 bg-card border border-border rounded-lg">
                <span className="text-sm font-medium">{currentWeek}</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                Next Week
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-3 text-xs font-semibold text-muted-foreground w-24">
                      Time
                    </th>
                    {weekDays.map((day) => (
                      <th
                        key={day}
                        className="text-left p-3 text-xs font-semibold text-foreground min-w-[180px]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b border-border last:border-0">
                      <td className="p-3 text-sm font-medium text-muted-foreground align-top">
                        {time}
                      </td>
                      {weekDays.map((day) => {
                        const daySessions = getSessionsForDayAndTime(day, time)
                        return (
                          <td key={`${day}-${time}`} className="p-2 align-top">
                            {daySessions.length > 0 ? (
                              <div className="space-y-2">
                                {daySessions.map((session) => (
                                  <Link
                                    key={session.id}
                                    href={`/session/${session.id}`}
                                    className="block bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                                  >
                                    <div className="font-semibold text-xs mb-1 text-blue-900 dark:text-blue-100">
                                      {session.moduleName}
                                    </div>
                                    <div className="text-[10px] text-blue-700 dark:text-blue-300 space-y-0.5">
                                      <div>⏱️ {session.duration}</div>
                                      <div>📍 {session.location}</div>
                                      <div>👤 {session.students} students</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="h-full min-h-[60px]"></div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Total Sessions</div>
              <div className="text-2xl font-bold">{sessions.length}</div>
              <div className="text-xs text-muted-foreground mt-1">This week</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Total Students</div>
              <div className="text-2xl font-bold">
                {sessions.reduce((acc, s) => acc + s.students, 0)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Enrolled</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Busiest Day</div>
              <div className="text-2xl font-bold">Monday</div>
              <div className="text-xs text-muted-foreground mt-1">4 sessions</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Total Hours</div>
              <div className="text-2xl font-bold">14.5h</div>
              <div className="text-xs text-muted-foreground mt-1">This week</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
