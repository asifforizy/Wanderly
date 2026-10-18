"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, LayoutDashboard, PlusCircle } from "lucide-react";

import Logo from "@/assets/logo";

const links = [
    { label: "My listings", href: "/dashboard", icon: LayoutDashboard },
    { label: "Create destination", href: "/dashboard/create", icon: PlusCircle },
    { label: "Browse destinations", href: "/destinations", icon: Compass },
    { label: "Back to home", href: "/", icon: Home },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="border-b bg-card md:min-h-screen md:w-64 md:border-b-0 md:border-r">
            <div className="p-4 md:p-6">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <Logo className="h-6 w-auto text-[#3902FF] dark:text-[#7B5CFF]" />
                    Wanderly
                </Link>
            </div>

            <nav className="flex gap-1 overflow-x-auto px-4 pb-4 md:flex-col md:px-4">
                {links.map(({ label, href, icon: Icon }) => {
                    const isActive = href === "/dashboard" ? pathname === href : pathname.startsWith(href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <Icon className="size-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}