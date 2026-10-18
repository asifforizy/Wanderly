import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#3902FF] to-[#7B5CFF] px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready for your next adventure?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Join Wanderly to discover new places and share the ones you love.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" nativeButton={false} render={<Link href="/register" />}>
            Get started free
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            nativeButton={false}
            render={<Link href="/destinations" />}
          >
            Browse destinations
          </Button>
        </div>
      </div>
    </section>
  );
}