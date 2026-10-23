import Link from "next/link";
import { Clock, LifeBuoy, Mail, MapPin } from "lucide-react";

import { ContactForm } from "./_components/contact-form";

export const metadata = {
    title: "Contact | Wanderly",
    description: "Get in touch with the Wanderly team for help with your account or a destination listing.",
};

const details = [
    {
        icon: Mail,
        label: "Email",
        value: "asifforizy@gmail.com",
        href: "mailto:asifforizy@gmail.com", 
    },
    {
        icon: Clock,
        label: "Response time",
        value: "Within 2 business days",
        href: null,
    },
    {
        icon: MapPin,
        label: "Based in",
        value: "Dhaka, Bangladesh",
        href: null,
    },
    {
        icon: LifeBuoy,
        label: "Listing help",
        value: "Include the destination name and a link in your message.",
        href: null,
    },
];

export default function ContactPage() {
    return (
        <main>
            <section className="bg-gradient-to-br from-brand to-brand-light text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-sun">Contact</p>
                    <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Let&apos;s plan something great.
                    </h1>
                    <p className="mt-5 max-w-2xl text-white/85">
                        Questions about your account, a listing or the site? Send us a note and a real person
                        will get back to you.
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
                <div>
                    <p className="text-sm font-medium text-brand dark:text-brand-light">Get in touch</p>
                    <h2 className="mt-1 text-3xl font-bold tracking-tight">We&apos;re here to help.</h2>
                    <p className="mt-3 text-muted-foreground">
                        The fastest way to reach us is by email. Tell us what you need and include any useful
                        details so we can help on the first reply.
                    </p>

                    <div className="mt-8 space-y-4">
                        {details.map(({ icon: Icon, label, value, href }) => (
                            <div key={label} className="flex gap-4 rounded-2xl border bg-card p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                                    <Icon className="size-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a href={href} className="font-medium text-brand hover:underline dark:text-brand-light">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="font-medium">{value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-bold tracking-tight">Send us a message</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Fill in the form and we&apos;ll reply within 2 business days.
                    </p>
                    <div className="mt-6">
                        <ContactForm />
                    </div>
                </div>
            </section>

            <section className="border-t bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <p className="text-sm text-muted-foreground">
                        Looking for trip ideas?{" "}
                        <Link
                            href="/destinations"
                            className="font-semibold text-brand hover:underline dark:text-brand-light"
                        >
                            Browse destinations
                        </Link>{" "}
                        or{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-brand hover:underline dark:text-brand-light"
                        >
                            create an account
                        </Link>
                        .
                    </p>
                </div>
            </section>
        </main>
    );
}
