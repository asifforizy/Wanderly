import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promos = [
    {
        tag: "New arrivals",
        title: "Fresh places from our community",
        text: "See the newest destinations added by travelers this week.",
        href: "/destinations",
        cta: "Browse destinations",
        style: "from-brand to-brand-light",
    },
    {
        tag: "Share yours",
        title: "Been somewhere amazing? Tell us",
        text: "Add a destination with tips, budget and the best time to visit.",
        href: "/dashboard/create",
        cta: "Create a listing",
        style: "from-[#b9461a] to-sun",
    },
];

export function PromoCards() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2">
                {promos.map((p) => (
                    <Link
                        key={p.title}
                        href={p.href}
                        className={`group rounded-2xl bg-gradient-to-br ${p.style} p-7 text-white transition-transform hover:-translate-y-1`}
                    >
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{p.tag}</p>
                        <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
                        <p className="mt-2 max-w-md text-sm text-white/85">{p.text}</p>
                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                            {p.cta}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}