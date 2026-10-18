import { Compass, MapPinned, Plane } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Explore",
    text: "Browse destinations by category, location and budget.",
  },
  {
    icon: MapPinned,
    title: "Plan",
    text: "Check the best time to visit, trip length, activities and travel tips.",
  },
  {
    icon: Plane,
    title: "Go",
    text: "Book your trip with everything you need already in hand.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <p className="mt-2 text-muted-foreground">Three simple steps from idea to adventure.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="text-center">
            <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[#3902FF]/10 text-[#3902FF] dark:text-[#7B5CFF]">
              <Icon className="size-7" />
              <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}