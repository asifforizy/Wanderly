"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createDestination } from "../_action/create-destination";
import { CreateDestinationSchema, CreateDestinationValues, DESTINATION_CATEGORIES } from "@/lib/validation";


function Field({
    label,
    htmlFor,
    error,
    hint,
    className,
    children,
}: {
    label: string;
    htmlFor: string;
    error?: string;
    hint?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`space-y-1.5 ${className ?? ""}`}>
            <Label htmlFor={htmlFor} className="text-sm font-medium">
                {label}
            </Label>
            {children}
            {error ? (
                <p className="text-xs text-destructive">{error}</p>
            ) : hint ? (
                <p className="text-xs text-muted-foreground">{hint}</p>
            ) : null}
        </div>
    );
}

const toList = (text: string) =>
    text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

export function CreateDestinationForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CreateDestinationValues>({
        resolver: zodResolver(CreateDestinationSchema),
        defaultValues: {
            name: "",
            country: "",
            location: "",
            shortDescription: "",
            fullDescription: "",
            category: "",
            estimatedBudget: "",
            currency: "USD",
            bestTimeToVisit: "",
            recommendedDuration: "",
            activities: "",
            travelTips: "",
            imageUrl: "",
        },
    });

    const { errors } = form.formState;

    const onSubmit = async (values: CreateDestinationValues) => {
        try {
            setLoading(true);

            const result = await createDestination({
                name: values.name,
                country: values.country,
                location: values.location,
                shortDescription: values.shortDescription,
                fullDescription: values.fullDescription,
                category: values.category,
                estimatedBudget: Number(values.estimatedBudget),
                currency: values.currency,
                bestTimeToVisit: values.bestTimeToVisit,
                recommendedDuration: values.recommendedDuration,
                activities: toList(values.activities),
                travelTips: toList(values.travelTips),
                imageUrl: values.imageUrl,
            });

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success("Destination created successfully");
            router.push("/dashboard");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="gap-0 overflow-hidden p-0">
            <div className="border-b px-6 py-4">
                <h1 className="text-lg font-semibold">New destination</h1>
                <p className="text-sm text-muted-foreground">
                    Fill in the details below to publish a new listing.
                </p>
            </div>

            <form
                onSubmit={form.handleSubmit(onSubmit, (errs) => {
                    console.log("Validation errors:", errs);
                    const first = Object.entries(errs)[0];
                    toast.error(`${first?.[0]}: ${first?.[1]?.message ?? "invalid"}`);
                })}
            >
                <div className="space-y-6 px-6 py-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Name" htmlFor="name" error={errors.name?.message} className="sm:col-span-2">
                            <Input id="name" placeholder="Cox's Bazar Beach" {...form.register("name")} />
                        </Field>

                        <Field label="Country" htmlFor="country" error={errors.country?.message}>
                            <Input id="country" placeholder="Bangladesh" {...form.register("country")} />
                        </Field>

                        <Field label="Location" htmlFor="location" error={errors.location?.message}>
                            <Input id="location" placeholder="Cox's Bazar" {...form.register("location")} />
                        </Field>

                        <Field label="Category" htmlFor="category" error={errors.category?.message}>
                            <select
                                id="category"
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                {...form.register("category")}
                            >
                                <option value="">Select category</option>
                                {DESTINATION_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c.charAt(0) + c.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Image URL" htmlFor="imageUrl" error={errors.imageUrl?.message}>
                            <Input id="imageUrl" placeholder="https://example.com/photo.jpg" {...form.register("imageUrl")} />
                        </Field>
                    </div>

                    <div className="border-t" />

                    <div className="grid gap-4">
                        <Field
                            label="Short description"
                            htmlFor="shortDescription"
                            error={errors.shortDescription?.message}
                            hint="One or two sentences shown on cards."
                        >
                            <Input id="shortDescription" {...form.register("shortDescription")} />
                        </Field>

                        <Field label="Full description" htmlFor="fullDescription" error={errors.fullDescription?.message}>
                            <Textarea id="fullDescription" rows={4} {...form.register("fullDescription")} />
                        </Field>
                    </div>

                    <div className="border-t" />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Estimated budget" htmlFor="estimatedBudget" error={errors.estimatedBudget?.message}>
                            <Input
                                id="estimatedBudget"
                                type="number"
                                min="0"
                                step="any"
                                placeholder="300"
                                {...form.register("estimatedBudget")}
                            />
                        </Field>

                        <Field label="Currency" htmlFor="currency" error={errors.currency?.message}>
                            <Input id="currency" placeholder="USD" {...form.register("currency")} />
                        </Field>

                        <Field label="Best time to visit" htmlFor="bestTimeToVisit" error={errors.bestTimeToVisit?.message}>
                            <Input id="bestTimeToVisit" placeholder="November to March" {...form.register("bestTimeToVisit")} />
                        </Field>

                        <Field label="Recommended duration" htmlFor="recommendedDuration" error={errors.recommendedDuration?.message}>
                            <Input id="recommendedDuration" placeholder="3 days" {...form.register("recommendedDuration")} />
                        </Field>

                        <Field label="Activities" htmlFor="activities" error={errors.activities?.message} hint="One per line.">
                            <Textarea id="activities" rows={4} placeholder={"Swimming\nSunset watching"} {...form.register("activities")} />
                        </Field>

                        <Field label="Travel tips" htmlFor="travelTips" error={errors.travelTips?.message} hint="One per line.">
                            <Textarea id="travelTips" rows={4} placeholder={"Book hotels early\nCarry cash"} {...form.register("travelTips")} />
                        </Field>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t bg-muted/40 px-6 py-3">
                    <Button type="button" variant="outline" nativeButton={false} render={<Link href="/dashboard" />}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                        {loading ? "Saving..." : "Create destination"}
                    </Button>
                </div>
            </form>
        </Card>
    );
}