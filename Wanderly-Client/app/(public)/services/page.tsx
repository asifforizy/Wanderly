import Link from "next/link";
import {
    CalendarDays,
    Compass,
    LayoutDashboard,
    Sparkles,
    Users,
    Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Services | Wanderly",
    description: "Explore the tools Wanderly gives travelers for discovering places, planning budgets and sharing trips.",
};

const services = [
    {
        icon: Compass,
        title: "Destination discovery",
        text: "Browse places by country, category and budget, with the details that actually matter.",
    },
    {
        icon: Wallet,
        title: "Budget planning",
        text: "See an estimated cost before you commit, and compare trips that fit what you want to spend.",
    },
    {
        icon: CalendarDays,
        title: "Best time to go",
        text: "Check the best season and recommended trip length for every destination on the site.",
    },
    {
        icon: Sparkles,
        title: "Trip tips",
        text: "Read activities and practical travel tips from people who have already been there.",
    },
    {
        icon: Users,
        title: "Community listings",
        text: "Every destination is shared by a real traveler, not written by a marketing team.",
    },
    {
        icon: LayoutDashboard,
        title: "Personal dashboard",
        text: "Create, manage and update your own listings from one simple dashboard.",
    },
];

const steps = [
    {
        number: "01",
        title: "Find a place",
        text: "Search by name or filter by category, then compare destinations at a glance.",
    },
    {
        number: "02",
        title: "Check the details",
        text: "Look at the estimated budget, best season and recommended trip length.",
    },
    {
        number: "03",
        title: "Make it yours",
        text: "Use the tips to shape your own itinerary, then share your own listing when you get back.",
    },
];

export default function ServicesPage() {
    return (
        <main>
            <section className="bg-gradient-to-br from-brand to-brand-light text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-sun">What we offer</p>
                    <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Everything you need for a better trip.
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/85">
                        From the first idea to the final budget, Wanderly keeps the useful details in one place
                        so you can spend less time guessing and more time going.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
                            <div className="flex size-11 items-center justify-center rounded-full bg-brand/10 text-brand dark:bg-brand-light/10 dark:text-brand-light">
                                <Icon className="size-5" />
                            </div>
                            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium text-brand dark:text-brand-light">How it works</p>
                        <h2 className="mt-1 text-3xl font-bold tracking-tight">
                            Three steps from idea to itinerary
                        </h2>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {steps.map((step) => (
                            <div key={step.number} className="rounded-2xl border bg-card p-6">
                                <p className="text-sm font-bold text-sun">{step.number}</p>
                                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border-2 border-brand/30 bg-card p-8 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-brand dark:text-brand-light">Share what you know</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight">
                            Turn your last trip into someone else&apos;s good idea.
                        </h2>
                        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                            Add a destination with your own photos, budget and tips, and manage it from your
                            dashboard.
                        </p>
                    </div>
                    <Button
                        className="bg-brand text-white hover:bg-brand-light"
                        nativeButton={false}
                        render={<Link href="/dashboard/create" />}
                    >
                        Create a listing
                    </Button>
                </div>
            </section>
        </main>
    );
}
