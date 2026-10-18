const stats = [
  { value: "500+", label: "Destinations" },
  { value: "120+", label: "Countries" },
  { value: "10k+", label: "Travelers" },
  { value: "4.8/5", label: "Average rating" },
];

export function Stats() {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}