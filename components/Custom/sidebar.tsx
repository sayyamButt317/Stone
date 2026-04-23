import { FLOW_ROUTES } from '@/app/Client/flow-routes'
import { Gem, Pencil, Shield, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <aside className="fixed left-0 z-40 flex h-screen w-24 flex-col items-center gap-8 border-r border-[#414846]/10 bg-[#191c1b]/60 py-24 backdrop-blur-2xl">
            <div className="mb-12">
                <span className="font-['Noto_Serif'] text-xl italic text-[#e2c196]">L&apos;A</span>
            </div>
            <nav className="flex w-full flex-col items-center gap-8">
                <div className="group flex cursor-pointer flex-col items-center gap-2">
                    <div className="rounded-full p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">
                        <span className="material-symbols-outlined"><Pencil /></span>
                    </div>
                    <Link href={FLOW_ROUTES.home} className="text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Design</Link>
                </div>

                <div className="group flex cursor-pointer flex-col items-center gap-2">
                    <div className="rounded-full bg-[#e2c196]/10 p-4 text-[#e2c196] shadow-[0_0_20px_rgba(226,193,150,0.2)]">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                            <Gem />
                        </span>
                    </div>
                    <Link href={FLOW_ROUTES.GemDecision} className="text-[10px] uppercase tracking-widest text-[#e2c196]">Gemstones</Link>
                </div>

                <div className="group flex cursor-pointer flex-col items-center gap-2">
                    <div className="rounded-full p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">
                        <span className="material-symbols-outlined"><User /></span>
                    </div>
                    <Link href={FLOW_ROUTES.chooseGender} className="text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Gender</Link>
                </div>

                <div className="group flex cursor-pointer flex-col items-center gap-2">
                    <div className="rounded-full p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">
                        <span className="material-symbols-outlined"><Shield /></span>
                    </div>
                    <Link href={FLOW_ROUTES.chooseMetal} className="text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Metal</Link>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
