"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    const isHome = pathname === "/"

    useEffect(() => {
        const handleScroll = () => {
            // Change state when scrolled past the hero section (approx window height)
            // Using a slightly smaller value (e.g. -100) to transition before hitting the white section
            const heroHeight = window.innerHeight - 100
            setIsScrolled(window.scrollY > heroHeight)
        }

        // Initial check
        handleScroll()

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isTransparent = isHome && !isScrolled

    return (
        <header
            className={cn(
                "left-0 right-0 z-50 transition-all duration-300",
                isHome ? (isScrolled ? "fixed top-0 animate-slide-down" : "absolute top-0") : "sticky top-0",
                isTransparent ? "bg-transparent py-4" : "bg-white border-b shadow-sm py-2"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className={cn(
                    "flex items-center gap-2 font-bold text-xl transition-colors",
                    isTransparent ? "text-white" : "text-brand-dark"
                )}>
                    <Image
                        src="/images/logo.png"
                        alt="Mondial.eco Logo"
                        width={32}
                        height={32}
                        className={cn(
                            "h-8 w-8 transition-all",
                            isTransparent && "brightness-0 invert"
                        )}
                    />
                    Mondial.eco
                </Link>

                <nav className={cn(
                    "hidden md:flex items-center gap-6 text-sm font-medium transition-colors",
                    isTransparent ? "text-white/90" : "text-gray-600"
                )}>
                    <Link href="/" className={cn("hover:text-brand-cyan", isTransparent && "hover:text-white")}>Home</Link>
                    <Link href="/how-it-works" className={cn("hover:text-brand-cyan", isTransparent && "hover:text-white")}>How It Works</Link>
                    <Link href="/pricing" className={cn("hover:text-brand-cyan", isTransparent && "hover:text-white")}>Pricing</Link>
                    <Link href="/investors" className={cn("hover:text-brand-cyan", isTransparent && "hover:text-white")}>For Investors</Link>
                    <Link href="/about" className={cn("hover:text-brand-cyan", isTransparent && "hover:text-white")}>About</Link>
                    <Link href="/contact" className={cn("hover:text-brand-cyan", isTransparent && "hover:text-white")}>Contact</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/start">
                        <Button size="sm" className={cn(
                            "transition-all",
                            isTransparent && "bg-white text-brand-dark hover:bg-gray-100"
                        )}>
                            Start Project
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
