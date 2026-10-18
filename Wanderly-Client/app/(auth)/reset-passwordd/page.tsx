import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/reset-passwordForm";


export default function ResetPasswordPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading reset form...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    );
}