"use client";

import { CATEGORIES } from "@/lib/validation";
import { Destination } from "@/types/destination";
import { useState } from "react";
import { DestinationTile } from "./destination-title";

export function TripsTabs({ destinations }: { destinations: Destination[] }) {
    const [active, setActive] = useState("ALL");

    const tabs = [
        { value: "ALL", label: "All" },
        ...CATEGORIES.filter((c) => destinations.some((d) => d.category === c.value)),
    ];

    const visible = (
        active === "ALL" ? destinations : destinations.filter((d) => d.category === active)
    ).slice(0, 4);

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                    <button
                        key={t.value}
                        type="button"
                        onClick={() => setActive(t.value)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active === t.value ? "border-brand bg-brand text-white" : "hover:bg-muted"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {visible.map((d) => (
                    <DestinationTile key={d.id} destination={d} />
                ))}
            </div>
        </div>
    );
}