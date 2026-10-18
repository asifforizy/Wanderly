import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Solo traveler",
    text: "I found a hidden beach I would never have discovered on my own. The tips were spot on.",
  },
  {
    name: "Tanvir Hasan",
    role: "Weekend explorer",
    text: "Clear budgets and the best time to visit saved me hours of research.",
  },
  {
    name: "Nusrat Jahan",
    role: "Family trip planner",
    text: "Planning a family trip finally felt simple. Everything was in one place.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Loved by travelers</h2>
        <p className="mt-2 text-muted-foreground">What our community says.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <Card key={r.name} className="gap-4 p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
            <div>
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}