import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface SessionCardProps {
  time: string
  moduleName: string
  duration: string
  date?: string
  className?: string
}

export function SessionCard({
  time,
  moduleName,
  duration,
  date,
  className,
}: SessionCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-col justify-center rounded-md border border-border bg-background p-4 transition-colors hover:bg-muted/40",
        className
      )}
    >
      <div className="space-y-2">
        {date && (
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {date}
          </span>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold tabular-nums text-foreground">
            {time}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-5" />
            <span className="text-base font-medium tabular-nums">{duration}</span>
          </div>
        </div>
        <p className="text-base font-medium text-foreground leading-snug">{moduleName}</p>
      </div>
    </div>
  )
}
