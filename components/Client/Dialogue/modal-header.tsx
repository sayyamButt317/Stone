"use client"

import { ReactNode } from "react"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ModalHeaderProps = {
  children: ReactNode
  className?: string
  titleClassName?: string
}

export const ModalHeader = ({
  children,
  className,
  titleClassName,
}: ModalHeaderProps) => {
  return (
    <DialogHeader className={cn(className)}>
      <DialogTitle className={cn(titleClassName)}>{children}</DialogTitle>
    </DialogHeader>
  )
}