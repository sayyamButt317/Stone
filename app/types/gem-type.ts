export type GemChoice = "ruby" | "emerald" | "sapphire" | "spinel"

export type GemOption = {
    id: GemChoice
    name: string
    subtitle: string
    glowClassName: string
    imageUrl: string
}