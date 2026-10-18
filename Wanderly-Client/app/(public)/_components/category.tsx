import Link from "next/link";
import { Building2, Landmark, Mountain, TreePine, Umbrella, Waves } from "lucide-react";

import { Card } from "@/components/ui/card";

const categories = [
  { label: "Beach", icon: Umbrella },
  { label: "Mountains", icon: Mountain },
  { label: "Nature", icon: TreePine },
  { label: "Cultural", icon: Landmark },
  { label: "Coastal", icon: Waves },
  { label: "City", icon: Building2 },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">Pick the kind of trip you are dreaming of.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ label, icon: Icon }) => (
          <Link key={label} href="/destinations" className="group">
            <Card className="items-center gap-3 p-6 text-center transition-all group-hover:-translate-y-1 group-hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-[#3902FF]/10">
                <Icon className="size-6" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}