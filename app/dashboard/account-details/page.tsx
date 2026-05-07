import { Edit3, Sparkles } from "lucide-react";

const preferenceItems = [
    {
        title: "Project Updates",
        description: "Notifications regarding your bespoke commissions.",
        enabled: true,
    },
    {
        title: "Reorder Availability",
        description: "Alerts for limited edition heritage pieces.",
        enabled: false,
    },
    {
        title: "Marketing Offers",
        description: "Invitations to private gallery viewing events.",
        enabled: true,
    },
];

const profileLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Contact Concierge",
];

export default function AccountDetailsPage() {
    return (
        <section className="min-h-screen bg-[#0c0f0e] px-4 pt-10 pb-24 text-[#e1e3e1] md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 text-center md:text-left">
                    <h1 className="mb-4 text-4xl tracking-tight text-[#e1e3e1] md:text-5xl">
                        Your Digital Atelier
                    </h1>
                    <p className="max-w-xl tracking-wide text-[#c1c8c5]">
                        Refine your preferences and curate your private collection
                        details below.
                    </p>
                </div>

                <div className="mb-12 flex flex-col items-center gap-8 rounded-2xl bg-[#1d201f] p-8 shadow-2xl md:flex-row">
                    <div className="relative">
                        <div className="h-32 w-32 overflow-hidden rounded-full bg-[#0c0f0e] p-2 ring-4 ring-[#e2c196]/20">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOq9oSE3tgFQcBXkmi3pNH_-60V16UNEW1q2A9DwL43jhyBrddrUjfkWzsHvgd-BYE5W9QjN6xvchXj9X5yj2tTDTyfOZ4jNXrkMlCnJhk0yYAJDk0jl83PIFIA1iUUNzHz0KvrAK8Hn1qkJFNqjc1HQcmMa6SsMotqqTOF6ZD_jigW_BeDXo55pPSW-ijYRuW7qtz4uXT5dJzgUKlxlOVJ3VqAIce0-j9fVE_XBTIZowwBIW71GhslrSy0_FM8Seu5OblOtgm2VA"
                                alt="User profile avatar"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <button
                            className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#e2c196] text-[#412d0d] shadow-lg shadow-[#e2c196]/20"
                            aria-label="Edit profile image"
                        >
                            <Edit3 className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="text-center md:text-left">
                        <h2 className="mb-1 text-2xl text-[#e2c196]">Elara Vance</h2>
                        <p className="mb-4 text-sm tracking-wider text-[#c1c8c5] uppercase">
                            elara.vance@editorialatelier.com
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                            <span className="rounded-full bg-[#314c47] px-4 py-1 text-[10px] tracking-widest text-[#9ebbb5] uppercase">
                                Emerald Status
                            </span>
                            <span className="rounded-full bg-[#323534] px-4 py-1 text-[10px] tracking-widest text-[#c1c8c5] uppercase">
                                Member since 2021
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <div className="space-y-12 lg:col-span-7">
                        <section>
                            <h3 className="mb-8 text-xl text-[#e1e3e1]">
                                Personal Information
                            </h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="ml-1 block text-[10px] tracking-widest text-[#c1c8c5] uppercase">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Elara"
                                            className="w-full rounded-md border border-[#414846]/15 bg-[#0c0f0e] px-4 py-4 text-[#e1e3e1] transition-all focus:border-[#e2c196]/40 focus:outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ml-1 block text-[10px] tracking-widest text-[#c1c8c5] uppercase">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Vance"
                                            className="w-full rounded-md border border-[#414846]/15 bg-[#0c0f0e] px-4 py-4 text-[#e1e3e1] transition-all focus:border-[#e2c196]/40 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 block text-[10px] tracking-widest text-[#c1c8c5] uppercase">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="elara.vance@editorialatelier.com"
                                        className="w-full rounded-md border border-[#414846]/15 bg-[#0c0f0e] px-4 py-4 text-[#e1e3e1] transition-all focus:border-[#e2c196]/40 focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                                    <button
                                        type="button"
                                        className="rounded-md bg-linear-to-tr from-[#e2c196] to-[#a58860] px-8 py-4 text-sm font-bold tracking-widest text-[#412d0d] uppercase shadow-[0_10px_30px_rgba(226,193,150,0.1)] transition-all hover:scale-[1.02] active:scale-95"
                                    >
                                        Update Details
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md border border-[#e2c196]/40 px-8 py-4 text-sm font-bold tracking-widest text-[#e2c196] uppercase transition-all hover:bg-[#e2c196]/5 active:scale-95"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    <div className="lg:col-span-5">
                        <aside className="sticky top-24 rounded-2xl border border-[#414846]/10 bg-[#1d201f]/60 p-10 backdrop-blur-2xl">
                            <h3 className="mb-2 text-xl text-[#e2c196]">Email Preferences</h3>
                            <p className="mb-10 text-sm text-[#c1c8c5]">
                                Control how you receive news and curated offers from
                                our atelier.
                            </p>

                            <div className="space-y-8">
                                {preferenceItems.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex items-center justify-between gap-6"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold tracking-wide text-[#e1e3e1]">
                                                {item.title}
                                            </p>
                                            <p className="text-[11px] leading-relaxed text-[#c1c8c5]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            aria-label={`Toggle ${item.title}`}
                                            className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${item.enabled ? "bg-[#314c47]" : "bg-[#323534]"}`}
                                        >
                                            <span
                                                className={`absolute top-1 h-4 w-4 rounded-full shadow-sm transition-all duration-300 ${item.enabled ? "right-1 bg-[#e2c196]" : "left-1 bg-[#c1c8c5]"}`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 border-t border-[#414846]/10 pt-10 text-center">
                                <Sparkles className="mx-auto h-9 w-9 text-[#e2c196]/30" />
                                <p className="mt-4 text-[10px] tracking-[0.3em] text-[#c1c8c5] uppercase">
                                    Personal Concierge is Online
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <footer className="mt-24 flex w-full flex-col items-center justify-center gap-6 border-t border-[#414846]/10 py-12">
                <div className="text-xl tracking-[0.2em] text-[#e2c196]/50 uppercase">
                    L&apos;Atelier
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8">
                    {profileLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="text-[10px] tracking-[0.3em] text-[#e1e3e1]/30 uppercase transition-colors duration-500 hover:text-[#e2c196]"
                        >
                            {link}
                        </a>
                    ))}
                </div>
                <p className="text-center text-[10px] tracking-[0.3em] text-[#e1e3e1]/30 uppercase">
                    © 2024 L&apos;Atelier Midnight Heritage. All Rights Reserved.
                </p>
            </footer>
        </section>
    );
}
