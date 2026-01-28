"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export type AbsenceDetail = {
  studentName: string
  sessionName: string
  sessionTime: string
  isAccredited: boolean
  description: string
}

interface AbsenceDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  absence: AbsenceDetail | null
  onReschedule?: () => void
}

export function AbsenceDetailModal({
  open,
  onOpenChange,
  absence,
  onReschedule,
}: AbsenceDetailModalProps) {
  if (!absence) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Missed session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Session
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {absence.sessionName}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Time
            </p>
            <p className="mt-1 text-base font-medium tabular-nums text-foreground">
              {absence.sessionTime}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Accredited
            </p>
            <p className="mt-1 text-base font-medium text-foreground">
              {absence.isAccredited ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {absence.description}
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          {absence.isAccredited && (
            <Button onClick={onReschedule}>Reschedule session</Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
