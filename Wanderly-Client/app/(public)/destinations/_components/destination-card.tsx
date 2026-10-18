import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Destination } from "@/types/destination";


export function DestinationCard({ destination }: { destination: Destination }) {
    const title = destination.name ?? destination.title ?? "Untitled destination";
    const image = destination.imageUrl ?? destination.image ?? destination.images?.[0];
    const place =
        destination.location ??
        [destination.city, destination.country].filter(Boolean).join(", ");

    return (
        <Link href={`/destinations/${destination.id}`} className="group block h-full">
            <Card className="h-full gap-0 overflow-hidden p-0 transition-shadow group-hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={image}
                            alt={title}
                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                            <MapPin className="size-8" />
                        </div>
                    )}
                </div>

                <CardHeader className="gap-1 p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
                        {destination.rating ? (
                            <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
                                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                {destination.rating}
                            </span>
                        ) : null}
                    </div>

                    {place ? (
                        <CardDescription className="flex items-center gap-1">
                            <MapPin className="size-4 shrink-0" />
                            <span className="line-clamp-1">{place}</span>
                        </CardDescription>
                    ) : null}
                </CardHeader>

                {destination.description ? (
                    <CardContent className="px-4 pb-2">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {destination.description}
                        </p>
                    </CardContent>
                ) : null}

                {destination.price ? (
                    <CardFooter className="px-4 pb-4 pt-2 text-sm">
                        From <span className="ml-1 text-lg font-bold">${destination.price}</span>
                    </CardFooter>
                ) : null}
            </Card>
        </Link>
    );
}