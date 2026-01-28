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
        "flex min-h-0 flex-col rounded-md border border-border bg-background p-2.5 transition-colors hover:bg-muted/40",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar size="sm" className="size-9 shrink-0">
          <AvatarImage src={avatarUrl || "/avatar.webp"} alt={name} />
          <AvatarFallback className="text-[11px] font-medium">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">{name}</p>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-start">
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
            config.className
          )}
        >
          {config.label}
        </span>
      </div>
    </div>
  )
}
