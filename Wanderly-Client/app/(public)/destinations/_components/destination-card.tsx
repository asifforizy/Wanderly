import { ArrowRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/validation";
import { Destination } from "@/types/destination";

export function DestinationCard({ destination }: { destination: Destination }) {
    const categoryLabel =
        CATEGORIES.find((category) => category.value === destination.category)?.label ?? destination.category;

    return (
        <Card className="group flex h-full flex-col gap-0 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-brand/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {categoryLabel}
                </span>
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

            <CardContent className="px-4 pb-4">
                <p className="line-clamp-2 text-sm text-muted-foreground">{destination.shortDescription}</p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t bg-transparent p-4">
                <p className="text-sm text-muted-foreground">
                    From
                    <span className="ml-1 text-lg font-bold text-foreground">
                        {destination.currency} {destination.estimatedBudget}
                    </span>
                </p>
                <Button
                    type="button"
                    size="sm"
                    aria-label={`View details for ${destination.name}`}
                    className="bg-brand text-white hover:bg-brand-light"
                >
                    View Details
                    <ArrowRight className="size-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
