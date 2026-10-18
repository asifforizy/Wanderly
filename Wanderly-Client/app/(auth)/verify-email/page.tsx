import { Suspense } from "react";
import { VerifyEmailForm } from "./_components/verify-email-form";


export default function VerifyEmailPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading verification form...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </main>
    );
}