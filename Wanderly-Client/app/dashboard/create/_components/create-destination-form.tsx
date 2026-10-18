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
import { CreateDestinationSchema, CreateDestinationValues } from "@/lib/validation";


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

export function CreateDestinationForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CreateDestinationValues>({
        resolver: zodResolver(CreateDestinationSchema),
        defaultValues: {
            name: "",
            description: "",
            country: "",
            city: "",
            price: "",
            imageUrl: "",
        },
    });

    const { errors } = form.formState;
    const descriptionLength = form.watch("description").length;

    const onSubmit = async (values: CreateDestinationValues) => {
        try {
            setLoading(true);

            const result = await createDestination({
                name: values.name,
                description: values.description,
                country: values.country,
                city: values.city,
                price: values.price ? Number(values.price) : undefined,
                imageUrl: values.imageUrl || undefined,
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
                onSubmit={form.handleSubmit(onSubmit, () =>
                    toast.error("Please fix the form errors")
                )}
            >
                <div className="space-y-6 px-6 py-6">
                    {/* Details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Name"
                            htmlFor="name"
                            error={errors.name?.message}
                            className="sm:col-span-2"
                        >
                            <Input
                                id="name"
                                placeholder="Cox's Bazar Beach"
                                {...form.register("name")}
                            />
                        </Field>

                        <Field label="Country" htmlFor="country" error={errors.country?.message}>
                            <Input
                                id="country"
                                placeholder="Bangladesh"
                                {...form.register("country")}
                            />
                        </Field>

                        <Field label="City" htmlFor="city" error={errors.city?.message}>
                            <Input
                                id="city"
                                placeholder="Cox's Bazar"
                                {...form.register("city")}
                            />
                        </Field>

                        <Field
                            label="Description"
                            htmlFor="description"
                            error={errors.description?.message}
                            className="sm:col-span-2"
                        >
                            <Textarea
                                id="description"
                                rows={4}
                                placeholder="Describe the place, best time to visit, things to do..."
                                {...form.register("description")}
                            />
                            <p className="text-right text-xs text-muted-foreground">
                                {descriptionLength} / 2000
                            </p>
                        </Field>
                    </div>

                    <div className="border-t" />

                    {/* Optional */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Price (USD)"
                            htmlFor="price"
                            error={errors.price?.message}
                            hint="Optional"
                        >
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="any"
                                placeholder="100"
                                {...form.register("price")}
                            />
                        </Field>

                        <Field
                            label="Image URL"
                            htmlFor="imageUrl"
                            error={errors.imageUrl?.message}
                            hint="Optional. Must start with https://"
                        >
                            <Input
                                id="imageUrl"
                                placeholder="https://example.com/photo.jpg"
                                {...form.register("imageUrl")}
                            />
                        </Field>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t bg-muted/40 px-6 py-3">
                    <Button
                        type="button"
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/dashboard" />}
                    >
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