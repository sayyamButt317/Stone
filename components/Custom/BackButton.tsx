import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
    children: React.ReactNode
    onClick: () => void
    className?: string
}



export default function BackButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="rounded-full flex cursor-pointer items-center gap-2 border border-[#414846]/30 px-12 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#e1e3e1] transition-all duration-300 hover:scale-[1.02] hover:bg-[#e1e3e1]/5 active:scale-95"
            type="button"
            onClick={onClick}
        >
            <ArrowLeft className="size-4" /> <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Back</span>
        </button>

    )
}