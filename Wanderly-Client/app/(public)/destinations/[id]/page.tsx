import Link from "next/link";
import { Suspense } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    MapPin,
    Tag,
    Wallet,
    type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/validation";
import { DestinationCard } from "../_components/destination-card";
import { getDestination, getRelatedDestinations } from "../_action/get-destination-by-id";

export const metadata = {
    title: "Destination Details | Wanderly",
    description: "View destination details and plan your next trip.",
};

export default function DestinationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/destinations" />}
            >
                <ArrowLeft className="size-4" />
                Back to destinations
            </Button>

            <Suspense fallback={<DestinationDetailSkeleton />}>
                <DestinationDetail params={params} />
            </Suspense>
        </main>
    );
}

async function DestinationDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const result = await getDestination(id);

    if (!result.success) {
        return (
            <div className="mt-8 rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-12">
                <p className="text-sm font-semibold tracking-wide text-brand uppercase dark:text-brand-light">
                    {result.notFound ? "404" : "Something went wrong"}
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {result.notFound ? "Destination not found" : "Unable to load destination"}
                </h1>
                <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
                    {result.message}
                </p>
                <Button
                    className="mt-6 bg-brand text-white hover:bg-brand-light"
                    nativeButton={false}
                    render={<Link href="/destinations" />}
                >
                    Back to destinations
                </Button>
            </div>
        );
    }

    const destination = result.destination;
    const related = await getRelatedDestinations(id);

    const categoryLabel =
        CATEGORIES.find((category) => category.value === destination.category)?.label ??
        destination.category;
    const addedOn = formatDate(destination.createdAt);

    return (
        <article className="mt-6">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="size-full object-cover"
                    />
                </div>

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand dark:bg-brand-light/10 dark:text-brand-light">
                            {categoryLabel}
                        </span>
                        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                            {destination.currency} {destination.estimatedBudget}
                        </span>
                    </div>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        {destination.name}
                    </h1>

                    <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0" />
                        {destination.location}, {destination.country}
                    </p>

                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {destination.shortDescription}
                    </p>
                </div>
            </div>

            <section className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight">Key information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <SpecCard
                        icon={CalendarDays}
                        label="Best time to visit"
                        value={destination.bestTimeToVisit || "Year-round"}
                    />
                    <SpecCard
                        icon={Clock}
                        label="Recommended stay"
                        value={destination.recommendedDuration || "Flexible"}
                    />
                    <SpecCard
                        icon={Wallet}
                        label="Estimated budget"
                        value={`${destination.currency} ${destination.estimatedBudget}`}
                    />
                    <SpecCard
                        icon={Tag}
                        label="Category"
                        value={categoryLabel}
                    />
                </div>
            </section>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                    <section>
                        <h2 className="text-2xl font-bold tracking-tight">
                            About this destination
                        </h2>
                        <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
                            {destination.fullDescription || destination.shortDescription}
                        </p>
                    </section>

                    {destination.activities?.length ? (
                        <section className="mt-8">
                            <h2 className="text-2xl font-bold tracking-tight">Activities</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {destination.activities.map((activity) => (
                                    <span
                                        key={activity}
                                        className="rounded-full border bg-card px-3 py-1 text-sm font-medium"
                                    >
                                        {activity}
                                    </span>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {destination.travelTips?.length ? (
                        <section className="mt-8">
                            <h2 className="text-2xl font-bold tracking-tight">Travel tips</h2>
                            <ul className="mt-4 space-y-3">
                                {destination.travelTips.map((tip) => (
                                    <li
                                        key={tip}
                                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                                    >
                                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-light" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                </div>

                <aside className="h-fit rounded-2xl border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-bold tracking-tight">Additional information</h2>
                    <dl className="mt-4 space-y-4 text-sm">
                        <DetailRow
                            label="Price"
                            value={`${destination.currency} ${destination.estimatedBudget}`}
                        />
                        <DetailRow label="Category" value={categoryLabel} />
                        <DetailRow
                            label="Location"
                            value={`${destination.location}, ${destination.country}`}
                        />
                        {addedOn ? <DetailRow label="Added" value={addedOn} /> : null}
                        {destination.createdBy?.name ? (
                            <DetailRow label="Shared by" value={destination.createdBy.name} />
                        ) : null}
                    </dl>
                </aside>
            </div>

            {related.length ? (
                <section className="mt-12 border-t pt-10">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-brand dark:text-brand-light">
                                Keep exploring
                            </p>
                            <h2 className="mt-1 text-2xl font-bold tracking-tight">
                                Related destinations
                            </h2>
                        </div>
                        <Link
                            href="/destinations"
                            className="text-sm font-semibold text-brand hover:underline dark:text-brand-light"
                        >
                            View all destinations
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((item) => (
                            <DestinationCard key={item.id} destination={item} />
                        ))}
                    </div>
                </section>
            ) : null}
        </article>
    );
}

function SpecCard({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon className="size-4 text-brand dark:text-brand-light" />
                {label}
            </div>
            <p className="mt-2 font-semibold">{value}</p>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium">{value}</dd>
        </div>
    );
}

function DestinationDetailSkeleton() {
    return (
        <div className="mt-6 animate-pulse space-y-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="aspect-[4/3] rounded-2xl bg-muted" />
                <div className="space-y-4">
                    <div className="h-6 w-28 rounded bg-muted" />
                    <div className="h-10 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="h-20 w-full rounded bg-muted" />
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[0, 1, 2, 3].map((item) => (
                    <div key={item} className="h-24 rounded-2xl bg-muted" />
                ))}
            </div>
        </div>
    );
}

function formatDate(value?: string) {
    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}
