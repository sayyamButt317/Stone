export type MetalChoice = "gold" | "white-gold" | "rose-gold" | "silver" | "platinum"

export type MetalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    step?: number
    totalSteps?: number
    onBack?: () => void
    onContinue?: (metal: MetalChoice) => void
}

export type MetalOption = {
    id: MetalChoice
    name: string
    currentLabel: string
    imageUrl: string
    imageClassName?: string
    tintOverlayClassName?: string
}
