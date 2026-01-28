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
        "flex min-h-0 flex-col justify-center gap-3 rounded-md border border-border bg-background p-4 transition-colors hover:bg-muted/40",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar size="sm" className="size-12 shrink-0">
          <AvatarImage src={avatarUrl || "/avatar.webp"} alt={name} />
          <AvatarFallback className="text-sm font-medium">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-foreground">{name}</p>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <span
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium leading-none",
            config.className
          )}
        >
          {config.label}
        </span>
      </div>
    </div>
  )
}
