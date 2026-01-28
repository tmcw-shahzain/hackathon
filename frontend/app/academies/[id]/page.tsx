"use client"

import { useParams } from "next/navigation"
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
import { Users, Calendar, Building2, BarChart3, MapPin, CalendarDays } from "lucide-react"
import Image from "next/image"

// Mock data
const academyData = {
  "1": {
    name: "Spring Football Academy",
    startDate: "January 15, 2026",
    endDate: "March 30, 2026",
    status: "IN PROGRESS" as const,
    location: "North London Sports Complex",
    qualifications: "FA Level 1 Coaching Certificate, First Aid Certified",
    description: "A comprehensive football training program focused on developing fundamental skills, tactical awareness, and physical fitness for youth athletes aged 14-18.",
    studentCount: 24,
    students: [
      { id: "1", name: "James Wilson", performance: "excellent" },
      { id: "2", name: "Sarah Thompson", performance: "good" },
      { id: "3", name: "Michael Brown", performance: "excellent" },
      { id: "4", name: "Emma Davis", performance: "needs-improvement" },
      { id: "5", name: "David Miller", performance: "good" },
      { id: "6", name: "Olivia Garcia", performance: "excellent" },
    ],
  },
  "2": {
    name: "Career Skills Workshop Series",
    startDate: "February 1, 2026",
    endDate: "February 28, 2026",
    status: "READY" as const,
    location: "Central London Training Center",
    qualifications: "Career Coaching Certification, NVQ Level 3 in Employability",
    description: "Intensive career development program covering CV writing, interview skills, professional communication, and workplace readiness.",
    studentCount: 18,
    students: [
      { id: "1", name: "James Wilson", performance: "excellent" },
      { id: "2", name: "Sarah Thompson", performance: "good" },
      { id: "3", name: "Michael Brown", performance: "excellent" },
    ],
  },
}

const statusConfig = {
  "IN PROGRESS": "bg-blue-100 text-blue-700 border-blue-200",
  "READY": "bg-green-100 text-green-700 border-green-200",
  "WAITING ILP": "bg-amber-100 text-amber-700 border-amber-200",
}

export default function AcademyDetailPage() {
  const params = useParams()
  const academyId = params.id as string
  const academy = academyData[academyId as keyof typeof academyData] || academyData["1"]

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
              <Link href="/academies" className="text-sm text-muted-foreground hover:text-foreground">
                Academies
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">Academy Details</span>
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
          <div className="flex-1 overflow-auto p-6">
            {/* Academy Header */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold">{academy.name}</h1>
                    <div
                      className={`px-2.5 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wide ${
                        statusConfig[academy.status]
                      }`}
                    >
                      {academy.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      {academy.startDate} - {academy.endDate}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      {academy.location}
                    </span>
                  </div>
                </div>
                <Button className="gap-2">
                  Edit Academy
                </Button>
              </div>

              <div className="space-y-6">
                {/* Description Section */}
                <div>
                  <h2 className="text-base font-bold mb-2">Description</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {academy.description}
                  </p>
                </div>

                {/* Academy Details */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Duration</div>
                    <div className="text-sm font-medium">
                      {academy.startDate} - {academy.endDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Total Students</div>
                    <div className="text-sm font-medium">{academy.studentCount} enrolled</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Qualifications</div>
                    <div className="text-sm font-medium">{academy.qualifications}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Students</div>
                <div className="text-2xl font-bold">{academy.studentCount}</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Attendance Rate</div>
                <div className="text-2xl font-bold">92%</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Completion Rate</div>
                <div className="text-2xl font-bold">85%</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Sessions</div>
                <div className="text-2xl font-bold">24</div>
              </div>
            </div>
          </div>

          {/* Students Sidebar */}
          <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden">
            <div className="p-4 pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Students</h2>
                <span className="text-xs text-muted-foreground">
                  {academy.studentCount} enrolled
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {academy.students.map((student) => (
                <Link
                  key={student.id}
                  href={`/students/${student.id}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted transition-colors mb-1.5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-0.5">{student.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {student.performance === 'excellent' && 'On track • 90% attendance'}
                      {student.performance === 'good' && 'Good • 85% attendance'}
                      {student.performance === 'needs-improvement' && 'Needs attention • 75%'}
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
