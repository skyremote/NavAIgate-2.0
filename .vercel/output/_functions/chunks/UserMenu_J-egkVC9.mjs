import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { getUser, onAuthStateChange, signOut } from './auth_DJRV9dYO.mjs';

const UserMenu = ({ initialUser }) => {
  const [user, setUser] = useState(initialUser || null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const menuRef = useRef(null);
  useEffect(() => {
    if (!initialUser) {
      getUser().then(({ user: user2 }) => {
        setUser(user2);
        setIsLoading(false);
      });
    }
    const { data: { subscription } } = onAuthStateChange();
    return () => subscription.unsubscribe();
  }, [initialUser]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 animate-pulse" });
  }
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/auth/login",
          className: "text-gray-300 hover:text-white transition-colors text-sm font-medium",
          children: "Sign in"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/auth/signup",
          className: "px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all",
          children: "Sign up"
        }
      )
    ] });
  }
  const userInitial = user.email?.charAt(0).toUpperCase() || "U";
  const avatarUrl = user.user_metadata?.avatar_url;
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: menuRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors",
        children: [
          avatarUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: avatarUrl,
              alt: "Profile",
              className: "w-8 h-8 rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium", children: userInitial }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-56 rounded-lg bg-gray-800 border border-gray-700 shadow-xl py-1 z-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-gray-700", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium truncate", children: user.email }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: "NavAIgate Account" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "py-1", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/dashboard",
            className: "flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
              "Dashboard"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/dashboard/settings",
            className: "flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors",
            children: [
              /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }),
              "Settings"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-gray-700 py-1", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSignOut,
          className: "flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
            "Sign out"
          ]
        }
      ) })
    ] })
  ] });
};

export { UserMenu as U };
