"use client"

import { useState } from "react"
import Link from "next/link"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { Users, Calendar, Building2, BarChart3 } from "lucide-react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for attendance over time
const attendanceData = [
  { date: "2024-01-01", present: 45, absent: 5 },
  { date: "2024-01-02", present: 48, absent: 2 },
  { date: "2024-01-03", present: 42, absent: 8 },
  { date: "2024-01-04", present: 47, absent: 3 },
  { date: "2024-01-05", present: 50, absent: 0 },
  { date: "2024-01-08", present: 46, absent: 4 },
  { date: "2024-01-09", present: 49, absent: 1 },
  { date: "2024-01-10", present: 44, absent: 6 },
  { date: "2024-01-11", present: 48, absent: 2 },
  { date: "2024-01-12", present: 47, absent: 3 },
  { date: "2024-01-15", present: 50, absent: 0 },
  { date: "2024-01-16", present: 45, absent: 5 },
  { date: "2024-01-17", present: 48, absent: 2 },
  { date: "2024-01-18", present: 49, absent: 1 },
  { date: "2024-01-19", present: 46, absent: 4 },
  { date: "2024-01-22", present: 47, absent: 3 },
  { date: "2024-01-23", present: 50, absent: 0 },
  { date: "2024-01-24", present: 48, absent: 2 },
  { date: "2024-01-25", present: 45, absent: 5 },
  { date: "2024-01-26", present: 49, absent: 1 },
]

// Mock data for session participation
const sessionParticipationData = [
  { session: "Football", students: 24 },
  { session: "CV Writing", students: 18 },
  { session: "Fitness", students: 30 },
  { session: "Interview Skills", students: 15 },
  { session: "Leadership", students: 22 },
  { session: "Career Guidance", students: 19 },
]

// Mock data for enrollment trends
const enrollmentData = [
  { month: "Jan", total: 45 },
  { month: "Feb", total: 52 },
  { month: "Mar", total: 48 },
  { month: "Apr", total: 60 },
  { month: "May", total: 58 },
  { month: "Jun", total: 65 },
]

const attendanceChartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const sessionChartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const enrollmentChartConfig = {
  total: {
    label: "Total Enrolled",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

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
              <span className="text-sm font-medium">Analytics</span>
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
            <h1 className="text-2xl font-bold mb-1">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Track performance and insights across your programs
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Average Attendance</div>
              <div className="text-2xl font-bold">94%</div>
              <div className="text-xs text-green-600 mt-1">+2.3% from last month</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Total Sessions</div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-xs text-green-600 mt-1">+12 this month</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Active Students</div>
              <div className="text-2xl font-bold">65</div>
              <div className="text-xs text-green-600 mt-1">+8 this month</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Completion Rate</div>
              <div className="text-2xl font-bold">87%</div>
              <div className="text-xs text-green-600 mt-1">+5% from last month</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Attendance Over Time Chart */}
            <Card>
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>
                    Daily attendance rates over the last 30 days
                  </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger
                    className="w-[160px] rounded-lg"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="Last 30 days" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="90d" className="rounded-lg">
                      Last 3 months
                    </SelectItem>
                    <SelectItem value="30d" className="rounded-lg">
                      Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-lg">
                      Last 7 days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                  config={attendanceChartConfig}
                  className="aspect-auto h-[300px] w-full"
                >
                  <AreaChart data={attendanceData}>
                    <defs>
                      <linearGradient id="fillPresent" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--color-present)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-present)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient id="fillAbsent" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--color-absent)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-absent)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          }}
                          indicator="dot"
                        />
                      }
                    />
                    <Area
                      dataKey="present"
                      type="natural"
                      fill="url(#fillPresent)"
                      stroke="var(--color-present)"
                      stackId="a"
                    />
                    <Area
                      dataKey="absent"
                      type="natural"
                      fill="url(#fillAbsent)"
                      stroke="var(--color-absent)"
                      stackId="a"
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Session Participation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Session Participation</CardTitle>
                <CardDescription>
                  Number of students enrolled in each session type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={sessionChartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart data={sessionParticipationData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="session"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="students"
                      fill="var(--color-students)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Enrollment Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Growth</CardTitle>
                <CardDescription>
                  Total student enrollment over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={enrollmentChartConfig}
                  className="h-[300px] w-full"
                >
                  <AreaChart data={enrollmentData}>
                    <defs>
                      <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--color-total)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-total)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      dataKey="total"
                      type="monotone"
                      fill="url(#fillTotal)"
                      stroke="var(--color-total)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
