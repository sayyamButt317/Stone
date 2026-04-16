export type StoneColor =
    | "black"
    | "blue"
    | "brown"
    | "clear"
    | "gray"
    | "green"
    | "multicolor"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "yellow"

export const COLORS: Array<{
    id: StoneColor
    label: string
    swatch: string
}> = [
        { id: "black", label: "Black", swatch: "#000000" },
        { id: "blue", label: "Blue", swatch: "#2196F3" },
        { id: "brown", label: "Brown", swatch: "#795548" },
        { id: "clear", label: "Clear", swatch: "#f8f9fa" },
        { id: "gray", label: "Gray", swatch: "#9e9e9e" },
        { id: "green", label: "Green", swatch: "#2e7d32" },
        {
            id: "multicolor",
            label: "Multicolor",
            swatch: "linear-gradient(135deg,#f44336 0%,#2196F3 50%,#ffeb3b 100%)",
        },
        { id: "orange", label: "Orange", swatch: "#ff9800" },
        { id: "pink", label: "Pink", swatch: "#e91e63" },
        { id: "purple", label: "Purple", swatch: "#9c27b0" },
        { id: "red", label: "Red", swatch: "#d32f2f" },
        { id: "yellow", label: "Yellow", swatch: "#ffeb3b" },
    ]
