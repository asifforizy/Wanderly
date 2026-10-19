import Link from "next/link";
import { Compass, Heart, Wallet } from "lucide-react";

const items = [
    {
        icon: Wallet,
        title: "Clear budgets",
        text: "Every destination shows an estimated cost up front.",
        href: "/destinations",
        cta: "See destinations",
    },
    {
        icon: Compass,
        title: "One-stop planning",
        text: "Best time to visit, trip length, activities and travel tips in one place.",
        href: "/destinations",
        cta: "Start planning",
    },
    {
        icon: Heart,
        title: "Community driven",
        text: "Real travelers share the places they love, and you can too.",
        href: "/register",
        cta: "Join for free",
    },
];

export function WhyBook() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Why plan with Wanderly</h2>
            <div className="grid gap-8 md:grid-cols-3">
                {items.map(({ icon: Icon, title, text, href, cta }) => (
                    <div key={title} className="flex gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                            <Icon className="size-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                            <Link
                                href={href}
                                className="mt-2 inline-block text-sm font-semibold text-brand hover:underline dark:text-brand-light"
                            >
                                {cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}