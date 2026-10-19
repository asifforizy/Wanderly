"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
    const [email, setEmail] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("Thanks for subscribing!");
                setEmail("");
            }}
            className="flex gap-2"
        >
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button type="submit" className="bg-brand text-white hover:bg-brand-light">
                Subscribe
            </Button>
        </form>
    );
}