
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent scrolling when mobile menu is open
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 bg-background/80 backdrop-blur-sm border-b">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold tracking-wider sm:text-xl">
            <Link href="/" onClick={closeMenu}>Dr. Debashis Dutta</Link>
          </div>
          <div className="hidden items-center space-x-8 font-light lg:flex">
            <Link href="/profile" className="transition-colors hover:text-primary nav-link">Surgeon's Profile</Link>
            <Link href="/videos" className="transition-colors hover:text-primary nav-link">Video Library</Link>
            <Link href="/faq" className="transition-colors hover:text-primary nav-link">FAQs for Patients</Link>
            <Link href="/ask" className="transition-colors hover:text-primary nav-link">Ask the Surgeon</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
              className="relative"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <div className="hidden lg:block">
              <Link href="/videos">
                <Button variant="default">
                    Explore the Library
                </Button>
              </Link>
            </div>
            <div className="lg:hidden">
              <button onClick={toggleMenu} id="mobile-menu-button" className="p-2" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
         <div id="mobile-menu" className="fixed top-0 left-0 w-full h-full bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-semibold lg:hidden">
            <button onClick={closeMenu} className="absolute top-6 right-6 p-2" aria-label="Close menu"><X className="w-8 h-8" /></button>
            <Link href="/profile" onClick={closeMenu} className="mobile-nav-link">Surgeon's Profile</Link>
            <Link href="/videos" onClick={closeMenu} className="mobile-nav-link">Video Library</Link>
            <Link href="/faq" onClick={closeMenu} className="mobile-nav-link">FAQs for Patients</Link>
            <Link href="/ask" onClick={closeMenu} className="mobile-nav-link">Ask the Surgeon</Link>
            <Link href="/videos" onClick={closeMenu} className="mobile-nav-link">
                <div className="bg-primary text-primary-foreground px-8 py-3 rounded-full">Explore</div>
            </Link>
        </div>
      )}
      
      <main className="flex-grow pt-24 sm:pt-28">
        <div className="container mx-auto px-6">
            {children}
        </div>
      </main>

      <footer className="py-8 mt-20 border-t">
          <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-center text-sm font-light">
              <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Dr. Debashis Dutta. All Rights Reserved.</p>
              <Link href="/videos">
                  <Button variant="ghost">
                      Explore the Library
                  </Button>
              </Link>
          </div>
      </footer>
    </div>
  );
}
