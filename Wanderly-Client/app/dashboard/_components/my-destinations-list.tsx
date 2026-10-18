import Link from "next/link";
import { MapPinned, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyDestinations } from "../_action/get-my-destinations";
import { MyDestinationCard } from "./my-destination-card";


export async function MyDestinationsList() {
    const result = await getMyDestinations();

    if (!result.success) {
        return (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
                {result.message}
            </div>
        );
    }

    const { destinations } = result;

    return (
        <div className="space-y-6">
            <Card className="max-w-xs">
                <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex size-11 items-center justify-center rounded-full bg-muted">
                        <MapPinned className="size-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{destinations.length}</p>
                        <p className="text-sm text-muted-foreground">Total listings</p>
                    </div>
                </CardContent>
            </Card>

            {destinations.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-xl border p-10 text-center">
                    <p className="text-muted-foreground">You haven&apos;t created any destinations yet.</p>
                    <Button nativeButton={false} render={<Link href="/dashboard/create" />}>
                        <PlusCircle className="size-4" />
                        Create your first destination
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {destinations.map((destination) => (
                        <MyDestinationCard key={destination.id} destination={destination} />
                    ))}
                </div>
            )}
        </div>
    );
}