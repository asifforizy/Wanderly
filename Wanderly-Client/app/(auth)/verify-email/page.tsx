import { Suspense } from "react";
import { VerifyEmailForm } from "./_components/verify-email-form";


export default function VerifyEmailPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
            <Suspense fallback={<div>Loading verification form...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </main>
    );
}