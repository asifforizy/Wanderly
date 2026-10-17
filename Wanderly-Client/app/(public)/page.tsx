// app/page.tsx — Wanderly home (static). Navbar and footer live in app/layout.tsx.
import Link from "next/link";
import { Manrope } from "next/font/google";
import { CalendarDays, MapPin, Plus, Search } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

type SceneKey = "bali" | "alps" | "kyoto" | "santorini";

/* Replace each <Scene /> with <Image /> once you have real photos
   (add the host to images.remotePatterns in next.config). */
const featured: {
  id: string; name: string; country: string; category: string;
  text: string; budget: string; scene: SceneKey;
}[] = [
    { id: "bali", name: "Bali", country: "Indonesia", category: "Beach", text: "Rice terraces, temples and surf beaches in one island.", budget: "~$900", scene: "bali" },
    { id: "swiss-alps", name: "Swiss Alps", country: "Switzerland", category: "Mountains", text: "Alpine villages, scenic rail lines and high-altitude trails.", budget: "~$2,200", scene: "alps" },
    { id: "kyoto", name: "Kyoto", country: "Japan", category: "Cultural", text: "Historic temples, tea houses and quiet lantern-lit streets.", budget: "~$1,500", scene: "kyoto" },
    { id: "santorini", name: "Santorini", country: "Greece", category: "Coastal", text: "Whitewashed cliffside towns above the Aegean caldera.", budget: "~$1,300", scene: "santorini" },
  ];

const categories = [
  { name: "Beach", bg: "bg-[#2E8B72]" },
  { name: "Mountains", bg: "bg-[#3F6B5C]" },
  { name: "Nature", bg: "bg-[#174D3A]" },
  { name: "Cultural", bg: "bg-[#8A6D3B]" },
  { name: "Coastal", bg: "bg-[#2F7C8A]" },
  { name: "City", bg: "bg-[#33413B]" },
];

const benefits = [
  { Icon: MapPin, title: "Curated destinations", text: "Editorial picks across beaches, mountains, culture and cities." },
  { Icon: CalendarDays, title: "Practical planning info", text: "Best time to visit, suggested duration, activities and tips." },
  { Icon: Search, title: "Search and filter", text: "Combine search, category and budget to find the right fit." },
  { Icon: Plus, title: "Share your own", text: "Sign in to add and manage destinations you want to share." },
];

const testimonials = [1, 2, 3].map((n) => ({
  id: n,
  quote: "[Testimonial text — one or two sentences from a traveler.]",
  name: "[Traveler name]",
  place: "[City, Country]",
}));

function Scene({ kind, label }: { kind: SceneKey; label: string }) {
  const common = {
    viewBox: "0 0 400 240",
    preserveAspectRatio: "xMidYMid slice",
    role: "img" as const,
    "aria-label": label,
    className: "block h-[190px] w-full",
  };
  switch (kind) {
    case "bali":
      return (
        <svg {...common}>
          <rect width="400" height="240" fill="#F1E4CC" />
          <circle cx="290" cy="80" r="34" fill="#DCC6A1" />
          <path d="M0 150 Q100 120 200 150 T400 140 V240 H0Z" fill="#2E8B72" />
          <path d="M0 190 Q100 165 200 190 T400 185 V240 H0Z" fill="#174D3A" />
        </svg>
      );
    case "alps":
      return (
        <svg {...common}>
          <rect width="400" height="240" fill="#DCE8E3" />
          <circle cx="310" cy="70" r="28" fill="#fff" />
          <path d="M0 200 L90 90 L160 160 L240 60 L330 170 L400 120 V240 H0Z" fill="#3F7A66" />
          <path d="M0 225 L120 150 L240 205 L400 160 V240 H0Z" fill="#174D3A" />
        </svg>
      );
    case "kyoto":
      return (
        <svg {...common}>
          <rect width="400" height="240" fill="#EFE6D6" />
          <circle cx="90" cy="70" r="30" fill="#DCC6A1" />
          <path d="M110 150 H290 L270 130 H130Z" fill="#103B2D" />
          <rect x="140" y="150" width="120" height="50" fill="#174D3A" />
          <path d="M0 200 H400 V240 H0Z" fill="#2E8B72" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect width="400" height="240" fill="#E3EFEC" />
          <circle cx="320" cy="64" r="26" fill="#DCC6A1" />
          <path d="M0 130 H400 V240 H0Z" fill="#3F8F9A" />
          <path d="M0 130 L60 110 L130 125 L200 100 L280 128 L400 112 V150 H0Z" fill="#fff" />
        </svg>
      );
  }
}

const btn =
  "inline-flex min-h-12 items-center justify-center rounded-lg border px-[26px] text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCC6A1]";

export default function HomePage() {
  return (
    <main className={`${manrope.className} bg-[#FAF9F6] text-[#1F2933]`}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#103B2D] pb-[150px] pt-[120px]">
        <svg
          viewBox="0 0 1440 640"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <circle cx="1090" cy="250" r="90" fill="#DCC6A1" opacity=".9" />
          <path d="M0 470 L220 300 L380 400 L560 240 L760 410 L960 320 L1180 440 L1440 330 V640 H0Z" fill="#1E5A47" />
          <path d="M0 540 L260 420 L460 510 L700 400 L920 520 L1200 430 L1440 520 V640 H0Z" fill="#174D3A" />
          <path d="M0 600 L300 540 L620 590 L980 545 L1440 595 V640 H0Z" fill="#0C2F24" />
        </svg>
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-8">
          <h1 className="mb-5 max-w-[720px] text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[64px]">
            Find Your Next Great Escape
          </h1>
          <p className="mb-[34px] max-w-[560px] text-xl leading-relaxed text-[#D6E2DC]">
            Explore extraordinary places, discover hidden gems, and find inspiration for your next adventure.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/items" className={`${btn} border-transparent bg-white text-[#103B2D] hover:bg-[#F1ECE1]`}>
              Explore Destinations
            </Link>
            <Link href="/about" className={`${btn} border-white/60 text-white hover:bg-white/10`}>
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured destinations */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-2.5 text-[34px] font-bold leading-tight tracking-tight text-[#103B2D]">Featured destinations</h2>
              <p className="text-[17px] leading-relaxed text-[#6B7280]">Hand-picked places to start planning your trip.</p>
            </div>
            <Link href="/items" className={`${btn} border-[#174D3A] text-[#174D3A] hover:bg-[#174D3A] hover:text-white`}>
              View all destinations
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((d) => (
              <article key={d.id} className="overflow-hidden rounded-xl border border-[#E8E5DF] bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(16,59,45,0.10)]">
                <Scene kind={d.scene} label={`${d.name} photo placeholder`} />
                <div className="px-[22px] pb-[22px] pt-5">
                  <span className="text-[13px] font-semibold text-[#174D3A]">{d.category}</span>
                  <h3 className="mb-0.5 mt-1.5 text-xl font-bold">{d.name}</h3>
                  <p className="mb-3 text-sm text-[#6B7280]">{d.country}</p>
                  <p className="mb-[18px] text-[15px] leading-relaxed text-[#4B5563]">{d.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      From <b className="text-[#1F2933]">{d.budget}</b>
                    </span>
                    <Link href={`/items/${d.id}`} className="text-sm font-bold text-[#174D3A] hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-[#6B7280]">Budgets are illustrative estimates per trip, not guaranteed prices.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <h2 className="mb-2.5 text-[34px] font-bold leading-tight tracking-tight text-[#103B2D]">Popular categories</h2>
          <p className="mb-8 text-[17px] leading-relaxed text-[#6B7280]">Browse by the kind of trip you want.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/items?category=${encodeURIComponent(c.name)}`}
                className={`flex min-h-[150px] items-end rounded-xl p-[18px] text-lg font-bold text-white transition-opacity hover:opacity-90 ${c.bg}`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Wanderly */}
      <section className="border-y border-[#E8E5DF] bg-white py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="mb-12 max-w-[620px]">
            <h2 className="mb-2.5 text-[34px] font-bold leading-tight tracking-tight text-[#103B2D]">Why choose Wanderly</h2>
            <p className="text-[17px] leading-relaxed text-[#6B7280]">
              Destination inspiration combined with the practical information you need to plan.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, text }) => (
              <div key={title}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#E7EFEA]">
                  <Icon className="h-[22px] w-[22px] text-[#174D3A]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="text-[15px] leading-relaxed text-[#6B7280]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <h2 className="mb-9 text-[34px] font-bold leading-tight tracking-tight text-[#103B2D]">What travelers say</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.id} className="m-0 rounded-xl border border-[#E8E5DF] bg-white px-[22px] pb-[22px] pt-5">
                <blockquote className="mb-5 text-base leading-relaxed">{t.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-[#E7EFEA]" aria-hidden="true" />
                  <span className="text-[15px] font-bold">
                    {t.name}
                    <span className="block text-[13px] font-medium text-[#6B7280]">{t.place}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-[#103B2D] px-8 py-14 md:px-12">
            <div>
              <h2 className="mb-2 text-[32px] font-bold leading-tight text-white">Ready for your next adventure?</h2>
              <p className="text-[17px] text-[#C9D6CF]">Start exploring destinations today.</p>
            </div>
            <Link href="/items" className={`${btn} border-transparent bg-[#DCC6A1] text-[#103B2D] hover:bg-[#E6D4B5]`}>
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}