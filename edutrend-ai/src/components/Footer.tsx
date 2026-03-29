import Link from "next/link";
import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-primary-light">
                EduTrend <span className="text-foreground">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              AI-powered educational trend analysis and personalized learning
              recommendations.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-primary-light transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/trends"
                  className="hover:text-primary-light transition-colors"
                >
                  Trend Explorer
                </Link>
              </li>
              <li>
                <Link
                  href="/learning-path"
                  className="hover:text-primary-light transition-colors"
                >
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-mentor"
                  className="hover:text-primary-light transition-colors"
                >
                  AI Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-light transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <span className="hover:text-primary-light transition-colors cursor-pointer">
                  Documentation
                </span>
              </li>
              <li>
                <span className="hover:text-primary-light transition-colors cursor-pointer">
                  API Reference
                </span>
              </li>
              <li>
                <span className="hover:text-primary-light transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              <span className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-primary-light hover:bg-surface-light transition-all cursor-pointer">
                <Github className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-primary-light hover:bg-surface-light transition-all cursor-pointer">
                <Twitter className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-primary-light hover:bg-surface-light transition-all cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-primary-light hover:bg-surface-light transition-all cursor-pointer">
                <Mail className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} EduTrend AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <span className="hover:text-primary-light cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-primary-light cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
