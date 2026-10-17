
import Link from 'next/link'
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from 'react-icons/fa'

const footerLinks = {
    navigation: [
        { label: 'Home', href: '/' },
        { label: 'Properties', href: '/properties' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
    ],

    services: [
        { label: 'Find a Property', href: '/properties' },
        { label: 'List Your Property', href: '/dashboard' },
        { label: 'Rental Requests', href: '/dashboard' },
        { label: 'Tenant Services', href: '/services' },
    ],
}

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-extrabold"
                        >
                            Wanderly
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                            Wanderly makes travel discovery simple. Browse beautiful destinations, explore the
                            details, and save the places you want to visit — all in one place.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="flex size-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
                            >
                                <FaFacebookF className="size-4" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="flex size-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
                            >
                                <FaInstagram className="size-4" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="Twitter"
                                className="flex size-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
                            >
                                <FaTwitter className="size-4" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="LinkedIn"
                                className="flex size-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
                            >
                                <FaLinkedinIn className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-base font-bold">
                            Navigation
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-base font-bold">
                            Services
                        </h3>

                        <ul className="mt-4 space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base font-bold">
                            Contact Us
                        </h3>

                        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <p>
                                Email:{' '}
                                <a
                                    href="mailto:asifforizy@gmail.com"
                                    className="transition-colors hover:text-foreground"
                                >
                                    asifforizy@gmail.com
                                </a>
                            </p>

                            <p>
                                Phone:{' '}
                                <a
                                    href="tel:+8801626950127"
                                    className="transition-colors hover:text-foreground"
                                >
                                    +880 1626950127
                                </a>
                            </p>

                            <p>
                                Dhaka, Bangladesh
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 border-t pt-6">
                    <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">

                        <p>
                            © 2026 Wanderly. All rights reserved.
                        </p>

                        <div className="flex gap-5">

                            {/* privacy and terms not available right now */}
                            <Link
                                href="/"
                                className="transition-colors hover:text-foreground"
                            >
                                Privacy Policy
                            </Link>


                            <Link
                                href="/"
                                className="transition-colors hover:text-foreground"
                            >
                                Terms of Service
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    )
}
