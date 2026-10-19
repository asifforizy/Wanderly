import { Suspense } from "react";
import { Hero } from "./_components/hero";
import { Categories } from "./_components/category";
import { DestinationsSkeleton } from "./destinations/_components/destination-skeliton";
import { PromoCards } from "./_components/promo-cards";
import { WhyBook } from "./_components/why-book";
import { HomeDestinations } from "./_components/home-destinations";
import { JoinBanner } from "./_components/join-banner";
import { SocialProof } from "./_components/social-prof";


export const metadata = {
  title: "Wanderly | The whole world, one search away",
  description: "Discover destinations shared by real travelers and plan your next trip.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PromoCards />
      <WhyBook />
      <Categories />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <DestinationsSkeleton />
          </div>
        }
      >
        <HomeDestinations />
      </Suspense>
      <JoinBanner />
      <SocialProof />
    </main>
  );
}