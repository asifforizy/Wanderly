import { CATEGORIES } from "@/lib/validation";
import Link from "next/link";


export function Categories() {
    return (
        <section className="border-y bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <p className="text-sm font-medium text-sun">Find your kind of place</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">Destinations for every kind of trip</h2>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {CATEGORIES.map(({ value, label, icon: Icon }) => (
                        <Link
                            key={value}
                            href={`/destinations?category=${value}`}
                            className="group flex flex-col items-center gap-3 rounded-2xl bg-brand p-6 text-center text-white transition-all hover:-translate-y-1 hover:bg-brand-light"
                        >
                            <Icon className="size-8 text-sun" />
                            <span className="text-sm font-semibold">{label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}