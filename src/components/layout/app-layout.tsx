'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { usePathname } from 'next/navigation'; // Import for active links
import { AnimatePresence, motion } from 'framer-motion'; // Import for animations

// A simple helper function to combine class names
function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

export function AppLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname(); // Get the current URL path

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // --- Mobile Menu Scroll Lock ---
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    // --- Scrolled Header Effect ---
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // --- Navigation Links ---
    // Define links here to easily map over them
    const navLinks = [
        { href: '/profile', label: "Surgeon's Profile" },
        { href: '/videos', label: 'Video Library' },
        { href: '/faq', label: 'FAQs for Patients' },
        { href: '/ask', label: 'Ask the Surgeon' },
    ];

    // --- Framer Motion Variants for Mobile Menu ---
    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeOut' },
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.2, ease: 'easeIn', staggerChildren: 0.05 },
        },
    };

    const mobileLinkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* =====================================
        HEADER
        =====================================
      */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-300 ease-in-out',
                    isScrolled
                        ? 'bg-background/80 backdrop-blur-sm border-b border-border'
                        : 'bg-transparent border-b border-transparent'
                )}
            >
                <nav className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="text-lg font-semibold tracking-wider sm:text-xl font-serif" // Use the serif font for the name
                    >
                        Dr. Debashis Dutta
                    </Link>

                    {/* --- Desktop Navigation --- */}
                    <div className="hidden items-center tracking-wide space-x-8 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'relative text-sm transition-colors hover:text-primary',
                                    'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full',
                                    pathname === link.href
                                        ? 'text-primary font-medium after:w-full' // Active link style
                                        : 'text-muted-foreground font-light'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* --- Right-side Controls --- */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            aria-label="Toggle theme"
                            className="relative rounded-full"
                        >
                            <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        </Button>

                        <div className="hidden lg:block">
                            <Button asChild className="rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                                <Link href="/videos">Explore the Library</Link>
                            </Button>
                        </div>

                        <div className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMenu}
                                id="mobile-menu-button"
                                aria-label="Open menu"
                                className="rounded-full"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* =====================================
        MOBILE MENU (ANIMATED)
        =====================================
      */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="fixed top-0 left-0 w-full h-full bg-background/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-semibold lg:hidden"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeMenu}
                            className="absolute top-6 right-6 p-2 rounded-full"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </Button>

                        {navLinks.map((link) => (
                            <motion.div key={link.href} variants={mobileLinkVariants}>
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={cn(
                                        'mobile-nav-link transition-colors',
                                        pathname === link.href
                                            ? 'text-primary'
                                            : 'text-foreground hover:text-primary'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div variants={mobileLinkVariants} className="pt-8">
                            <Button asChild size="lg" className="rounded-full" onClick={closeMenu}>
                                <Link href="/videos">
                                    Explore
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =====================================
        MAIN CONTENT
        =====================================
      */}
            <main className="flex-grow pt-24 sm:pt-28">
                <div className="container mx-auto px-6">
                    {children}
                </div>
            </main>

            {/* =====================================
        FOOTER
        =====================================
      */}
            <footer className="py-12 mt-20 border-t bg-muted/20">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-muted-foreground text-sm">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                            Dr. Debashis Dutta
                        </h3>
                        <p className="mt-2 font-light">
                            &copy; {new Date().getFullYear()} All Rights Reserved.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
                        <div className="flex flex-col items-center md:items-start space-y-2 font-light">
                            {navLinks.map((link) => (
                                <Link
                                    key={`footer-${link.href}`}
                                    href={link.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Call to Action */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="font-semibold text-foreground mb-3">Get Started</h4>
                        <p className="font-light mb-4 text-center md:text-left">
                            Explore the video library or ask a question.
                        </p>
                        <Button asChild className="rounded-full" variant="outline">
                            <Link href="/videos">Explore the Library</Link>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}