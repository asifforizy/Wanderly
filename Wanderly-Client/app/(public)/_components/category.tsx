import { CATEGORIES } from "@/lib/validation";
import { Destination } from "@/types/destination";
import Link from "next/link";


export function Categories({ destinations }: { destinations: Destination[] }) {
    return (
        <section className="border-y bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <p className="text-sm font-medium text-brand dark:text-brand-light">Find your kind of place</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">Destinations for every kind of trip</h2>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {CATEGORIES.map(({ value, label, icon: Icon }) => {
                        const image = destinations.find((d) => d.category === value)?.imageUrl;

                        return (
                            <Link
                                key={value}
                                href={`/destinations?category=${value}`}
                                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand text-white"
                            >
                                {image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={image}
                                        alt={label}
                                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : null}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                                    <Icon className="size-5" />
                                    <span className="text-sm font-semibold">{label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}