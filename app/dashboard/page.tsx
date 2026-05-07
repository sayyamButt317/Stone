import {
    Bell,
    Camera,
    Diamond,
    History,
    House,
    Mail,
    MapPin,
    MessageCircle,
    NotebookPen,
    SearchCheck,
    ShieldCheck,
    Sparkles,
    UserRound,
} from "lucide-react";
import Image from "next/image";

type QuickAction = {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    highlighted?: boolean;
};

type ActiveProject = {
    name: string;
    category: string;
    status: string;
    activity: string;
    progress: string;
    image: string;
    statusTone?: "active" | "draft" | "delivered";
};

type TimelineItem = {
    title: string;
    time: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
};

const quickActions: QuickAction[] = [
    { title: "My Projects", icon: Diamond },
    { title: "Reorders", icon: History },
    { title: "Start Bespoke Jewellery Project", icon: NotebookPen, highlighted: true },
    { title: "Start Gem Sourcing Project", icon: SearchCheck },
    { title: "Maker's Mark Jewellery", icon: Sparkles },
    { title: "Ask for Custom Request", icon: Mail },
];

const activeProjects: ActiveProject[] = [
    {
        name: "The Azure Seraph Ring",
        category: "Jewellery",
        status: "In Progress",
        activity: "2 hours ago",
        progress: "65%",
        statusTone: "active",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD4i8IW3NkVL4rb99tsY3XUlKE4Ot2D5e7N-KErXWjXZ6ldi-zsNvy1Zm3Y6NKI7-OHmjRtnSyPheSqSp2d8zKf8DmUVHUZsiGOLy5B8AVnOKLgEqWLjmiFiVyhMDnAWq6kLWnItwGOhszIE0tVxKS-ce60TyweNbZR8yGFSTVelFFHE4Qm4wHOujE0763WfHjrN3kRwuhElgIwiFC4f91QnRdcMklOGur2LetLxovE4BtrS-fELeUCVCBz6VRv4Ee9wj6kol-32No",
    },
    {
        name: "Colombian Muzo Pair",
        category: "Gem Sourcing",
        status: "Draft",
        activity: "Yesterday",
        progress: "20%",
        statusTone: "draft",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCiEIqZ500KtK6KpeXYwaKP5_SX_20NIB6x7fGGtPt-JvFCbN-B-vyyGG7i6Bx8T_XYXKhjibIC20jlF03ePRyFB5gSxj14pvGmvd8LhBzw7ir3rGjEM-JazX1_a4Gi_eT3YVjr8OuJqZBalrukqULjx_2VHw6rbBVqn1YmiTSQj0K5qdceHIP7gBgp5XvqCO2EWrzOufBgZrmjOdl6GGJWeN3pIAf1HRybcHKCBNz1uT3s3oDaPtCEi6OMmzor6h9-GhN3C-3mRf4",
    },
    {
        name: "Minimalist Aura Cuff",
        category: "Jewellery",
        status: "Delivered",
        activity: "Oct 12, 2023",
        progress: "100%",
        statusTone: "delivered",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBeZBS3gwg7_65tsJaIul46Pg_k_3Mx-ktxNqHRJt0ihrMInoYOA2D7GP0nnb9NAkTNxmVedJDY7NdDNMRUR4AmXPuh8VZBBLE0CEGlN6_gHKZ8i-GTVDpkHjhHoOsWoIzVU0IbhzNtz0M2ImqAI-UXGxPsH3Ra287HaBWYisf0ByCVHrAZbSMvL0QI2MiO_rySRwYvpqsB-CBBTSIXfNKpaU7_tGy_HWyuDZX-JSWqi0Fw2IdcErBAxb9WnvCDZlOGk18MemQ-HKA",
    },
];

const timelineItems: TimelineItem[] = [
    {
        title: "Casting photos uploaded",
        time: "12:45 PM",
        description:
            'New high-resolution imagery available for "The Azure Seraph Ring" master mold.',
        icon: Camera,
    },
    {
        title: "Gem Certification Ready",
        time: "Yesterday",
        description:
            "The GIA certification for your emerald sourcing project is now available in your documents.",
        icon: ShieldCheck,
    },
    {
        title: "Message from Master Jeweller",
        time: "Oct 14",
        description:
            '"The prongs have been adjusted to ensure maximum light entry for the central stone."',
        icon: MessageCircle,
    },
];

export default function DashboardPage() {
    return (
        <section className="relative min-h-screen overflow-x-hidden bg-[#111413] px-4 pt-20 pb-24 text-[#e1e3e1] md:px-8 md:pt-10">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[5%] h-[40%] w-[40%] rounded-full bg-[#314c47]/20 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] h-[35%] w-[35%] rounded-full bg-[#342204]/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[20%] h-[50%] w-[50%] rounded-full bg-[#323534]/10 blur-[150px]" />
            </div>

            <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-[#111413]/80 px-6 py-4 backdrop-blur-xl shadow-2xl shadow-black/40 md:hidden">
                <h1 className="text-xl tracking-widest text-[#e2c196]">THE ATELIER</h1>
                <div className="flex items-center gap-4">
                    <Bell className="h-5 w-5 text-[#e2c196]" />
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-[#e2c196]/20 bg-[#342204]">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN2b-dGwzJBfG3sdP1ue3ikCB4b_196Aoh0ZMcej9e3bInHgh-vywEYYothnq_sW1sIVm6YGtD11ZbCZVOVNRZ84mJgn6NtE83rU3iApZMejKiNhYoX8GNjLupJXDbCdlvUNycUYJbFT-0YUCyL5NnrHQK6Si9XbT5Bso0xct0Gi5cQeQq7vp_LHDhOCaGRQ_TiAPl0aIcr9jAeAhMJVIaoQjicDK2FChXCBo4V1MajypQFyDHpdyUBeH2yk51KiO8IpR64A7M8eY"
                            alt="User profile"
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </nav>

            <header className="relative mb-16">
                <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-[#e2c196]/5 blur-[60px]" />
                <p className="mb-4 text-xs tracking-[0.3em] text-[#e2c196] uppercase">
                    MEMBER SINCE 2022
                </p>
                <h2 className="text-4xl leading-tight md:text-5xl lg:text-6xl">
                    Welcome back,{" "}
                    <span className="relative inline-block italic font-light">
                        Anna
                        <span className="absolute bottom-1 left-0 h-px w-full bg-[#e2c196]/40" />
                    </span>
                </h2>
                <div className="mt-6 flex items-center gap-4">
                    <span className="h-px w-12 bg-[#414846]/30" />
                    <p className="text-sm italic tracking-wide text-[#c1c8c5]">
                        Your private collection is awaiting curation.
                    </p>
                </div>
            </header>

            <section className="mb-20">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h3 className="mb-1 text-xs tracking-[0.2em] text-[#e2c196]/80 uppercase">
                            Directives
                        </h3>
                        <p className="text-lg">Quick Actions</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {quickActions.map((action) => (
                        <button
                            key={action.title}
                            className={`group flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border p-8 text-center transition-all duration-500 hover:scale-[1.02] ${action.highlighted
                                ? "border-[#e2c196]/20 bg-[#e2c196]/5"
                                : "border-[#e2c196]/10 bg-[#191c1b]/40 backdrop-blur-xl hover:border-[#e2c196]/30"
                                }`}
                        >
                            <action.icon className="mb-4 h-8 w-8 text-[#e2c196] transition-transform duration-500 group-hover:scale-110" />
                            <span className="text-sm font-medium tracking-wide">
                                {action.title}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-20">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h3 className="mb-1 text-xs tracking-[0.2em] text-[#e2c196]/80 uppercase">
                            Curation
                        </h3>
                        <p className="text-lg">Active Projects</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs tracking-widest text-[#e2c196] uppercase transition-opacity hover:opacity-70">
                        View All
                    </button>
                </div>
                <div className="flex snap-x gap-6 overflow-x-auto pb-8">
                    {activeProjects.map((project) => (
                        <article
                            key={project.name}
                            className="group min-w-[320px] snap-start overflow-hidden rounded-2xl border border-[#e2c196]/10 bg-[#191c1b]/40 md:min-w-[400px]"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#111413] to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <span className="rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#1b3531] text-[#9ebbb5]">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <h4 className="text-xl">{project.name}</h4>
                                    <div
                                        className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${project.statusTone === "active"
                                            ? "text-[#e2c196]"
                                            : project.statusTone === "delivered"
                                                ? "text-[#b0cdc6]"
                                                : "text-[#c1c8c5]"
                                            }`}
                                    >
                                        <span className="h-2 w-2 rounded-full bg-current" />
                                        <span>{project.status}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-[#c1c8c5]">
                                        <span>Last Activity</span>
                                        <span>{project.activity}</span>
                                    </div>
                                    <div className="h-[2px] w-full bg-[#323534]">
                                        <div
                                            className="h-full bg-[#e2c196]"
                                            style={{ width: project.progress }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h3 className="mb-1 text-xs tracking-[0.2em] text-[#e2c196]/80 uppercase">
                            Chronicle
                        </h3>
                        <p className="text-lg">Recent Activity</p>
                    </div>
                </div>
                <div className="relative space-y-0">
                    <div className="absolute top-4 bottom-4 left-6 w-px bg-[#414846]/10" />
                    {timelineItems.map((item) => (
                        <article
                            key={item.title}
                            className="group relative flex items-center gap-8 rounded-2xl p-6 transition-colors duration-300 hover:bg-[#191c1b]"
                        >
                            <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#282b29] transition-colors duration-500 group-hover:bg-[#e2c196]/20">
                                <item.icon className="h-5 w-5 text-[#e2c196]" />
                            </div>
                            <div className="flex-1">
                                <div className="mb-1 flex items-center justify-between">
                                    <p className="text-sm font-medium text-[#e1e3e1]">
                                        {item.title}
                                    </p>
                                    <span className="text-[10px] tracking-wider text-[#c1c8c5] uppercase">
                                        {item.time}
                                    </span>
                                </div>
                                <p className="text-xs text-[#c1c8c5]">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-around border-t border-[#e2c196]/10 bg-[#191c1b]/90 px-4 backdrop-blur-lg md:hidden">
                <a className="flex flex-col items-center gap-1 text-[#e2c196]" href="#">
                    <House className="h-4 w-4" />
                    <span className="text-[9px] tracking-tighter uppercase">Home</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-[#e1e3e1]/60" href="#">
                    <Diamond className="h-4 w-4" />
                    <span className="text-[9px] tracking-tighter uppercase">Projects</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-[#e1e3e1]/60" href="#">
                    <History className="h-4 w-4" />
                    <span className="text-[9px] tracking-tighter uppercase">Orders</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-[#e1e3e1]/60" href="#">
                    <UserRound className="h-4 w-4" />
                    <span className="text-[9px] tracking-tighter uppercase">Profile</span>
                </a>
            </nav>
        </section>
    );
}
