'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { adminSidebarLinks } from '@/app/constant/sidebaritems';


function NavGroups({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar pr-1">
            {adminSidebarLinks.map((group) => {
                const isGroupActive = group.children.some((c) => pathname === c.route);

                return (
                    <div key={group.label}>
                        <div
                            className={cn(
                                'w-full group relative flex items-center gap-3 py-4 rounded-2xl transition-all duration-300 ease-out',
                                isGroupActive
                                    ? 'bg-[#e2c196]/10 border border-[#e2c196]/25 text-[#e2c196]'
                                    : 'text-[#c1c8c5]/70 hover:text-[#e1e3e1] hover:bg-[#191c1b] border border-transparent',
                            )}
                        >
                            <div
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-300 shrink-0',
                                    isGroupActive
                                        ? 'bg-[#e2c196]/15 text-[#e2c196]'
                                        : cn('text-[#c1c8c5]/70 group-hover:bg-[#282b29]', group.iconBg),
                                )}
                            >
                                <span className={group.iconColor}>{group.icon}</span>
                            </div>
                            <span className="flex-1 text-left text-md font-medium tracking-wide">
                                {group.label}
                            </span>
                        </div>

                        <div className="flex flex-col gap-0.5 pt-1 pb-1">
                            {group.children.map((child) => {
                                const isActive = pathname === child.route;
                                return (
                                    <Link
                                        key={child.route}
                                        href={child.route}
                                        onClick={onNavigate}
                                        className={cn(
                                            'flex items-center gap-2.5 pl-2 pr-3 py-2 rounded-xl text-md transition-all duration-200',
                                            isActive
                                                ? 'text-[#e2c196] bg-[#e2c196]/10'
                                                : 'text-[#c1c8c5]/60 hover:text-[#e1e3e1] hover:bg-[#191c1b]',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'w-2 h-2 rounded-full shrink-0',
                                                isActive ? 'bg-[#e2c196]' : 'bg-[#414846]',
                                            )}
                                        />
                                        <span className="flex-1">{child.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </nav>
    );
}

export default function AdminSidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const sidebarContent = (onNavigate?: () => void) => (
        <>
            <NavGroups onNavigate={onNavigate} />

            {/* Logout */}
            <div className="pt-6 border-t border-[#414846]/40 cursor-pointer ">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-[#ffb4ab] hover:bg-[#93000a]/20 hover:text-[#ffdad6] rounded-xl"
                    onClick={() => {
                        onNavigate?.();
                    }}
                >
                    <LogOut className="w-6 h-6 mr-12" />
                    Logout
                </Button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop */}
            <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[280px] flex-col bg-linear-to-b from-[#111413] to-[#0F2A26] border-r border-[#e2c196]/10 shadow-[10px_0_30px_rgba(0,0,0,0.45)] p-6">
                {sidebarContent()}
            </aside>

            {/* <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} /> */}

            {/* Mobile */}
            <div className="md:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <button
                            className="fixed top-4 left-4 z-50 text-[#e2c196] bg-[#111413]/90 backdrop-blur-xl p-2 rounded-xl border border-[#e2c196]/20"
                            aria-label="Open menu"
                        >
                            <Menu />
                        </button>
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="w-[260px] p-6 bg-linear-to-b from-[#111413] to-[#0F2A26] border-r border-[#e2c196]/15 text-[#e1e3e1]"
                        onCloseAutoFocus={(e) => e.preventDefault()}
                    >
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        {sidebarContent(() => setMobileOpen(false))}
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}