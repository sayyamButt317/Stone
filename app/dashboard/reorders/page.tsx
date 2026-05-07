import {
    Archive,
    History,
    Search,
    Sparkles,
    Store,
    UserRound,
    View,
} from "lucide-react";

type ReorderItem = {
    name: string;
    description: string;
    lastOrdered: string;
    price: string;
    image: string;
};

const reorderItems: ReorderItem[] = [
    {
        name: "Eternal Solitaire",
        description:
            "Hand-carved 18k gold band with a brilliant-cut center stone.",
        lastOrdered: "Oct 12, 2023",
        price: "$4,250",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC3E3KbeGYlW3gKffsnSYbHY0-JK6eftoJDMuwwcYObsNxrUpS709Gfr2cQbOoL6eFLH92KBC5q-2Kd1Ikz6mMaAQu5Dm3LnxsxRRQhLXijVb4pCyBACQJlulsxSUMeMaNp_Lv8Yj-oHfV4D1HyrK9wNw5FNFLVbd1WX7KqsKZRfLEGYfEgacj5BGqrRJAYCgR-X8d6Lp9XTerGJkS397BbZlWSgawEGYPFcueHPYVMIli94IGKEfPcjabrI8GPy6lABSZoqR6kupc",
    },
    {
        name: "Nocturnal Pearl",
        description:
            "Deep sea Tahitian pearl on a delicate rose gold chain.",
        lastOrdered: "Aug 24, 2023",
        price: "$1,800",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBEgh-3-xf5sEEfLIaI8N9m-LjGlhqSSOJjHiD89vBk3e0k7A0Sre8MhNcw3dyjuCvSjame5g_toOUWD0n_cpnhVModyrFUeyYogyOoi3nd6i8BJ8-bbqEBBFsG-Rp8hdhBspGr2kngQCCdeid5GcDhqxBVN7lQNfDsTALInAm4vRljiuQDEhQbqhiE5JbTdzVNhv-O3M0ImQieWVLtzJ_tX38jPhFELFn_LBWcqpBwYx8qSwtYHG_wULuz6v7ySX2sCi1cCEyxo5Y",
    },
    {
        name: "Azure Drops",
        description:
            "Tear-drop sapphires surrounded by a halo of micro-diamonds.",
        lastOrdered: "May 05, 2023",
        price: "$3,100",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB6GyE6SiXPxQI1_WzPimslg9mD07duLy2oDYOIwvPh7DjCaRGuNwckex0Jrx23_7nBYsoevksLu8ULvufia1vnC9gcTuPPqXi6w2GVKUpnuFX3b2dF3cMtXamDBpLUZGdG2xDpTOSf0QHUJlvPxSd2QwjzoZ3Dkdqpd2Bx-tm1y24AgcBaaLe5JzHZ8oA8eU0TVyH06Ks9wRcGOU13vef6oiankHeKXuzgTyZJ0S8FU9yun-KsNZPEBeR9KVnroTKPdDARzsF69F4",
    },
];

const filterPills = ["Date Range", "Rings", "Necklaces", "Status"];

export default function ReordersPage() {
    return (
        <section className="min-h-screen bg-[#111413] px-4 pt-10 pb-24 text-[#e1e3e1] md:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-16">
                    <h1 className="mb-4 text-5xl font-light tracking-tight text-[#e2c196] md:text-6xl">
                        Reorders
                    </h1>
                    <p className="max-w-2xl text-lg font-light text-[#c1c8c5]">
                        Quickly reorder your previous purchases from the
                        L&apos;Atelier archives.
                    </p>
                </header>

                <section className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#e2c196]/60" />
                        <input
                            type="text"
                            placeholder="Search your vault..."
                            className="w-full rounded-xl border border-[#414846]/15 bg-[#191c1b] py-4 pr-4 pl-12 text-[#e1e3e1] placeholder:text-neutral-600 transition-all focus:border-[#e2c196]/40 focus:ring-1 focus:ring-[#e2c196]/40 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="mr-2 text-xs font-bold tracking-widest text-[#e2c196]/60 uppercase">
                            Filters:
                        </span>
                        {filterPills.map((pill) => (
                            <button
                                key={pill}
                                className="rounded-full bg-[#314c47] px-6 py-2 text-xs font-bold tracking-widest text-[#9ebbb5] uppercase transition-all hover:bg-[#e2c196] hover:text-[#412d0d]"
                            >
                                {pill}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {reorderItems.map((item) => (
                        <article
                            key={item.name}
                            className="group overflow-hidden rounded-2xl border border-[#e2c196]/10 bg-[#191c1b]/60 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        >
                            <div className="h-80 overflow-hidden bg-[#323534]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8">
                                <div className="mb-6 flex flex-col gap-2">
                                    <h3 className="text-2xl text-[#e2c196]">{item.name}</h3>
                                    <p className="text-sm font-light text-[#c1c8c5]">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                                    <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
                                        <span className="text-neutral-500">Last Ordered</span>
                                        <span className="text-[#e1e3e1]">
                                            {item.lastOrdered}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-light text-[#e2c196]">
                                            {item.price}
                                        </span>
                                        <button className="rounded-md bg-linear-to-tr from-[#e2c196] to-[#a58860] px-6 py-2 text-[10px] font-bold tracking-widest text-[#412d0d] uppercase shadow-lg shadow-[#e2c196]/20 transition-all hover:shadow-[#e2c196]/40 active:scale-95">
                                            Reorder
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <section className="mt-32 flex flex-col items-center text-center">
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#e2c196]/10 bg-[#1d201f]">
                        <Archive className="h-10 w-10 text-[#e2c196]/40" />
                    </div>
                    <h2 className="mb-2 text-3xl text-[#e2c196]/80">
                        The Archive is Quiet
                    </h2>
                    <p className="mb-8 max-w-sm font-light text-[#c1c8c5]">
                        No other past treasures were found in your digital vault.
                        Ready to discover your next heirloom?
                    </p>
                    <button className="rounded-full border border-[#e2c196] px-10 py-3 text-xs font-bold tracking-[0.2em] text-[#e2c196] uppercase transition-all duration-300 hover:bg-[#e2c196]/10">
                        Explore Products
                    </button>
                </section>
            </div>

            <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-around bg-neutral-950/90 px-4 backdrop-blur-lg md:hidden">
                <div className="flex flex-col items-center gap-1 text-neutral-500">
                    <Store className="h-5 w-5" />
                    <span className="text-[8px] tracking-widest uppercase">Store</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[#e2c196]">
                    <History className="h-5 w-5" />
                    <span className="text-[8px] tracking-widest uppercase">Vault</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-500">
                    <View className="h-5 w-5" />
                    <span className="text-[8px] tracking-widest uppercase">Gallery</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-neutral-500">
                    <UserRound className="h-5 w-5" />
                    <span className="text-[8px] tracking-widest uppercase">Account</span>
                </div>
            </nav>
        </section>
    );
}
