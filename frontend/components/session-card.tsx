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
        "flex min-h-0 flex-col rounded-md border border-border bg-background p-2.5 transition-colors hover:bg-muted/40",
        className
      )}
    >
      <div className="space-y-1">
        {date && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {date}
          </span>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {time}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3" />
            <span className="text-[11px] font-medium tabular-nums">{duration}</span>
          </div>
        </div>
        <p className="text-xs font-medium text-foreground leading-tight">{moduleName}</p>
      </div>
    </div>
  )
}
