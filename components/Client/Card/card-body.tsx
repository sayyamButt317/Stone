'use client'
import { ReactNode } from "react"

type CardBodyProps = {
    children: ReactNode
}

export const CardBody = ({ children }: CardBodyProps) => {
    return <div className="py-2">{children}</div>
}