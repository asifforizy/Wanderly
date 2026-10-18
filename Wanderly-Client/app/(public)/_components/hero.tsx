import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden border-b">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#3902FF]/15 via-background to-[#7B5CFF]/10" />

            <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
                <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                    <Compass className="size-3.5" />
                    Travel smarter with Wanderly
                </span>

                <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    Discover places worth <span className="text-[#3902FF] dark:text-[#7B5CFF]">wandering to</span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                    Browse destinations shared by real travelers, find the best time to go, and plan
                    your next trip with confidence.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button size="lg" nativeButton={false} render={<Link href="/destinations" />}>
                        Explore destinations
                        <ArrowRight className="size-4" />
                    </Button>
                    <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/dashboard/create" />}>
                        Share a destination
                    </Button>
                </div>
            </div>
        </section>
    );
}