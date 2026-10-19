import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/validation";
import { HERO_IMAGE } from "@/assets/home-img";


export function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-brand-dark text-white">
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/80 via-brand-dark/45 to-brand-dark/90" />

            <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
                <p className="text-sm font-medium uppercase tracking-widest text-brand">
                    Welcome to Wanderly
                </p>
                <h1 className="mx-auto mt-4  text-4xl font-bold tracking-tight text-brand sm:text-5xl lg:text-6xl">
                    The whole world, <span className="text-brand-light">in your budget</span>
                </h1>
                <p className="mx-auto mb-40 mt-4 max-w-xl font-medium text-brand-light">
                    Explore destinations shared by real travelers, with budgets, best seasons and tips.
                </p>

                <form
                    action="/destinations"
                    className="mt-10 grid w-full max-w-4xl gap-3 rounded-2xl bg-background p-3 text-foreground shadow-2xl sm:grid-cols-[1fr_200px_auto]"
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
                    <Button type="submit" className="h-11 bg-brand px-6 text-white hover:bg-brand-light">
                        <Search className="size-4" />
                        Search
                    </Button>
                </form>
            </div>
        </section>
    );
}