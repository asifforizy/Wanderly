import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./_components/dashboard-sidebar";



export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) redirect("/login");

    return (
        <div className="min-h-screen bg-background md:flex">
            <DashboardSidebar />
            <div className="min-w-0 flex-1 p-4 sm:p-8">{children}</div>
        </div>
    );
}