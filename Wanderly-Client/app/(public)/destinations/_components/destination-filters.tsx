import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/validation";
import type { DestinationFilters as Filters } from "../_action/get-destination";

const budgets = [
    { value: "", label: "Any budget" },
    { value: "low", label: "Low (under 500)" },
    { value: "medium", label: "Medium (500 - 1,500)" },
    { value: "high", label: "High (over 1,500)" },
];

export function DestinationFilters({ filters }: { filters: Filters }) {
    const hasFilters = Boolean(filters.search || filters.category || filters.budget);

    return (
        <form
            action="/destinations"
            className="mb-6 grid gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_180px_200px_auto]"
        >
            <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    name="search"
                    defaultValue={filters.search}
                    placeholder="Search destinations or countries"
                    aria-label="Search destinations"
                    className="h-11 pl-9"
                />
            </div>

            <select
                name="category"
                defaultValue={filters.category ?? ""}
                aria-label="Filter by category"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <option value="">All categories</option>
                {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>

            <select
                name="budget"
                defaultValue={filters.budget ?? ""}
                aria-label="Filter by budget"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {budgets.map((budget) => (
                    <option key={budget.value} value={budget.value}>
                        {budget.label}
                    </option>
                ))}
            </select>

            <div className="flex items-center gap-3">
                <Button type="submit" className="h-11 flex-1 bg-brand px-6 text-white hover:bg-brand-light">
                    <Search className="size-4" />
                    Search
                </Button>
                {hasFilters ? (
                    <Link
                        href="/destinations"
                        className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Clear
                    </Link>
                ) : null}
            </div>
        </form>
    );
}
