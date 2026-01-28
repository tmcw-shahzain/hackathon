"use client"

import { useState } from "react"
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
import { Users, Calendar, Building2, BarChart3, MapPin } from "lucide-react"
import Image from "next/image"
import {
  AbsenceDetailModal,
  type AbsenceDetail,
} from "@/components/absence-detail-modal"

// Mock data
const studentData = {
  "1": {
    name: "James Wilson",
    location: "North London",
    attendance: "90%",
    performance: "excellent",
    learningPlan: "Focus on advanced football techniques and leadership skills. Develop tactical understanding and improve communication on the field.",
    notes: "James shows exceptional dedication and natural leadership qualities. Recommend for team captain role. Needs to work on managing frustration during challenging drills.",
  },
  "2": {
    name: "Sarah Thompson",
    location: "Central London",
    attendance: "85%",
    performance: "good",
    learningPlan: "Strengthen CV writing skills and interview preparation. Build confidence in professional communication.",
    notes: "Sarah is making steady progress in career skills workshops. She's particularly strong in written communication but needs more practice with verbal presentations.",
  },
}

const modules = [
  { id: "1", name: "Football Fundamentals", status: "engaged", date: "Jan 27" },
  { id: "2", name: "CV Writing Workshop", status: "missed", date: "Jan 26" },
  { id: "3", name: "Fitness Training", status: "engaged", date: "Jan 25" },
  { id: "4", name: "Interview Skills", status: "engaged", date: "Jan 24" },
  { id: "5", name: "Leadership Workshop", status: "missed", date: "Jan 23" },
]

export default function StudentDetailPage() {
  const params = useParams()
  const studentId = params.id as string
  const student = studentData[studentId as keyof typeof studentData] || studentData["1"]

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<AbsenceDetail | null>(null)

  const openModuleModal = (module: typeof modules[0]) => {
    if (module.status === "missed") {
      setSelectedModule({
        studentName: student.name,
        sessionName: module.name,
        date: module.date,
        reason: "No reason provided",
        contactAttempts: 1,
        notes: "Student did not attend this session.",
      })
      setModalOpen(true)
    }
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
              <Link href="/students" className="text-sm text-muted-foreground hover:text-foreground">
                Students
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">Student Details</span>
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
            {/* Student Header */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full avatar-gradient-1 flex items-center justify-center text-white font-bold text-xl">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{student.name}</h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="size-3" />
                    {student.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-4">
              {/* Learning Plan */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-base font-bold mb-3">Learning Plan</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {student.learningPlan}
                </p>
              </div>

              {/* Notes */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-base font-bold mb-3">Notes from Assessment</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {student.notes}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-card border-l border-border flex flex-col overflow-hidden p-4">
            {/* User Card */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full avatar-gradient-1 flex items-center justify-center text-white font-bold text-base">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">{student.location}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-medium">{student.attendance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Performance</span>
                  <span className="font-medium capitalize">{student.performance}</span>
                </div>
              </div>
            </div>

            {/* Modules */}
            <div className="flex-1 overflow-auto space-y-2">
              <h3 className="text-sm font-bold mb-2">Module Engagement</h3>
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => openModuleModal(module)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    module.status === "missed"
                      ? "bg-red-50 border-red-200 hover:bg-red-100"
                      : "bg-amber-50 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {module.date}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        module.status === "missed"
                          ? "bg-red-600 text-white"
                          : "bg-amber-600 text-white"
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{module.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AbsenceDetailModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          absence={selectedModule}
          onReschedule={() => {
            setModalOpen(false)
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
