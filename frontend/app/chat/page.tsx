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
import { Users, Calendar, Building2, BarChart3, Send, MessageSquare } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const EXAMPLE_QUESTIONS = [
  "Which course has the most absences?",
  "Show me attendance trends for this month",
  "Which students need the most support?",
  "What's the average attendance rate across all academies?",
  "List students with declining attendance",
  "Which workshops are most popular?",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Street League Analytics Assistant. I can help you analyze your data, track attendance patterns, identify at-risk students, and generate custom reports. Try asking me one of the example questions below, or ask me anything about your academies, students, or workshops!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleExampleQuestion = (question: string) => {
    setInputValue(question)
  }

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("absent") || lowerQuery.includes("absence")) {
      return "Based on your data, **Football Fundamentals** has the highest absence rate at 18% (7 out of 40 students). The main reasons cited are:\n\n1. **Scheduling conflicts** - 3 students\n2. **Transportation issues** - 2 students\n3. **Health reasons** - 2 students\n\nWould you like me to generate a detailed report or suggest intervention strategies?"
    }

    if (lowerQuery.includes("attendance") && lowerQuery.includes("trend")) {
      return "Here's the attendance trend for this month:\n\n📈 **Overall attendance: 94%** (+2.3% from last month)\n\n**Weekly breakdown:**\n- Week 1: 91%\n- Week 2: 93%\n- Week 3: 95%\n- Week 4: 96%\n\nThe upward trend shows improving engagement. **Top performing academy:** North London (97% attendance)."
    }

    if (lowerQuery.includes("support") || lowerQuery.includes("at-risk") || lowerQuery.includes("need")) {
      return "Based on attendance and performance data, these students need additional support:\n\n1. **Emma Davis** - 75% attendance, declining performance\n2. **Michael Brown** - Missed 4 consecutive sessions\n3. **Lucas Martinez** - Below 80% attendance threshold\n\nRecommended actions: Schedule 1-on-1 check-ins, review ILPs, contact support networks."
    }

    if (lowerQuery.includes("average") || lowerQuery.includes("rate")) {
      return "**Average attendance rate across all academies: 94%**\n\n**Breakdown by location:**\n- North London: 97%\n- Central London: 94%\n- East London: 92%\n- South London: 91%\n- West London: 93%\n\nAll academies are performing above the 90% target threshold."
    }

    if (lowerQuery.includes("workshop") || lowerQuery.includes("popular")) {
      return "**Most popular workshops** (by enrollment):\n\n1. **Fitness Training** - 30 students (100% capacity)\n2. **Football Fundamentals** - 24 students (96% capacity)\n3. **Leadership Workshop** - 22 students (92% capacity)\n\n**Highest satisfaction ratings:**\n1. Interview Skills - 4.8/5.0\n2. CV Writing - 4.7/5.0\n3. Career Guidance - 4.6/5.0"
    }

    // Default response
    return "I understand you're asking about: **" + query + "**\n\nI can help you analyze various aspects of your Street League data including:\n\n- Student attendance and performance\n- Academy and workshop analytics\n- Identifying trends and patterns\n- Generating custom reports\n\nCould you provide more specific details about what you'd like to know?"
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
              <span className="text-sm font-medium">AI Chat</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="size-9 ring-2 ring-border/20">
                <AvatarImage src="/avatar.webp" alt="Shahzain" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col min-h-0">
          {/* Header */}
          <div className="p-6 pb-4">
            <h1 className="text-2xl font-bold mb-1">Analytics Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Ask questions about your data and get instant insights
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto px-6">
            <div className="max-w-4xl mx-auto space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="size-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p
                      className={`text-sm whitespace-pre-line ${
                        message.role === "user" ? "text-white" : "text-foreground"
                      }`}
                    >
                      {message.content}
                    </p>
                    <p
                      className={`text-[10px] mt-2 ${
                        message.role === "user" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar size="sm" className="size-8 shrink-0">
                      <AvatarImage src="/avatar.webp" alt="You" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="size-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Example Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <div className="max-w-4xl mx-auto">
                <p className="text-xs font-medium text-muted-foreground mb-3">
                  Try asking:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {EXAMPLE_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleQuestion(question)}
                      className="text-left p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors text-xs"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ask me anything about your academies, students, or workshops..."
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="btn-primary-gold px-6"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
