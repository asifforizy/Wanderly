import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "./spotlight";

import { getDestinations } from "../destinations/_action/get-destination";
import { TripsTabs } from "./trip-tabs";

export async function HomeDestinations() {
    const result = await getDestinations();

    if (!result.success) {
        return (
            <p className="mx-auto my-16 max-w-7xl rounded-xl border p-8 text-center text-sm text-muted-foreground">
                {result.message}
            </p>
        );
    }

    const list = result.destinations;

    if (list.length === 0) {
        return (
            <p className="mx-auto my-16 max-w-7xl rounded-xl border p-8 text-center text-muted-foreground">
                No destinations yet. Be the first to share one!
            </p>
        );
    }

    return (
        <>
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-sm font-medium text-sun">Trips for every travel style</p>
                        <h2 className="mt-1 text-3xl font-bold tracking-tight">Popular destinations</h2>
                    </div>
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline dark:text-teal-300"
                    >
                        See all destinations
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <TripsTabs destinations={list} />
            </section>

            <Spotlight destination={list[0]} />
        </>
    );
}