import AdminSidebar from "@/components/Dashboard/sidebar";
import QueryProvider from "../context/QueryProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <div className="flex min-h-screen h-full bg-[#111413]">
                <AdminSidebar />
                <main className="h-full flex-1 overflow-x-hidden md:ml-[280px]">{children}</main>
            </div>
        </QueryProvider>
    );
}
