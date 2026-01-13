import { useState, useEffect, useRef } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { signOut, getUser, onAuthStateChange } from '../../lib/auth';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserMenuProps {
  initialUser?: SupabaseUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ initialUser }) => {
  const [user, setUser] = useState<SupabaseUser | null>(initialUser || null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch user on mount if not provided
    if (!initialUser) {
      getUser().then(({ user }) => {
        setUser(user);
        setIsLoading(false);
      });
    }

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [initialUser]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="/auth/login"
          className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
        >
          Sign in
        </a>
        <a
          href="/auth/signup"
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          Sign up
        </a>
      </div>
    );
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || 'U';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            {userInitial}
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gray-800 border border-gray-700 shadow-xl py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm text-white font-medium truncate">{user.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">NavAIgate Account</p>
          </div>

          <div className="py-1">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              Dashboard
            </a>
            <a
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </div>

          <div className="border-t border-gray-700 py-1">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
