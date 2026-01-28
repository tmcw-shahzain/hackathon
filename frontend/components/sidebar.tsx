"use client"

import { Users, Calendar, Building2, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigation = [
  { name: "Students", icon: Users, href: "#" },
  { name: "Timetable", icon: Calendar, href: "#" },
  { name: "Academies", icon: Building2, href: "#" },
  { name: "Analytics", icon: BarChart3, href: "#" },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative z-20 flex h-screen w-[280px] flex-shrink-0 flex-col",
        "bg-[oklch(0.14_0.02_250)]",
        "border-r-4 border-[oklch(0.55_0.18_195)]",
        "shadow-[4px_0_24px_-4px_rgba(0,0,0,0.15)]",
        "min-w-[280px]",
        className
      )}
    >
      {/* Subtle diagonal stripe texture so it's clearly "the nav" */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 12px,
            white 12px,
            white 13px
          )`,
        }}
      />
      <div className="relative flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <Image
          src="/street-league-charcoal.webp"
          alt="Street League"
          width={36}
          height={36}
          className="object-contain invert"
        />
        <span className="text-lg font-bold tracking-tight text-white">
          Street League
        </span>
      </div>
      <nav className="relative flex-1 space-y-0.5 px-3 py-5">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                "text-white/80 hover:bg-white/12 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.14_0.02_250)]",
                "hover:translate-x-1"
              )}
            >
              <Icon className="size-5 shrink-0 text-[oklch(0.55_0.18_195)]" />
              <span>{item.name}</span>
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
