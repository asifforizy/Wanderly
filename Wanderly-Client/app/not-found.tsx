import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted px-4">
            <div className="text-center space-y-6 max-w-md">

                <div className="space-y-2">
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        404
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full" />
                </div>


                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                </div>

                <div className="pt-4">
                    <Button size="lg" className="w-full sm:w-auto">
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>

                <div className="pt-8 flex justify-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary/40" />
                    <div className="h-2 w-2 rounded-full bg-primary/60" />
                    <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
            </div>
        </main>
    )
}