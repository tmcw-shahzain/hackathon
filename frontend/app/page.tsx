"use client"

import { useState } from "react"
import Image from "next/image"
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
import { LocationSelector } from "@/components/location-selector"
import {
  AbsenceDetailModal,
  type AbsenceDetail,
} from "@/components/absence-detail-modal"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Users, Calendar, Building2, BarChart3 } from "lucide-react"

// Mock data
const todaysSessions = [
  { id: "1", time: "09:00", moduleName: "Football Fundamentals", duration: "90m" },
  { id: "2", time: "11:00", moduleName: "CV Writing Workshop", duration: "60m" },
  { id: "3", time: "14:00", moduleName: "Fitness Training", duration: "75m" },
  { id: "4", time: "16:00", moduleName: "Interview Skills", duration: "60m" },
]

const pastSessions = [
  { id: "5", date: "Mon, Jan 27", time: "09:00", moduleName: "Football Fundamentals", duration: "90m" },
  { id: "6", date: "Mon, Jan 27", time: "11:00", moduleName: "CV Writing Workshop", duration: "60m" },
  { id: "7", date: "Fri, Jan 24", time: "14:00", moduleName: "Fitness Training", duration: "75m" },
  { id: "8", date: "Fri, Jan 24", time: "16:00", moduleName: "Interview Skills", duration: "60m" },
]

const students = [
  { id: "1", name: "James Wilson", performance: "excellent" as const },
  { id: "2", name: "Sarah Thompson", performance: "good" as const },
  { id: "3", name: "Michael Brown", performance: "excellent" as const },
  { id: "4", name: "Emma Davis", performance: "needs-improvement" as const },
  { id: "5", name: "David Miller", performance: "good" as const },
  { id: "6", name: "Olivia Garcia", performance: "poor" as const },
]

const absencesWithDetail: AbsenceDetail[] = [
  {
    studentName: "Emma Davis",
    sessionName: "Football Fundamentals",
    sessionTime: "09:00",
    isAccredited: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    studentName: "Olivia Garcia",
    sessionName: "CV Writing Workshop",
    sessionTime: "11:00",
    isAccredited: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    studentName: "Michael Brown",
    sessionName: "Fitness Training",
    sessionTime: "14:00",
    isAccredited: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
]

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false)
  const [selectedAbsence, setSelectedAbsence] = useState<AbsenceDetail | null>(null)

  const openAbsenceModal = (absence: AbsenceDetail) => {
    setSelectedAbsence(absence)
    setAbsenceModalOpen(true)
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
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Hello, Shahzain
              </h1>
              <p className="text-xs text-muted-foreground/70">
                {selectedLocation
                  ? `${todaysSessions.length} workshops today`
                  : "Select a location to view your dashboard"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedLocation && (
                <div className="flex items-center gap-2 rounded-lg badge-location px-3 py-1.5">
                  <span className="text-sm font-medium">
                    {selectedLocation}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLocation("")}
                    className="h-6 px-2 text-xs text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Change
                  </Button>
                </div>
              )}
              <Avatar size="lg" className="size-9 ring-2 ring-border/20">
                <AvatarImage src="/avatar.webp" alt="Shahzain" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {!selectedLocation ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="w-full max-w-lg space-y-6 text-center animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Select a Location
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                  Choose your location to view workshops, students, and analytics
                </p>
              </div>
              <div className="flex justify-center">
                <LocationSelector
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1">
            {/* Main Dashboard Area */}
            <div className="flex-1 overflow-hidden p-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="text-[10px] font-medium text-muted-foreground mb-1">Today's Sessions</div>
                  <div className="text-2xl font-bold mb-0.5">{todaysSessions.length}</div>
                  <div className="text-[10px] font-semibold text-green-600">Same as usual</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="text-[10px] font-medium text-muted-foreground mb-1">Total Students</div>
                  <div className="text-2xl font-bold mb-0.5">{students.length}</div>
                  <div className="text-[10px] font-semibold text-green-600">+3 this week</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="text-[10px] font-medium text-muted-foreground mb-1">Attendance Rate</div>
                  <div className="text-2xl font-bold mb-0.5">94%</div>
                  <div className="text-[10px] font-semibold text-green-600">+2.3%</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="text-[10px] font-medium text-muted-foreground mb-1">Absences Today</div>
                  <div className="text-2xl font-bold mb-0.5">{absencesWithDetail.length}</div>
                  <div className="text-[10px] font-semibold text-red-600">+1 from avg</div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-[1fr_300px] gap-4 mb-4">
                {/* Today's Sessions */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                    <h2 className="text-base font-bold">Today&apos;s Sessions</h2>
                    <Link href="/timetable" className="text-xs font-medium text-primary hover:opacity-80">
                      View Timetable →
                    </Link>
                  </div>
                  <div className="p-3 space-y-2">
                    {todaysSessions.map((session, index) => (
                      <Link
                        key={session.id}
                        href={`/session/${session.id}`}
                        className="block bg-muted/50 rounded-lg p-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-center w-16 shrink-0">
                            <div className="text-lg font-bold leading-none mb-0.5">{session.time}</div>
                            <div className="text-[10px] text-muted-foreground font-medium">{session.duration}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm mb-1">{session.moduleName}</h3>
                            <div className="flex gap-2 text-[10px] text-muted-foreground">
                              <span>👤 8 students</span>
                              <span>📍 Field A</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wide mb-1 ${
                              index === 0
                                ? 'bg-primary/15 border border-primary text-primary'
                                : 'bg-muted-foreground/10 border border-muted-foreground text-muted-foreground'
                            }`}>
                              {index === 0 ? 'In Progress' : 'Upcoming'}
                            </div>
                            <div className="text-[10px] text-muted-foreground font-medium">8/8 present</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Past Sessions */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                    <h2 className="text-base font-bold">Past Sessions</h2>
                    <Link href="/timetable?past=1" className="text-xs font-medium text-primary hover:opacity-80">
                      View All →
                    </Link>
                  </div>
                  <div className="p-3">
                    {pastSessions.slice(0, 2).map((session) => (
                      <Link
                        key={session.id}
                        href={`/session/${session.id}`}
                        className="block py-2.5 border-b border-border last:border-0 hover:bg-muted/30 rounded transition-colors"
                      >
                        <div className="font-semibold text-xs mb-0.5">{session.moduleName}</div>
                        <div className="text-[10px] text-muted-foreground">{session.date} • {session.duration} • 8 students</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-[2fr_1fr] gap-4">
                {/* Absences */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                    <h2 className="text-base font-bold">Today&apos;s Absences</h2>
                    <a href="#" className="text-xs font-medium text-primary hover:opacity-80">
                      Manage →
                    </a>
                  </div>
                  <div className="p-3">
                    {absencesWithDetail.map((absence, index) => (
                      <div key={index} className="py-2 border-b border-border last:border-0 cursor-pointer" onClick={() => openAbsenceModal(absence)}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-xs">{absence.studentName}</span>
                          <span className="text-[10px] text-muted-foreground">Notified</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">Missed: {absence.sessionName}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="border-b border-border px-4 py-2.5">
                    <h2 className="text-base font-bold">Tasks</h2>
                  </div>
                  <div className="p-3 space-y-2">
                    <Link
                      href="/students/1"
                      className="block p-3 bg-amber-50 border border-amber-200 rounded-lg hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          JW
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-amber-900 mb-1">
                            ILP Update Required
                          </p>
                          <p className="text-[10px] text-amber-700">
                            James Wilson's Individual Learning Plan needs updating. Last updated 3 months ago.
                          </p>
                        </div>
                      </div>
                    </Link>

                    <button className="w-full p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">+ Add New Task</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Sidebar */}
            <div className="w-72 bg-card border-l border-border flex flex-col overflow-hidden">
              <div className="p-4 pb-3 border-b border-border">
                <h2 className="text-base font-bold mb-3">Active Students</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-8 pr-2 py-2 bg-muted border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {students.map((student, index) => (
                  <Link
                    key={student.id}
                    href={`/students/${student.id}`}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted transition-colors mb-1.5 group"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 relative avatar-gradient-${(index % 6) + 1}`}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs mb-0.5">{student.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {student.performance === 'excellent' && 'On track • 90% attendance'}
                        {student.performance === 'good' && 'Good • 85% attendance'}
                        {student.performance === 'needs-improvement' && 'Needs attention • 75%'}
                        {student.performance === 'poor' && 'At risk • 65% attendance'}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground text-sm">→</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <AbsenceDetailModal
          open={absenceModalOpen}
          onOpenChange={setAbsenceModalOpen}
          absence={selectedAbsence}
          onReschedule={() => {
            // TODO: reschedule flow
            setAbsenceModalOpen(false)
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
