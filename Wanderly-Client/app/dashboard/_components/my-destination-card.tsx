import Link from "next/link";
import { MapPin } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteDestinationButton } from "./delete-destination-button";
import { Destination } from "@/types/destination";

export function MyDestinationCard({ destination }: { destination: Destination }) {
    return (
        <Card className="gap-0 overflow-hidden p-0">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={destination.imageUrl} alt={destination.name} className="size-full object-cover" />
            </div>

            <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-lg">{destination.name}</CardTitle>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-4 shrink-0" />
                    <span className="line-clamp-1">
                        {destination.location}, {destination.country}
                    </span>
                </p>
            </CardHeader>

            <CardContent className="px-4 pb-2">
                <p className="line-clamp-2 text-sm text-muted-foreground">{destination.shortDescription}</p>
            </CardContent>

            <CardFooter className="gap-2 px-4 pb-4 pt-2">
                <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/destinations/${destination.id}`} />}
                >
                    View
                </Button>
                <DeleteDestinationButton id={destination.id} name={destination.name} />
            </CardFooter>
        </Card>
    );
}