import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import UserMenu from './auth/UserMenu';
import { getUser } from '../lib/auth';
import type { User } from '@supabase/supabase-js';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Apps', href: '#apps' },
  { label: 'Ente-prise', href: 'https://www.ente-prise.com', external: true },
  { label: 'Contact', href: '#contact' },
];

interface NavBarProps {
  showAuth?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showAuth = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(showAuth);

  useEffect(() => {
    if (showAuth) {
      getUser().then(({ user }) => {
        setUser(user);
        setIsLoading(false);
      });
    }
  }, [showAuth]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-gray-900/70 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logos/NavAIgate.svg" alt="NavAIgate" className="h-8 w-auto" />
          <span className="text-white font-semibold text-xl">NavAIgate</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          {showAuth ? (
            isLoading ? (
              <div className="w-24 h-9 bg-gray-800 rounded-full animate-pulse" />
            ) : user ? (
              <UserMenu initialUser={user} />
            ) : (
              <div className="flex items-center gap-3">
                <a href="/auth/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  Sign in
                </a>
                <Button variant="primary" size="sm" shimmer onClick={() => window.location.href = '/auth/signup'}>
                  Sign up
                </Button>
              </div>
            )
          ) : (
            <Button variant="primary" size="sm" shimmer>
              Join Waitlist
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/10 p-2 text-gray-100 backdrop-blur hover:bg-white/20 transition"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <a href="/" className="flex items-center gap-2">
              <img src="/logos/NavAIgate.svg" alt="NavAIgate" className="h-8 w-auto" />
              <span className="text-white font-semibold text-xl">NavAIgate</span>
            </a>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/10 p-2 text-gray-100 hover:bg-white/20 transition"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block text-xl text-gray-200 hover:text-cyan-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              {showAuth ? (
                user ? (
                  <>
                    <a
                      href="/dashboard"
                      className="block text-xl text-gray-200 hover:text-cyan-400 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <Button variant="outline" className="w-full" onClick={() => {
                      import('../lib/auth').then(({ signOut }) => {
                        signOut().then(() => window.location.href = '/');
                      });
                    }}>
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <a
                      href="/auth/login"
                      className="block text-xl text-gray-200 hover:text-cyan-400 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign in
                    </a>
                    <Button variant="primary" shimmer className="w-full" onClick={() => window.location.href = '/auth/signup'}>
                      Sign up
                    </Button>
                  </>
                )
              ) : (
                <Button variant="primary" shimmer className="w-full">
                  Join Waitlist
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
