"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ModalBodyProps = {
  children: ReactNode
  className?: string
}

export const ModalBody = ({ children, className }: ModalBodyProps) => {
  return <div className={cn("py-2", className)}>{children}</div>
}