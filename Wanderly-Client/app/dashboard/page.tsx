import Link from "next/link";
import { Suspense } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DestinationsSkeleton } from "../(public)/destinations/_components/destination-skeliton";
import { MyDestinationsList } from "./_components/my-destinations-list";

export const metadata = {
    title: "Dashboard | Wanderly",
};

export default function DashboardPage() {
    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">My listings</h1>
                    <p className="text-muted-foreground">Manage the destinations you&apos;ve created.</p>
                </div>

                <Button nativeButton={false} render={<Link href="/dashboard/create" />}>
                    <PlusCircle className="size-4" />
                    Create destination
                </Button>
            </div>

            <Suspense fallback={<DestinationsSkeleton />}>
                <MyDestinationsList />
            </Suspense>
        </div>
    );
}