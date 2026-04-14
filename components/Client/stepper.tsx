"use client"

import { cn } from "@/lib/utils"

type StepperProps = {
  step: number
  totalSteps: number
  label?: string
  className?: string
  compact?: boolean
}

export default function Stepper({
  step,
  totalSteps,
  label,
  className,
  compact = false,
}: StepperProps) {
  const safeTotal = Math.max(1, totalSteps)
  const safeStep = Math.min(Math.max(step, 1), safeTotal)
  const progress = (safeStep / safeTotal) * 100

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("mb-3 flex items-end justify-between", compact && "mb-2")}>
        <span
          className={cn(
            "text-[10px] uppercase tracking-[0.25em]",
            compact ? "text-[9px]" : "text-[10px]"
          )}
          style={{ color: "#e2c196" }}
        >
          Step {safeStep} of {safeTotal}
        </span>
        {label ? (
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.2em]",
              compact ? "text-[9px]" : "text-[10px]"
            )}
            style={{ color: "#c1c8c5" }}
          >
            {label}
          </span>
        ) : null}
      </div>

      <div
        className={cn("h-0.5 w-full overflow-hidden rounded-full", compact && "h-px")}
        style={{ backgroundColor: "#41484633" }}
      >
        <div
          className="h-full rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] shadow-[0_0_10px_rgba(226,193,150,0.5)] transition-[width] duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
