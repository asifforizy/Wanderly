import { Categories } from "./_components/category";
import { CtaBanner } from "./_components/cta-banner";
import { FeaturedDestinations } from "./_components/featured-destination";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Stats } from "./_components/stats";
import { Testimonials } from "./_components/testimonial";
import { WhyChooseUs } from "./_components/why-us";


export const metadata = {
  title: "Wanderly | Discover your next destination",
  description: "Explore and share amazing travel destinations around the world.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedDestinations />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}