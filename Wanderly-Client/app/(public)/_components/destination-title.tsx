import { Destination } from "@/types/destination";
import Link from "next/link";

export function DestinationTile({ destination: d }: { destination: Destination }) {
    return (
        <Link
            href={`/destinations/${d.id}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={d.imageUrl}
                alt={d.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-xs uppercase tracking-wide text-white/70">{d.category.toLowerCase()}</p>
                <h3 className="mt-1 text-xl font-semibold">{d.name}</h3>
                <p className="text-sm text-white/80">
                    {d.location}, {d.country}
                </p>
                <p className="mt-2 text-sm">
                    <span className="font-bold">
                        {d.currency} {d.estimatedBudget}
                    </span>{" "}
                    est. budget
                </p>
            </div>
        </Link>
    );
}