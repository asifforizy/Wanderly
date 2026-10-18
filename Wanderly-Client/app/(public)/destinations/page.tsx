import { Suspense } from "react";
import { DestinationsSkeleton } from "./_components/destination-skeliton";
import { DestinationsList } from "./_components/destination-list";


export const metadata = {
    title: "Destinations | Wanderly",
    description: "Explore amazing travel destinations",
};

export default function DestinationsPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Destinations</h1>
                <p className="text-muted-foreground">
                    Discover places to visit and plan your next trip.
                </p>
            </div>

            <Suspense fallback={<DestinationsSkeleton />}>
                <DestinationsList />
            </Suspense>
        </main>
    );
}