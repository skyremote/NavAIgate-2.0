import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';
import UserMenu from './auth/UserMenu';
import { getUser } from '../lib/auth';
import type { User } from '@supabase/supabase-js';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface AppLink {
  label: string;
  href: string;
  description: string;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Portfolio', href: '/portfolio/bluplai-claude-code' },
  { label: 'Apps', href: '/#apps' },
  { label: 'Contact', href: '/#contact' },
];

const appLinks: AppLink[] = [
  { label: 'Ente-prise', href: 'https://www.ente-prise.com', description: 'Enterprise solutions' },
  { label: 'Still Me', href: 'https://stillme.navaigate.dev/', description: 'Personal identity' },
  { label: 'Bluplai', href: 'https://bluplai.com/', description: 'AI platform' },
];

interface NavBarProps {
  showAuth?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showAuth = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(showAuth);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAuth) {
      getUser().then(({ user }) => {
        setUser(user);
        setIsLoading(false);
      });
    }
  }, [showAuth]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAppsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          {/* Our Apps Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              Our Apps
              <ChevronDown className={`h-4 w-4 transition-transform ${appsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {appsDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-xl py-2">
                {appLinks.map((app) => (
                  <a
                    key={app.href}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 hover:bg-white/5 transition-colors"
                    onClick={() => setAppsDropdownOpen(false)}
                  >
                    <div className="text-white text-sm font-medium">{app.label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{app.description}</div>
                  </a>
                ))}
              </div>
            )}
          </div>

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
            <Button variant="primary" size="sm" shimmer onClick={() => (window as any).openWaitlist?.()}>
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
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-3xl">
          <div className="flex items-center justify-between px-4 py-4">
            <a href="/" className="flex items-center gap-2">
              <img src="/logos/NavAIgate.svg" alt="NavAIgate" className="h-8 w-auto" />
              <span className="text-white font-semibold text-xl">NavAIgate</span>
            </a>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white hover:bg-white/20 transition"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Contained Card Menu */}
          <div className="mx-4 mt-4 p-6 rounded-2xl bg-gray-800/90 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block text-xl text-white font-semibold hover:text-cyan-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Our Apps Section */}
            <div className="pt-4 border-t border-gray-600">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Apps</span>
              <div className="mt-3 space-y-4 ml-4 border-l-2 border-gray-600 pl-4">
                {appLinks.map((app) => (
                  <a
                    key={app.href}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="text-gray-300 hover:text-white transition-colors">{app.label}</div>
                    <div className="text-xs text-gray-500">{app.description}</div>
                  </a>
                ))}
              </div>
            </div>

            {showAuth ? (
              user ? (
                <>
                  <a
                    href="/dashboard"
                    className="block text-xl text-white font-semibold hover:text-cyan-400 transition-colors"
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
                    className="block text-xl text-white font-semibold hover:text-cyan-400 transition-colors"
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
              <Button variant="primary" shimmer className="w-full" onClick={() => {
                setMenuOpen(false);
                (window as any).openWaitlist?.();
              }}>
                Join Waitlist
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
