import { cn } from "@/lib/utils"

interface AbsenceCardProps {
  studentName: string
  sessionName: string
  onClick?: () => void
  className?: string
}

export function AbsenceCard({
  studentName,
  sessionName,
  onClick,
  className,
}: AbsenceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col rounded-lg border border-destructive/30 bg-destructive/[0.03] backdrop-blur-sm px-2.5 py-2 text-left transition-all hover:bg-destructive/[0.08] hover:border-destructive/40 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        className
      )}
    >
      <p className="text-xs font-semibold text-foreground mb-0.5">{studentName}</p>
      <p className="text-[11px] text-muted-foreground/80">
        Missed: {sessionName}
      </p>
    </button>
  )
}
