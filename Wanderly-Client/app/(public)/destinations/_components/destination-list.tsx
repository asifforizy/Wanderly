
import { getDestinations } from "../_action/get-destination";
import { DestinationCard } from "./destination-card";

export async function DestinationsList() {
    const result = await getDestinations();

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
                No destinations found yet.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
            ))}
        </div>
    );
}