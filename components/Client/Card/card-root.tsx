"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

type CardRootProps = {
    children: ReactNode
}

export const CardRoot = ({ children }: CardRootProps) => {
    return (
        <Card>
            <CardContent
                className="max-w-4xl w-full h-[80vh] bg-black text-white">
                {children}
            </CardContent>
        </Card>
    )
}