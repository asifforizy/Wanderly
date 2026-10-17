'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, LogOut, Menu, User } from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { logout } from '@/service/logout'
import Logo from '@/assets/logo'
import { ModeToggle } from '@/service/mode-toggle'


const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

type IUser = {
  success: boolean
  message: string
  data: {
    profile: {
      id: string
      name: string
      email: string
      profilePhoto: string
      phone: string
      address: string
      role: string
      status: string
      stripeCustomerId: string | null
      createdAt: string
      updatedAt: string
    }
  }
}

type NavbarProps = {
  user: IUser
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('User Logged Out Successfully!')
      setMobileOpen(false)
      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">

          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger >
                <button
                  type="button"
                  className="flex size-9 items-center justify-center rounded-md hover:bg-muted md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 text-xl font-bold"
                    >
                      <Logo className="h-6 w-auto text-[#3902FF] dark:text-[#7B5CFF]" />
                      Wanderly
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-1 px-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href)

                    return (
                      <SheetClose  key={item.href}>
                        <Link
                          href={item.href}
                          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                            ? 'bg-muted font-bold text-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    )
                  })}
                </div>

                <DropdownMenuSeparator className="my-4" />

                {user.success ? (
                  <div className="flex flex-col gap-1 px-1">
                    <div className="px-3 py-1.5">
                      <p className="text-sm font-medium">
                        {user.data.profile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.data.profile.email}
                      </p>
                    </div>

                    <SheetClose>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </Link>
                    </SheetClose>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="px-1">
                    <SheetClose >
                      <Link href="/auth/login">
                        <Button className="w-full cursor-pointer">
                          Login
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <Logo className="h-7 w-auto text-[#3902FF] dark:text-[#7B5CFF]" />
              Wanderly
            </Link>
          </div>

          <div className="hidden flex-1 justify-center items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${isActive
                    ? 'font-bold text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-1 justify-end gap-5">
            <ModeToggle />
            {user.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-full bg-muted transition-opacity hover:opacity-80"
                  >
                    <User className="size-5" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56"
                >

                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {user.data.profile.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.data.profile.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link
                      href="/dashboard"
                      className={`flex cursor-pointer items-center gap-2 ${pathname.startsWith('/dashboard')
                        ? 'font-medium'
                        : ''
                        }`}
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button className="cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}