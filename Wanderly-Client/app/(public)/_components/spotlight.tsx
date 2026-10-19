import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Destination } from "@/types/destination";

export function Spotlight({ destination: d }: { destination: Destination }) {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl border-2 border-brand/30 bg-card p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-10">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.imageUrl} alt={d.name} className="size-full object-cover" />
          </div>

          <div className="lg:pr-4">
            <p className="text-sm font-medium text-brand dark:text-brand-light">Featured destination</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">{d.name}</h2>
            <p className="mt-3 text-muted-foreground">{d.shortDescription}</p>

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-brand dark:text-brand-light" />
                {d.location}, {d.country}
              </li>
              {d.recommendedDuration ? (
                <li className="flex items-center gap-2">
                  <Clock className="size-4 text-brand dark:text-brand-light" />
                  {d.recommendedDuration}
                </li>
              ) : null}
              {d.bestTimeToVisit ? (
                <li className="flex items-center gap-2">
                  <Calendar className="size-4 text-brand dark:text-brand-light" />
                  Best time: {d.bestTimeToVisit}
                </li>
              ) : null}
            </ul>

            {d.activities?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {d.activities.slice(0, 4).map((a) => (
                  <span key={a} className="rounded-full border bg-background px-3 py-1 text-xs">
                    {a}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                est. budget
                <span className="block text-2xl font-bold text-foreground">
                  {d.currency} {d.estimatedBudget}
                </span>
              </p>
              <Button
                size="lg"
                className="bg-brand text-white hover:bg-brand-light"
                nativeButton={false}
                render={<Link href={`/destinations/${d.id}`} />}
              >
                View details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}