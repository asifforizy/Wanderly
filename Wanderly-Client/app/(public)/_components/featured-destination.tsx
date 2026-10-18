import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DestinationCard } from "../destinations/_components/destination-card";
import { DestinationsSkeleton } from "../destinations/_components/destination-skeliton";
import { getDestinations } from "../destinations/_action/get-destination";

async function FeaturedList() {
  const result = await getDestinations();

  if (!result.success) {
    return (
      <p className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
        {result.message}
      </p>
    );
  }

  const featured = result.destinations.slice(0, 6);

  if (featured.length === 0) {
    return (
      <p className="rounded-xl border p-8 text-center text-muted-foreground">
        No destinations yet. Be the first to share one!
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featured.map((d) => (
        <DestinationCard key={d.id} destination={d} />
      ))}
    </div>
  );
}

export function FeaturedDestinations() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured destinations</h2>
            <p className="mt-2 text-muted-foreground">Fresh picks from our community.</p>
          </div>
          <Button variant="outline" nativeButton={false} render={<Link href="/destinations" />}>
            View all
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <Suspense fallback={<DestinationsSkeleton />}>
          <FeaturedList />
        </Suspense>
      </div>
    </section>
  );
}