"use client"

import { ReactNode } from "react"
import { DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ModalFooterProps = {
  children: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return <DialogFooter className={cn(className)}>{children}</DialogFooter>
}