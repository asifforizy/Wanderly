import { Suspense } from "react";
import { RegisterForm } from "./_components/registerForm";


export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
            <Suspense fallback={<div>Loading registration form...</div>}>
                <RegisterForm />
            </Suspense>
        </main>
    );
}