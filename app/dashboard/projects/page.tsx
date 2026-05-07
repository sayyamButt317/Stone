import {
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    Filter,
    Grid3X3,
    Plus,
    Search,
    Sparkles,
} from "lucide-react";

type ProjectStatus = "In Progress" | "Delivered" | "Draft" | "Scope Sent";

type Project = {
    name: string;
    subtitle: string;
    category: string;
    activity: string;
    created: string;
    status: ProjectStatus;
    image?: string;
};

const projects: Project[] = [
    {
        name: "The Azure Seraph Ring",
        subtitle: "Bespoke Sapphire Engagement Piece",
        category: "Jewellery",
        activity: "Active 2 hours ago",
        created: "Oct 12, 2023",
        status: "In Progress",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAv5BLKLZaEsgD1AbMth4Fujs9z-sWi6309kMOw0Arfo3pu7F9CA5HLAHg7btTaHdq82SZ9Y492Gzob-FF1-TjqOpLjoE469Bu3EtFIdFacSHnJuwYr0qQfKSELNb6uwaY6l_8cZ5PPFJJXo6z6v2_4PhqdEhmFk95KPjZntBlYboRqfsO8WWRcRcmJmB1CdVhZGejnKBFm1nZDS0iuJ7mheHw5cUBHFP0y85Xgh06YuWh3Eq1wB8gRSELdI4rm2U1GHvEU_Bs_LAo",
    },
    {
        name: "Colombian Muzo Emerald",
        subtitle: "Gemstone Procurement & Certification",
        category: "Gem Sourcing",
        activity: "Active 1 day ago",
        created: "Sep 28, 2023",
        status: "Delivered",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDlOxN_HEBtBjIVx4XHqO6xLmoV4dZ9QJ3k0sdwla3BhLnfVzA6L7-LACn8dLCb7ZgFw6GtesCHyaN5YCD8kgmMXaPiMUrz3AsQIPLXWxTUiL4WqYn0WHxhgLqwBdu0rvlUeutMSuNeZDLXvi8E7IuRVxe8iKrdasunas8xPiJlBbc8VwpOHQB-OXNDB7GHRqY3X2bQPlb3Tn8jILFWOQxXsbIslxNSCusHRDMo7UxqaHIOGJBXJzkZFq0BULt14XJFGl-aCXUBl8w",
    },
    {
        name: "The Nocturne Necklace",
        subtitle: "Initial Sketching Phase",
        category: "Jewellery",
        activity: "Active 4 days ago",
        created: "Nov 02, 2023",
        status: "Draft",
    },
    {
        name: "Imperial Gold Cufflinks",
        subtitle: "Monogrammed Heirloom Set",
        category: "Jewellery",
        activity: "Active 1 week ago",
        created: "Sep 15, 2023",
        status: "Scope Sent",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBgtbQu0HDSwXts827EGlBGSkBq0gFCnr3gSZ6KGKfXX6SaVlCpRIUOUzawVZioMKHrQEqTDf0H46CGf64l4WdmjKdj20CbHZoiL1hUkzSOB72wCjWPNevs_uE9NesWKFgijE1v-v-cylLjwrY-M4a-tgqg3raEytBQnJR7ZlmyotdTe_HW9jLKPaqstFSqt1pNtAMDg7cmK1qxFwRrEBA-dLMzQ-fWZPC0F5t5RTCBU2eJOx-au1CkrJX3Jwm0zqxv_e2Wt6hpNHw",
    },
];

const statusClassMap: Record<ProjectStatus, string> = {
    "In Progress":
        "border border-[#e2c196]/40 text-[#e2c196] bg-[#e2c196]/5 shadow-[0_0_15px_rgba(226,193,150,0.12)]",
    Delivered:
        "border border-[#314c47] text-[#b0cdc6] bg-[#b0cdc6]/5",
    Draft:
        "border border-[#414846] text-[#e1e3e1]/45 bg-transparent",
    "Scope Sent":
        "border border-[#342204] text-[#b0cdc6] bg-[#342204]/20 shadow-[0_0_15px_rgba(226,193,150,0.1)]",
};

const filterPills = [
    "All",
    "Draft",
    "In Progress",
    "Delivered",
    "Custom Jewellery",
    "Gem Sourcing",
];

export default function ProjectsPage() {
    return (
        <section className="relative min-h-screen overflow-x-hidden bg-[#111413] px-4 py-8 text-[#e1e3e1] md:px-8 md:py-12">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                    <h1 className="mb-2 text-4xl font-light tracking-tight text-[#e2c196] md:text-5xl">
                        My Projects
                    </h1>
                    <p className="text-xs tracking-[0.18em] text-[#e1e3e1]/40 uppercase">
                        Vault / Active Commissions
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        className="rounded-full border border-[#e2c196]/10 bg-[#191c1b]/60 p-3 backdrop-blur-md transition-colors hover:bg-[#e2c196]/5"
                        aria-label="Filter projects"
                    >
                        <Filter className="h-5 w-5 text-[#e2c196]" />
                    </button>
                    <button
                        className="rounded-full border border-[#e2c196]/10 bg-[#191c1b]/60 p-3 backdrop-blur-md transition-colors hover:bg-[#e2c196]/5"
                        aria-label="Grid view"
                    >
                        <Grid3X3 className="h-5 w-5 text-[#e2c196]" />
                    </button>
                </div>
            </div>

            <div className="mb-12 space-y-8">
                <div className="group relative max-w-2xl">
                    <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-[#e2c196]/50 transition-colors group-focus-within:text-[#e2c196]" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full rounded-full border border-[#414846]/15 bg-[#191c1b]/40 py-4 pr-6 pl-14 tracking-wide text-[#e1e3e1] placeholder:text-[#e1e3e1]/20 backdrop-blur-md transition-all focus:ring-1 focus:ring-[#e2c196]/40 focus:outline-none"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    {filterPills.map((pill) => (
                        <button
                            key={pill}
                            className={
                                pill === "All"
                                    ? "rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-6 py-2 text-sm font-semibold tracking-wide text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.2)]"
                                    : "rounded-full border border-[#e2c196]/10 bg-[#191c1b]/60 px-6 py-2 text-sm font-medium text-[#e1e3e1]/60 backdrop-blur-md transition-colors hover:text-[#e2c196]"
                            }
                        >
                            {pill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-16 space-y-6">
                {projects.map((project) => (
                    <article
                        key={project.name}
                        className="group relative flex cursor-pointer flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-[#e2c196]/10 bg-[#191c1b]/60 p-6 backdrop-blur-md transition-all duration-500 hover:bg-[#1d201f] md:flex-row"
                    >
                        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row md:gap-8">
                            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border border-[#414846]/30 bg-[#1d201f]">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <Sparkles className="h-10 w-10 text-[#414846]" />
                                )}
                            </div>
                            <div>
                                <h3 className="mb-1 text-center text-2xl text-[#e1e3e1] md:text-left">
                                    {project.name}
                                </h3>
                                <p className="text-center text-sm italic text-[#e1e3e1]/40 md:text-left">
                                    {project.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="mt-1 flex w-full flex-col items-center gap-4 md:mt-0 md:w-auto md:flex-row md:gap-14">
                            <div className="text-center md:text-left">
                                <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#e2c196] uppercase">
                                    Category
                                </p>
                                <p className="text-sm text-[#e1e3e1]">{project.category}</p>
                                <p className="mt-1 text-[10px] italic text-[#e1e3e1]/30">
                                    {project.activity}
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#e2c196] uppercase">
                                    Created
                                </p>
                                <p className="text-sm text-[#e1e3e1]">{project.created}</p>
                            </div>
                            <div>
                                <span
                                    className={`rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase ${statusClassMap[project.status]}`}
                                >
                                    {project.status}
                                </span>
                            </div>

                            <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <button
                                    aria-label={`View ${project.name}`}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282b29] text-[#e2c196] transition-colors hover:bg-[#e2c196] hover:text-[#111413]"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button
                                    aria-label={`Edit ${project.name}`}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282b29] text-[#e2c196] transition-colors hover:bg-[#e2c196] hover:text-[#111413]"
                                >
                                    <Edit3 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 pb-12">
                <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#e1e3e1]/30 transition-colors hover:text-[#e2c196]">
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="h-10 w-10 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] text-sm font-bold text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.2)]">
                    1
                </button>
                <button className="h-10 w-10 rounded-full border border-[#e2c196]/10 bg-[#191c1b]/60 text-sm font-bold text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]">
                    2
                </button>
                <button className="h-10 w-10 rounded-full border border-[#e2c196]/10 bg-[#191c1b]/60 text-sm font-bold text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]">
                    3
                </button>
                <span className="px-2 text-[#e1e3e1]/20">...</span>
                <button className="h-10 w-10 rounded-full border border-[#e2c196]/10 bg-[#191c1b]/60 text-sm font-bold text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]">
                    12
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#e1e3e1]/30 transition-colors hover:text-[#e2c196]">
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            <button className="fixed right-10 bottom-10 z-50 flex items-center gap-3 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-8 py-4 shadow-[0_10px_30px_rgba(165,136,96,0.3)] transition-all duration-300 hover:scale-105 active:scale-95">
                <Plus className="h-5 w-5 text-[#111413]" />
                <span className="text-xs font-bold tracking-[0.18em] text-[#111413] uppercase">
                    New Project
                </span>
            </button>
        </section>
    );
}
