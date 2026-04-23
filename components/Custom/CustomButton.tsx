import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface CustomButtonProps {
    children: React.ReactNode
    onClick: () => void
    className?: string
    disabled?: boolean
}



export default function CustomButton({ children, onClick, className, disabled }: CustomButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={cn("rounded-full cursor-pointer bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 text-xs font-bold tracking-widest text-[#111413] uppercase shadow-[0_10px_20px_rgba(226,193,150,0.2)] transition-opacity hover:opacity-90", className)}>
            {disabled ? <Loader2 className="size-5 animate-spin" /> : children}
        </button>
    )
}