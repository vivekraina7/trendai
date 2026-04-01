"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Brain,
  TrendingUp,
  LayoutDashboard,
  Route,
  MessageCircle,
  Info,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/learning-path", label: "Learning Path", icon: Route },
  { href: "/ai-mentor", label: "AI Mentor", icon: MessageCircle },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center glow-cyan">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary-light tracking-tight">
              EduTrend <span className="text-foreground">AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "gradient-primary text-white shadow-lg shadow-cyan-500/20"
                      : "text-muted hover:text-primary-light hover:bg-surface-light/50"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white opacity-80" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-light/30 border border-primary/10">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary-light" />
                  )}
                  <span className="text-sm text-foreground max-w-[120px] truncate">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-primary-light transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-primary-light transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-primary-light"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-primary/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all font-medium ${
                    active
                      ? "gradient-primary text-white shadow-md shadow-cyan-500/20"
                      : "text-muted hover:text-primary-light hover:bg-surface-light/50"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {active && (
                    <span className="ml-auto text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                      active
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="border-t border-primary/10 pt-3 mt-3 flex gap-3">
              {session?.user ? (
                <>
                  <span className="text-sm text-foreground flex items-center gap-1.5">
                    <User className="w-4 h-4 text-primary-light" />
                    {session.user.name || session.user.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-muted hover:text-primary-light"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-muted hover:text-primary-light"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
