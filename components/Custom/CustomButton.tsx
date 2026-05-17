import { Loader2 } from "lucide-react"

interface CustomButtonProps {
    children: React.ReactNode
    onClick: () => void
    className?: string
    disabled?: boolean
    isPending?: boolean
}


export default function CustomButton({ children, onClick, disabled, isPending }: CustomButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 text-[#111413] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(226,193,150,0.2)] active:scale-95">
            {isPending ?
                <Loader2 className="size-5 animate-spin" /> : <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase">{children}</span>}
        </button>
    )
}
