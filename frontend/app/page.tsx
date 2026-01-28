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
import { SessionCard } from "@/components/session-card"
import { StudentCard } from "@/components/student-card"
import { AbsenceCard } from "@/components/absence-card"
import {
  AbsenceDetailModal,
  type AbsenceDetail,
} from "@/components/absence-detail-modal"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, ArrowRight, Users, Calendar, Building2, BarChart3 } from "lucide-react"

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
  const [studentSearch, setStudentSearch] = useState("")
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false)
  const [selectedAbsence, setSelectedAbsence] = useState<AbsenceDetail | null>(null)

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase())
  )

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
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 md:px-6">
          <SidebarTrigger className="-ml-1 size-8" />
          <div className="flex flex-1 items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                Hello, Shahzain
              </h1>
              <p className="text-xs text-muted-foreground md:text-sm">
                {selectedLocation
                  ? `You have ${todaysSessions.length} workshops today`
                  : "Select a location to view your dashboard"}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {selectedLocation && (
                <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5">
                  <span className="text-sm font-medium text-foreground">
                    {selectedLocation}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLocation("")}
                    className="h-7 px-2 text-xs"
                  >
                    Change
                  </Button>
                </div>
              )}
              <Avatar size="lg" className="size-9">
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
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 md:p-4 animate-fade-in">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:grid-rows-3 md:gap-3 md:auto-rows-fr">
              <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm md:row-span-3">
                <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/30 px-3 py-2">
                  <Link href="/timetable" className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground">
                      Today&apos;s Sessions
                    </h2>
                  </Link>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-xs" asChild>
                    <Link href="/timetable">
                      View timetable
                      <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                </div>
                <div className="flex min-h-0 flex-1 overflow-auto px-3 py-3">
                  <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:grid-rows-2">
                    {todaysSessions.map((session) => (
                      <Link
                        key={session.id}
                        href={`/timetable?session=${session.id}`}
                        className="block min-h-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      >
                        <SessionCard
                          time={session.time}
                          moduleName={session.moduleName}
                          duration={session.duration}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <div className="shrink-0 border-b border-border bg-muted/30 px-3 py-2">
                  <Link href="/students" className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
                    <h2 className="mb-1.5 text-sm font-semibold tracking-tight text-foreground">
                      Students
                    </h2>
                  </Link>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="h-8 bg-background pl-8 text-xs"
                    />
                  </div>
                </div>
                <div className="flex min-h-0 flex-1 overflow-auto px-3 py-2.5">
                  <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:grid-rows-3">
                    {filteredStudents.map((student) => (
                      <Link
                        key={student.id}
                        href={`/students/${student.id}`}
                        className="block min-h-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      >
                        <StudentCard
                          name={student.name}
                          performance={student.performance}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <div className="shrink-0 border-b border-border bg-muted/30 px-3 py-2">
                  <Link href="/timetable?past=1" className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground">
                      Past Sessions
                    </h2>
                  </Link>
                </div>
                <div className="flex min-h-0 flex-1 overflow-auto px-3 py-2.5">
                  <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:grid-rows-2">
                    {pastSessions.slice(0, 4).map((session) => (
                      <Link
                        key={session.id}
                        href={`/timetable?session=${session.id}`}
                        className="block min-h-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                      >
                        <SessionCard
                          date={session.date}
                          time={session.time}
                          moduleName={session.moduleName}
                          duration={session.duration}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <div className="shrink-0 border-b border-border bg-muted/30 px-3 py-2">
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Absences
                  </h2>
                </div>
                <div className="flex min-h-0 flex-1 overflow-auto px-3 py-2.5">
                  <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 sm:grid-rows-3">
                    {absencesWithDetail.map((absence, index) => (
                      <AbsenceCard
                        key={index}
                        studentName={absence.studentName}
                        sessionName={absence.sessionName}
                        onClick={() => openAbsenceModal(absence)}
                      />
                    ))}
                  </div>
                </div>
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
