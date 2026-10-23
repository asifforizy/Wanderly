import Link from "next/link";
import { ArrowRight, Compass, Heart, ShieldCheck } from "lucide-react";

import { BANNER_IMAGE } from "@/assets/home-img";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "About | Wanderly",
    description: "Learn how Wanderly helps travelers plan trips with real budgets, seasons and tips.",
};

const values = [
    {
        icon: Compass,
        title: "Real places",
        text: "Every listing comes from a traveler who has been there, not a brochure written from a desk.",
    },
    {
        icon: Heart,
        title: "Shared generously",
        text: "Budgets, best seasons and honest tips are part of every destination, so planning starts easier.",
    },
    {
        icon: ShieldCheck,
        title: "No surprises",
        text: "See the estimated cost and trip length before you commit, and plan with a clearer picture.",
    },
];

export default function AboutPage() {
    return (
        <main>
            <section className="bg-gradient-to-br from-brand to-brand-light text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-sun">About Wanderly</p>
                    <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Travel planning that feels personal.
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/85">
                        Wanderly is a community of travelers sharing the places they love, with the budgets,
                        seasons and small details that make a trip possible.
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-transparent" />
                </div>

                <div>
                    <p className="text-sm font-medium text-brand dark:text-brand-light">Our story</p>
                    <h2 className="mt-1 text-3xl font-bold tracking-tight">
                        Built on real trips, not glossy brochures.
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        We started Wanderly because the best travel advice rarely comes from a top-ten list. It
                        comes from someone who knows what a week actually costs, when the weather turns, and
                        which corner is worth the walk.
                    </p>
                    <p className="mt-3 text-muted-foreground">
                        So we built a place where travelers can share exactly that. Browse a destination, check
                        the budget and the best time to go, then make the trip your own.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Button
                            className="bg-brand text-white hover:bg-brand-light"
                            nativeButton={false}
                            render={<Link href="/destinations" />}
                        >
                            Explore destinations
                            <ArrowRight className="size-4" />
                        </Button>
                        <Link
                            href="/register"
                            className="text-sm font-semibold text-brand hover:underline dark:text-brand-light"
                        >
                            Join the community
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-y bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium text-brand dark:text-brand-light">What guides us</p>
                    <h2 className="mt-1 text-3xl font-bold tracking-tight">Simple, honest travel planning</h2>

                    <div className="mt-8 grid gap-8 md:grid-cols-3">
                        {values.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                                    <Icon className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-light px-6 py-12 text-center text-white sm:px-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-sun">Start here</p>
                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        Your next trip is closer than you think.
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-white/85">
                        Find a place that fits your budget, or share one you already know by heart.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button
                            size="lg"
                            className="bg-white text-brand hover:bg-white/90"
                            nativeButton={false}
                            render={<Link href="/destinations" />}
                        >
                            Browse destinations
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                            nativeButton={false}
                            render={<Link href="/register" />}
                        >
                            Create a free account
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
