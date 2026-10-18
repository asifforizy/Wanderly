import { Card } from "@/components/ui/card";

export function DestinationsSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="gap-0 overflow-hidden p-0">
                    <div className="aspect-[4/3] animate-pulse bg-muted" />
                    <div className="space-y-3 p-4">
                        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </div>
                </Card>
            ))}
        </div>
    );
}