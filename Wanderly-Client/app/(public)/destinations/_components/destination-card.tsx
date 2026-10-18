import Link from "next/link";
import { MapPin } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Destination } from "@/types/destination";

export function DestinationCard({ destination }: { destination: Destination }) {
    return (
        <Link href={`/destinations/${destination.id}`} className="group block h-full">
            <Card className="h-full gap-0 overflow-hidden p-0 transition-shadow group-hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <CardHeader className="gap-1 p-4 pb-2">
                    <CardTitle className="line-clamp-1 text-lg">{destination.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                        <MapPin className="size-4 shrink-0" />
                        <span className="line-clamp-1">
                            {destination.location}, {destination.country}
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-4 pb-2">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{destination.shortDescription}</p>
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-2 text-sm">
                    From
                    <span className="ml-1 text-lg font-bold">
                        {destination.currency} {destination.estimatedBudget}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    );
}