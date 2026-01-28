"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { Users, Calendar, Building2, BarChart3, X, FileText, Plus, Wand2, MessageSquare } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// ILP Questions Array - can be edited/added/removed
const ILP_QUESTIONS = [
  {
    id: "q1",
    question: "What are your career goals and aspirations?",
    placeholder: "Describe your short-term and long-term career goals...",
  },
  {
    id: "q2",
    question: "What are your current strengths and skills?",
    placeholder: "List your key strengths, skills, and areas of expertise...",
  },
  {
    id: "q3",
    question: "What areas would you like to develop or improve?",
    placeholder: "Identify areas where you'd like to grow or learn more...",
  },
  {
    id: "q4",
    question: "What barriers or challenges do you face in achieving your goals?",
    placeholder: "Describe any obstacles, challenges, or support you might need...",
  },
  {
    id: "q5",
    question: "What motivates and interests you the most?",
    placeholder: "Share what drives you, your passions, and interests...",
  },
]

// Mock API function to fetch recommended workshops
async function fetchRecommendedWorkshops(ilpData: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hardcodedWorkshops = [
        { id: "w1", name: "Football Fundamentals", duration: 90, color: "primary" },
        { id: "w2", name: "CV Writing Workshop", duration: 60, color: "primary" },
        { id: "w3", name: "Interview Skills", duration: 75, color: "primary" },
        { id: "w4", name: "Leadership Development", duration: 90, color: "primary" },
        { id: "w5", name: "Fitness Training", duration: 60, color: "primary" },
        { id: "w6", name: "Career Guidance", duration: 75, color: "primary" },
        { id: "w7", name: "Team Building", duration: 60, color: "primary" },
        { id: "w8", name: "Public Speaking", duration: 90, color: "primary" },
      ]
      resolve(hardcodedWorkshops)
    }, 1000)
  })
}

interface Student {
  name: string
  ilpCompleted: boolean
  ilpAnswers: Record<string, string>
}

interface Workshop {
  id: string
  name: string
  duration: number
  color: string
}

interface TimeSlot {
  day: string
  time: string
  type: "free" | "reserved" | "workshop"
  workshop?: Workshop
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"]

// Pre-reserved time slots (teacher unavailable)
// ALL Friday slots are reserved
const RESERVED_SLOTS = [
  { day: "Monday", time: "12:00" },
  { day: "Tuesday", time: "13:30" },
  { day: "Wednesday", time: "12:00" },
  { day: "Thursday", time: "09:00" },
  { day: "Friday", time: "09:00" },
  { day: "Friday", time: "10:30" },
  { day: "Friday", time: "12:00" },
  { day: "Friday", time: "13:30" },
  { day: "Friday", time: "15:00" },
  { day: "Friday", time: "16:30" },
]

export default function NewAcademyPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"details" | "ilp" | "curriculum">("details")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    qualifications: "",
    startDate: "",
    endDate: "",
  })

  const [students, setStudents] = useState<Student[]>([])
  const [newStudentName, setNewStudentName] = useState("")

  // ILP Dialog state
  const [ilpDialogOpen, setIlpDialogOpen] = useState(false)
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number | null>(null)
  const [ilpAnswers, setIlpAnswers] = useState<Record<string, string>>({})

  // Curriculum state
  const [availableWorkshops, setAvailableWorkshops] = useState<Workshop[]>([])
  const [loadingWorkshops, setLoadingWorkshops] = useState(false)
  const [timetables, setTimetables] = useState<Record<number, Record<string, TimeSlot>>>({})
  const [currentWeek, setCurrentWeek] = useState(0)
  const [totalWeeks, setTotalWeeks] = useState(0)
  const [draggedWorkshop, setDraggedWorkshop] = useState<Workshop | null>(null)

  const handleAddStudent = () => {
    if (newStudentName.trim() && students.length < 12) {
      setStudents([
        ...students,
        { name: newStudentName.trim(), ilpCompleted: false, ilpAnswers: {} },
      ])
      setNewStudentName("")
    }
  }

  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index))
  }

  const openIlpDialog = (index: number) => {
    setSelectedStudentIndex(index)
    setIlpAnswers(students[index].ilpAnswers || {})
    setIlpDialogOpen(true)
  }

  const saveIlpAnswers = () => {
    if (selectedStudentIndex !== null) {
      const updatedStudents = [...students]
      updatedStudents[selectedStudentIndex] = {
        ...updatedStudents[selectedStudentIndex],
        ilpCompleted: true,
        ilpAnswers: ilpAnswers,
      }
      setStudents(updatedStudents)
      setIlpDialogOpen(false)
      setSelectedStudentIndex(null)
      setIlpAnswers({})
    }
  }

  const generateCurriculum = async () => {
    setLoadingWorkshops(true)
    try {
      const recommendedWorkshops = await fetchRecommendedWorkshops(students)
      setAvailableWorkshops(recommendedWorkshops as Workshop[])

      // Calculate total weeks from start and end dates
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate)
        const end = new Date(formData.endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
        setTotalWeeks(diffWeeks)

        // Initialize timetables for all weeks
        const initialTimetables: Record<number, Record<string, TimeSlot>> = {}
        for (let week = 0; week < diffWeeks; week++) {
          const weekTimetable: Record<string, TimeSlot> = {}
          weekDays.forEach(day => {
            timeSlots.forEach(time => {
              const key = `${day}-${time}`
              const isReserved = RESERVED_SLOTS.some(slot => slot.day === day && slot.time === time)
              weekTimetable[key] = {
                day,
                time,
                type: isReserved ? "reserved" : "free",
              }
            })
          })
          initialTimetables[week] = weekTimetable
        }
        setTimetables(initialTimetables)
        setCurrentWeek(0)
      }
    } catch (error) {
      console.error("Failed to fetch workshops:", error)
    } finally {
      setLoadingWorkshops(false)
    }
  }

  const handleDragStart = (workshop: Workshop) => {
    setDraggedWorkshop(workshop)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (day: string, time: string) => {
    if (!draggedWorkshop) return

    const key = `${day}-${time}`
    const currentTimetable = timetables[currentWeek]
    if (!currentTimetable) return

    const slot = currentTimetable[key]

    if (slot.type === "free") {
      setTimetables({
        ...timetables,
        [currentWeek]: {
          ...currentTimetable,
          [key]: {
            ...slot,
            type: "workshop",
            workshop: draggedWorkshop,
          },
        },
      })

      // Remove from available workshops
      setAvailableWorkshops(availableWorkshops.filter(w => w.id !== draggedWorkshop.id))
    }

    setDraggedWorkshop(null)
  }

  const handleRemoveWorkshop = (day: string, time: string) => {
    const key = `${day}-${time}`
    const currentTimetable = timetables[currentWeek]
    if (!currentTimetable) return

    const slot = currentTimetable[key]

    if (slot.workshop) {
      // Add back to available workshops
      setAvailableWorkshops([...availableWorkshops, slot.workshop])

      setTimetables({
        ...timetables,
        [currentWeek]: {
          ...currentTimetable,
          [key]: {
            ...slot,
            type: "free",
            workshop: undefined,
          },
        },
      })
    }
  }

  const autofillTimetable = () => {
    const currentTimetable = timetables[currentWeek]
    if (!currentTimetable) return

    const newTimetable = { ...currentTimetable }
    const workshopsToPlace = [...availableWorkshops]

    // Find all free slots
    const freeSlots = Object.entries(newTimetable)
      .filter(([_, slot]) => slot.type === "free")
      .map(([key, slot]) => ({ key, ...slot }))

    // Place workshops in free slots
    workshopsToPlace.forEach((workshop, index) => {
      if (freeSlots[index]) {
        const slot = freeSlots[index]
        newTimetable[slot.key] = {
          ...slot,
          type: "workshop",
          workshop,
        }
      }
    })

    setTimetables({
      ...timetables,
      [currentWeek]: newTimetable,
    })
    setAvailableWorkshops([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { formData, students, timetables })
    router.push("/academies")
  }

  const getSlotKey = (day: string, time: string) => `${day}-${time}`

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
                  { name: "AI Chat", icon: MessageSquare, href: "/chat" },
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
              <span className="text-sm font-medium">Create New</span>
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Create New Academy</h1>
              <p className="text-sm text-muted-foreground">
                Set up a new academy program with details and curriculum
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "details"
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("ilp")}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "ilp"
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ILP
                </button>
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "curriculum"
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Curriculum
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {activeTab === "details" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Academy Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter academy name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter location"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Qualifications
                    </label>
                    <textarea
                      value={formData.qualifications}
                      onChange={(e) =>
                        setFormData({ ...formData, qualifications: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                      placeholder="Enter qualifications and certifications"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Student Names (Maximum 12)
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddStudent()
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter student name"
                          disabled={students.length >= 12}
                        />
                        <Button
                          type="button"
                          onClick={handleAddStudent}
                          disabled={!newStudentName.trim() || students.length >= 12}
                          variant="outline"
                          className="shrink-0"
                        >
                          <Plus className="size-4 mr-1" />
                          Add
                        </Button>
                      </div>

                      {students.length >= 12 && (
                        <p className="text-xs text-amber-600">
                          Maximum of 12 students reached
                        </p>
                      )}

                      {students.length > 0 && (
                        <div className="border border-border rounded-lg divide-y divide-border">
                          {students.map((student, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
                            >
                              <span className="text-sm font-medium">{student.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveStudent(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="size-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ilp" && (
                <div className="space-y-6 max-w-2xl">
                  {students.length === 0 ? (
                    <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Please add students in the Details tab first
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Complete Individual Learning Plans for each student
                      </p>
                      <div className="border border-border rounded-lg divide-y divide-border">
                        {students.map((student, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm avatar-gradient-${(index % 6) + 1}`}>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {student.ilpCompleted ? (
                                    <span className="text-emerald-600">✓ ILP Completed</span>
                                  ) : (
                                    <span>ILP Not Started</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              onClick={() => openIlpDialog(index)}
                              variant="outline"
                              size="sm"
                            >
                              <FileText className="size-4 mr-1" />
                              {student.ilpCompleted ? "Edit ILP" : "Start ILP"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "curriculum" && (
                <div className="space-y-6">
                  {availableWorkshops.length === 0 ? (
                    <div className="space-y-4 max-w-2xl">
                      <p className="text-sm text-muted-foreground">
                        Generate a recommended curriculum based on student ILPs
                      </p>
                      <Button
                        type="button"
                        onClick={generateCurriculum}
                        disabled={loadingWorkshops || students.length === 0}
                        className="btn-primary-gold"
                      >
                        {loadingWorkshops ? "Generating..." : "Generate Curriculum"}
                      </Button>
                      {students.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Add students first to generate curriculum
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-6">
                      {/* Timetable */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h3 className="text-sm font-medium">Weekly Schedule</h3>
                            {totalWeeks > 1 && (
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                                  disabled={currentWeek === 0}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2"
                                >
                                  Previous
                                </Button>
                                <span className="text-xs text-muted-foreground px-2">
                                  Week {currentWeek + 1} of {totalWeeks}
                                </span>
                                <Button
                                  type="button"
                                  onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
                                  disabled={currentWeek === totalWeeks - 1}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2"
                                >
                                  Next
                                </Button>
                              </div>
                            )}
                          </div>
                          <Button
                            type="button"
                            onClick={autofillTimetable}
                            disabled={availableWorkshops.length === 0}
                            className="btn-primary-gold"
                            size="sm"
                          >
                            <Wand2 className="size-4 mr-1" />
                            Autofill
                          </Button>
                        </div>

                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-border bg-muted/50">
                                  <th className="text-left p-3 text-xs font-semibold text-muted-foreground w-20">
                                    Time
                                  </th>
                                  {weekDays.map((day) => (
                                    <th
                                      key={day}
                                      className="text-left p-3 text-xs font-semibold text-foreground min-w-[140px]"
                                    >
                                      {day}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {timeSlots.map((time) => {
                                  const currentTimetable = timetables[currentWeek] || {}
                                  return (
                                    <tr key={time} className="border-b border-border last:border-0">
                                      <td className="p-3 text-sm font-medium text-muted-foreground align-top">
                                        {time}
                                      </td>
                                      {weekDays.map((day) => {
                                        const slot = currentTimetable[getSlotKey(day, time)]
                                        return (
                                          <td
                                            key={`${day}-${time}`}
                                            className="p-2 align-top"
                                            onDragOver={handleDragOver}
                                            onDrop={() => handleDrop(day, time)}
                                          >
                                            {slot?.type === "reserved" ? (
                                              <div className="h-full min-h-[60px] bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                                                <span className="text-xs text-muted-foreground">Reserved</span>
                                              </div>
                                            ) : slot?.type === "workshop" && slot.workshop ? (
                                              <div className="block bg-primary/10 border border-primary/30 rounded-lg p-2.5 hover:shadow-md transition-all relative group">
                                                <button
                                                  type="button"
                                                  onClick={() => handleRemoveWorkshop(day, time)}
                                                  className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                  <X className="size-3" />
                                                </button>
                                                <div className="font-semibold text-xs mb-1 text-foreground">
                                                  {slot.workshop.name}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">
                                                  ⏱️ {slot.workshop.duration}m
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="h-full min-h-[60px] bg-muted/20 border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:bg-primary/5 hover:border-primary/30 transition-colors">
                                                <span className="text-xs text-muted-foreground">Drop here</span>
                                              </div>
                                            )}
                                          </td>
                                        )
                                      })}
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Available Workshops Sidebar */}
                      <div className="w-64 bg-card border border-border rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3">Available Workshops</h3>
                        <div className="space-y-2">
                          {availableWorkshops.map((workshop) => (
                            <div
                              key={workshop.id}
                              draggable
                              onDragStart={() => handleDragStart(workshop)}
                              className="bg-primary/10 border border-primary/30 rounded-lg p-3 cursor-move hover:shadow-md transition-all"
                            >
                              <div className="font-semibold text-xs mb-1 text-foreground">
                                {workshop.name}
                              </div>
                              <div className="text-[10px] text-muted-foreground">
                                ⏱️ {workshop.duration} minutes
                              </div>
                            </div>
                          ))}
                          {availableWorkshops.length === 0 && (
                            <p className="text-xs text-muted-foreground text-center py-4">
                              All workshops scheduled!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions - Only show Create Academy button on curriculum tab */}
              {activeTab === "curriculum" && (
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                  <Button type="submit" className="px-6 btn-primary-gold">
                    Create Academy
                  </Button>
                  <Link href="/academies">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="w-80 bg-card border-l border-border p-6">
            <h3 className="font-bold text-sm mb-4">Academy Setup Guide</h3>
            <div className="space-y-4 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">📋 Details</p>
                <p>Basic information about the academy including name, location, and students (max 12).</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">📝 ILP</p>
                <p>Individual Learning Plans for each student to track progress and goals.</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">📚 Curriculum</p>
                <p>Drag and drop workshops into the weekly schedule. Reserved slots are unavailable.</p>
              </div>
            </div>

            {/* Progress indicator */}
            {students.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs font-medium mb-3">Progress</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Students Added</span>
                    <span className="font-medium">{students.length}/12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ILPs Completed</span>
                    <span className="font-medium">
                      {students.filter(s => s.ilpCompleted).length}/{students.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Workshops</span>
                    <span className="font-medium">
                      {Object.values(timetables).reduce((total, weekTimetable) =>
                        total + Object.values(weekTimetable).filter(s => s.type === "workshop").length, 0
                      )} scheduled
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>

      {/* ILP Dialog */}
      <Dialog open={ilpDialogOpen} onOpenChange={setIlpDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Individual Learning Plan
              {selectedStudentIndex !== null && ` - ${students[selectedStudentIndex].name}`}
            </DialogTitle>
            <DialogDescription>
              Complete the questions below to create a personalized learning plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {ILP_QUESTIONS.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-medium mb-2">
                  {question.question}
                </label>
                <Textarea
                  value={ilpAnswers[question.id] || ""}
                  onChange={(e) =>
                    setIlpAnswers({ ...ilpAnswers, [question.id]: e.target.value })
                  }
                  placeholder={question.placeholder}
                  className="min-h-[100px] resize-y"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIlpDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={saveIlpAnswers}
              className="btn-primary-gold"
            >
              Save ILP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
