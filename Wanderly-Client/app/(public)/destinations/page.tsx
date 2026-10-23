import { Suspense } from "react";

import { DestinationsSkeleton } from "./_components/destination-skeliton";
import { DestinationsList } from "./_components/destination-list";
import { DestinationFilters } from "./_components/destination-filters";
import {
    getDestinationFilters,
    type DestinationSearchParams,
} from "./_action/get-destination";

export const metadata = {
    title: "Destinations | Wanderly",
    description: "Explore amazing travel destinations",
};

export default function DestinationsPage({
    searchParams,
}: {
    searchParams: Promise<DestinationSearchParams>;
}) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Destinations</h1>
                <p className="text-muted-foreground">
                    Discover places to visit and plan your next trip.
                </p>
            </div>

            <Suspense
                fallback={
                    <div className="space-y-6">
                        <div className="h-24 animate-pulse rounded-2xl border bg-muted/40" />
                        <DestinationsSkeleton />
                    </div>
                }
            >
                <DestinationsContent searchParams={searchParams} />
            </Suspense>
        </main>
    );
}

async function DestinationsContent({
    searchParams,
}: {
    searchParams: Promise<DestinationSearchParams>;
}) {
    const params = await searchParams;
    const filters = getDestinationFilters(params);

    return (
        <>
            <DestinationFilters filters={filters} />
            <Suspense fallback={<DestinationsSkeleton />}>
                <DestinationsList filters={filters} />
            </Suspense>
        </>
    );
}
