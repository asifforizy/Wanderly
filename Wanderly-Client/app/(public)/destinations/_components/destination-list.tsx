import Link from "next/link";

import { getDestinations, type DestinationFilters } from "../_action/get-destination";
import { DestinationCard } from "./destination-card";

export async function DestinationsList({ filters }: { filters: DestinationFilters }) {
    const result = await getDestinations({ ...filters, limit: 50 });
    const hasFilters = Boolean(filters.search || filters.category || filters.budget);

    if (!result.success) {
        return (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
                {result.message}
            </div>
        );
    }

    if (result.destinations.length === 0) {
        return (
            <div className="rounded-xl border p-10 text-center text-muted-foreground">
                <p>{hasFilters ? "No destinations match your filters." : "No destinations found yet."}</p>
                {hasFilters ? (
                    <Link
                        href="/destinations"
                        className="mt-3 inline-block text-sm font-semibold text-brand hover:underline dark:text-brand-light"
                    >
                        Clear filters
                    </Link>
                ) : null}
            </div>
        );
    }

    const total = result.total ?? result.destinations.length;

    return (
        <div>
            <p className="mb-4 text-sm text-muted-foreground">
                {result.destinations.length < total
                    ? `Showing ${result.destinations.length} of ${total} destinations`
                    : `${total} destination${total === 1 ? "" : "s"} found`}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.destinations.map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                ))}
            </div>
        </div>
    );
}
