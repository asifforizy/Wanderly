import Link from "next/link";

import { Button } from "@/components/ui/button";

export function JoinBanner() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-14 text-center text-white sm:px-12">
                <div className="absolute -right-16 -top-16 size-64 rounded-full bg-sun/25 blur-3xl" />
                <div className="relative">
                    <p className="text-sm font-semibold uppercase tracking-widest text-sun">Wanderly members</p>
                    <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
                        Create a free account and share your favorite places
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-white/80">
                        Publish destinations with your own photos, budget and tips, and manage them from your dashboard.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button size="lg" className="bg-sun text-white hover:bg-sun/90" nativeButton={false} render={<Link href="/register" />}>
                            Create a free account
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                            nativeButton={false}
                            render={<Link href="/destinations" />}
                        >
                            Browse destinations
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}