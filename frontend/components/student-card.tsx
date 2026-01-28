import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type PerformanceLevel = "excellent" | "good" | "needs-improvement" | "poor"

interface StudentCardProps {
  name: string
  performance: PerformanceLevel
  avatarUrl?: string
  className?: string
}

const performanceConfig: Record<
  PerformanceLevel,
  { label: string; className: string }
> = {
  excellent: {
    label: "On track",
    className: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  },
  good: {
    label: "Good",
    className: "bg-primary/10 text-primary",
  },
  "needs-improvement": {
    label: "Needs support",
    className: "bg-amber-500/12 text-amber-700 dark:text-amber-400",
  },
  poor: {
    label: "At risk",
    className: "bg-red-500/12 text-red-600 dark:text-red-400",
  },
}

export function StudentCard({
  name,
  performance,
  avatarUrl,
  className,
}: StudentCardProps) {
  const config = performanceConfig[performance]

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm px-2.5 py-2 transition-all hover:bg-muted/30 hover:border-border hover:shadow-sm",
        className
      )}
    >
      <Avatar size="sm" className="size-8 shrink-0">
        <AvatarImage src={avatarUrl || "/avatar.webp"} alt={name} />
        <AvatarFallback className="text-[10px] font-medium">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-foreground mb-0.5">{name}</p>
        <span
          className={cn(
            "inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium leading-none",
            config.className
          )}
        >
          {config.label}
        </span>
      </div>
    </div>
  )
}
