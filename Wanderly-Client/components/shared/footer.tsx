import Link from "next/link";

import Logo from "@/assets/logo";
import { NewsletterForm } from "@/app/(public)/_components/newsletter-form";


const explore = [
    { label: "Destinations", href: "/destinations" },
    { label: "My dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

export function Footer() {
    return (
        <footer className="bg-brand text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                        <Logo className="h-7 w-auto text-white" />
                        Wanderly
                    </Link>
                    <p className="mt-4 max-w-xs text-sm text-white/70">
                        Destinations shared by real travelers, with the budgets and tips you need to plan your next trip.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">Explore</h3>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                        {explore.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="hover:text-white">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">Newsletter</h3>
                    <p className="mb-4 mt-4 text-sm text-white/70">Inspiration and travel news, twice a month.</p>
                    <NewsletterForm />
                </div>
            </div>

            <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
                © {new Date().getFullYear()} Wanderly. All rights reserved.
            </div>
        </footer>
    );
}