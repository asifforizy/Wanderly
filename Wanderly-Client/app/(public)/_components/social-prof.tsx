const bars = [
    { label: "Planning ease", value: 94 },
    { label: "Useful tips", value: 87 },
    { label: "Budget accuracy", value: 81 },
    { label: "Would recommend", value: 91 },
];

export function SocialProof() {
    return (
        <section className="border-t bg-muted/30">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div>
                    <p className="text-sm font-medium text-sun">Happy travelers</p>
                    <h2 className="mt-1 text-3xl font-bold tracking-tight">Trips planned with confidence</h2>
                    <blockquote className="mt-6 border-l-4 border-sun pl-4 text-lg text-muted-foreground">
                        &ldquo;I found a quiet beach I never would have discovered on my own. The budget and the
                        best-season tips were spot on.&rdquo;
                    </blockquote>
                    <p className="mt-3 text-sm font-semibold">Ayesha Rahman, Dhaka</p>
                </div>

                <div className="space-y-5">
                    {bars.map((b) => (
                        <div key={b.label}>
                            <div className="mb-1 flex justify-between text-sm font-medium">
                                <span>{b.label}</span>
                                <span>{b.value}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted">
                                <div className="h-2 rounded-full bg-brand dark:bg-teal-400" style={{ width: `${b.value}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}