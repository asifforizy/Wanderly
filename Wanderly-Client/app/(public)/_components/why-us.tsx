import { Heart, ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
    { icon: ShieldCheck, title: "Trusted listings", text: "Every destination is shared by a real, verified traveler." },
    { icon: Wallet, title: "Clear budgets", text: "See estimated costs up front so there are no surprises." },
    { icon: Sparkles, title: "Local insights", text: "Tips, activities and the best season to visit each place." },
    { icon: Heart, title: "Community driven", text: "Share your own finds and help others discover them." },
];

export function WhyChooseUs() {
    return (
        <section className="border-y bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Why choose Wanderly</h2>
                    <p className="mt-2 text-muted-foreground">Everything you need to travel with confidence.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ icon: Icon, title, text }) => (
                        <Card key={title} className="gap-3 p-6">
                            <Icon className="size-6 text-[#3902FF] dark:text-[#7B5CFF]" />
                            <h3 className="font-semibold">{title}</h3>
                            <p className="text-sm text-muted-foreground">{text}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}