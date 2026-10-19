import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BANNER_IMAGE } from "@/assets/home-img";


export function JoinBanner() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-2xl bg-brand-dark px-6 py-16 text-center text-white sm:px-12">
                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/90 via-brand-dark/75 to-brand/70" />

                <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Wanderly members</p>
                <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
                    Create a free account and share your favorite places
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-white/85">
                    Publish destinations with your own photos, budget and tips, and manage them from your dashboard.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        size="lg"
                        className="bg-white text-brand-dark hover:bg-white/90"
                        nativeButton={false}
                        render={<Link href="/register" />}
                    >
                        Create a free account
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                        nativeButton={false}
                        render={<Link href="/destinations" />}
                    >
                        Browse destinations
                    </Button>
                </div>
            </div>
        </section>
    );
}