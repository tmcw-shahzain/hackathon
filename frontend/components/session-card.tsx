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
        "flex flex-col rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-2 transition-all hover:bg-muted/30 hover:border-border hover:shadow-sm",
        className
      )}
    >
      {date && (
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground/70 mb-0.5">
          {date}
        </span>
      )}
      <div className="flex items-baseline justify-between mb-0.5">
        <span className="text-base font-semibold tabular-nums text-foreground">
          {time}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="size-3" />
          <span className="text-[11px] font-medium tabular-nums">{duration}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground/90 leading-tight">{moduleName}</p>
    </div>
  )
}
