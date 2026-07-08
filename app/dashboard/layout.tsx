import { manrope, cormorant } from "@/components/Dashboard/theme"
import DashboardSidebar from "@/components/Dashboard/sidebar"
import QueryProvider from "../context/QueryProvider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <div
        className={`${manrope.variable} ${cormorant.variable} ${manrope.className} min-h-screen`}
        style={{ backgroundColor: "#000000", color: "#f5f5f3" }}
      >
        <DashboardSidebar />
        <main className="min-h-screen lg:ml-[260px]">{children}</main>
      </div>
    </QueryProvider>
  )
}
