"use client"

import { ReactNode } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ModalRootProps = {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  /** When true, fills the viewport with the atelier-style shell (no card chrome). */
  fullscreen?: boolean
  className?: string
}

export const ModalRoot = ({
  children,
  open,
  onOpenChange,
  fullscreen = true,
  className,
}: ModalRootProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName={
          fullscreen
            ? "bg-[#111413]/85 supports-backdrop-filter:backdrop-blur-md"
            : undefined
        }
        className={cn(
          fullscreen
            ? "fixed inset-0 top-0 left-0 z-50 flex h-dvh max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-[#111413] p-0 text-[#e1e3e1] shadow-none ring-0 outline-none sm:max-w-none sm:rounded-none"
            : "max-w-4xl bg-[#111413] text-[#e1e3e1]",
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}