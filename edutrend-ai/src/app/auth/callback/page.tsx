"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setToken, setStoredUser } from "@/lib/api";
import { Brain, Loader2 } from "lucide-react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const id = searchParams.get("id") || "";
    const error = searchParams.get("error");

    if (error) {
      router.replace(`/login?error=${error}`);
      return;
    }

    if (token) {
      setToken(token);
      setStoredUser({ id: Number(id), name, email });
      router.replace("/dashboard");
    } else {
      router.replace("/login?error=no_token");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center glow-cyan">
        <Brain className="w-7 h-7 text-white" />
      </div>
      <div className="flex items-center gap-2 text-muted">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Completing sign-in...</span>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
