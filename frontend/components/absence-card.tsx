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
        "flex min-h-0 w-full flex-col rounded-md border border-destructive/25 bg-destructive/5 p-2.5 text-left transition-colors hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset",
        className
      )}
    >
      <div>
        <p className="text-xs font-semibold text-foreground">{studentName}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Missed: {sessionName}
        </p>
      </div>
    </button>
  )
}
