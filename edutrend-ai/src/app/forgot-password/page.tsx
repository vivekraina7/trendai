"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { apiForgotPassword, apiResetPassword } from "@/lib/api";
import { useRouter } from "next/navigation";

type Step = "email" | "otp" | "done";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiForgotPassword(email);
      if (res.dev_otp) {
        setDevOtp(res.dev_otp); // Show OTP in UI for local dev
      }
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiResetPassword(email, otp, newPassword);
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center glow-cyan">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Reset Password</h1>
          <p className="text-sm text-muted mt-1">
            {step === "email" && "Enter your email to receive a reset code"}
            {step === "otp"   && "Enter the 6-digit code sent to your email"}
            {step === "done"  && "Password updated successfully!"}
          </p>
        </div>

        <div className="gradient-card rounded-2xl border border-primary/10 p-8">
          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-primary/10 text-foreground placeholder-muted focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {/* ── Step 2: OTP + New Password ── */}
          {step === "otp" && (
            <form onSubmit={handleReset} className="space-y-5">
              {/* Dev mode OTP hint */}
              {devOtp && (
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-sm">
                  <div className="font-medium text-warning mb-0.5">🛠 Dev Mode</div>
                  <div className="text-muted">
                    SMTP not configured — your OTP is: <span className="font-mono font-bold text-foreground text-lg">{devOtp}</span>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1.5">6-Digit Reset Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  required
                  maxLength={6}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-primary/10 text-foreground text-center font-mono text-xl tracking-widest placeholder-muted focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface border border-primary/10 text-foreground placeholder-muted focus:outline-none focus:border-primary/40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-2.5 rounded-xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                {loading ? "Updating..." : "Set New Password"}
              </button>
              <button type="button" onClick={() => setStep("email")} className="w-full text-sm text-muted hover:text-foreground flex items-center justify-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </form>
          )}

          {/* ── Step 3: Done ── */}
          {step === "done" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <p className="text-muted text-sm">Your password has been updated. You can now sign in with your new password.</p>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-2.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted mt-6">
          <Link href="/login" className="text-primary-light hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
