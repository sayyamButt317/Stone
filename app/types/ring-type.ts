import {
    Circle,
    Diamond,
    Infinity,
    Minus,
    RectangleHorizontal,
    Sparkles,
    Split,
} from "lucide-react"

export type RingStyleType =
    | "solitaire"
    | "three-stone"
    | "halo"
    | "bezel"
    | "signet"
    | "cluster"
    | "toi-et-moi"
    | "eternity"
    | "contemporary-minimal"

export const RING_STYLES: Array<{
    id: RingStyleType
    name: string
    description: string
    Icon: typeof Diamond
}> = [
        {
            id: "solitaire",
            name: "Solitaire",
            description: "A timeless classic featuring a single, magnificent center stone.",
            Icon: Diamond,
        },
        {
            id: "three-stone",
            name: "Three Stone",
            description: "Representing your past, present, and future together.",
            Icon: Split,
        },
        {
            id: "halo",
            name: "Halo",
            description: "A radiant circle of pave diamonds encircling the center stone.",
            Icon: Sparkles,
        },
        {
            id: "bezel",
            name: "Bezel",
            description: "A modern metal rim that securely holds the stone in place.",
            Icon: Circle,
        },
        {
            id: "signet",
            name: "Signet",
            description: "A bold, flat-topped silhouette with a heritage-rich profile.",
            Icon: RectangleHorizontal,
        },
        {
            id: "cluster",
            name: "Cluster",
            description: "Small stones grouped together to create a grand brilliant effect.",
            Icon: Sparkles,
        },
        {
            id: "toi-et-moi",
            name: "Toi et Moi",
            description: "Two souls meeting through two distinct center stones.",
            Icon: Split,
        },
        {
            id: "eternity",
            name: "Eternity",
            description: "A continuous, unbroken circle of brilliance around the finger.",
            Icon: Infinity,
        },
        {
            id: "contemporary-minimal",
            name: "Contemporary Minimal",
            description: "Clean architectural lines for the modern aesthetician.",
            Icon: Minus,
        },
    ]

