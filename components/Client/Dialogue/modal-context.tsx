'use client'
import { createContext, useContext } from "react"

type ModalContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("Modal components must be used within Modal")
  }

  return context
}