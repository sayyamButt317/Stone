"use client"
import { ReactNode } from "react"
import { DialogTrigger } from "@/components/ui/dialog"

type ModalTriggerProps = {
    children: ReactNode
}

export const ModalTrigger = ({ children }: ModalTriggerProps) => {
    return (
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
    )
}