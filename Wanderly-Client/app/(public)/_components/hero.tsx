import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/validation";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-light/60 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 size-96 rounded-full bg-sun/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-white/70">
          Welcome to Wanderly
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          The whole world, one search away.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Explore destinations shared by real travelers, with budgets, best seasons and tips.
        </p>

        <form
          action="/destinations"
          className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-2xl bg-background p-3 text-foreground shadow-2xl sm:grid-cols-[1fr_200px_auto]"
        >
          <Input name="searchTerm" placeholder="Where do you want to go?" className="h-11" />
          <select
            name="category"
            className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <Button type="submit" className="h-11 bg-sun px-6 text-white hover:bg-sun/90">
            <Search className="size-4" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}