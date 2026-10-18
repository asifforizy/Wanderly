import Link from "next/link";
import { MapPin } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Destination } from "@/types/destination";
import { DeleteDestinationButton } from "./delete-destination-button";

export function MyDestinationCard({ destination }: { destination: Destination }) {
    const title = destination.name ?? destination.title ?? "Untitled destination";
    const image = destination.imageUrl ?? destination.image ?? destination.images?.[0];
    const place =
        destination.location ?? [destination.city, destination.country].filter(Boolean).join(", ");

    return (
        <Card className="gap-0 overflow-hidden p-0">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={title} className="size-full object-cover" />
                ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                        <MapPin className="size-8" />
                    </div>
                )}
            </div>

            <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
                {place ? (
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0" />
                        <span className="line-clamp-1">{place}</span>
                    </p>
                ) : null}
            </CardHeader>

            {destination.description ? (
                <CardContent className="px-4 pb-2">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
                </CardContent>
            ) : null}

            <CardFooter className="gap-2 px-4 pb-4 pt-2">
                <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/destinations/${destination.id}`} />}
                >
                    View
                </Button>
                <DeleteDestinationButton id={destination.id} name={title} />
            </CardFooter>
        </Card>
    );
}