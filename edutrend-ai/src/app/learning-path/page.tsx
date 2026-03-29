"use client";

import { useState, useEffect } from "react";
import {
  Route,
  CheckCircle2,
  Circle,
  Clock,
  Star,
  ChevronRight,
  BookOpen,
  Code,
  Brain,
  Database,
  Cloud,
  Shield,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import {
  apiGetPathProgress,
  apiEnroll,
  apiUpdateModule,
  getToken,
} from "@/lib/api";

const pathsMeta = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning Engineer",
    icon: Brain,
    duration: "6-8 months",
    difficulty: "Advanced",
    rating: 4.9,
    learners: "12.5K",
    description:
      "Master the fundamentals through advanced techniques in AI/ML, from neural networks to deploying production systems.",
    color: "#06b6d4",
  },
  {
    id: "fullstack",
    title: "Full-Stack AI Developer",
    icon: Code,
    duration: "5-7 months",
    difficulty: "Intermediate",
    rating: 4.8,
    learners: "9.2K",
    description:
      "Learn to build end-to-end AI-powered web applications with modern frameworks and LLM integration.",
    color: "#22d3ee",
  },
  {
    id: "data",
    title: "Data Science & Analytics",
    icon: Database,
    duration: "5-6 months",
    difficulty: "Intermediate",
    rating: 4.7,
    learners: "8.1K",
    description:
      "From data wrangling to advanced analytics and visualization—become a data-driven decision maker.",
    color: "#67e8f9",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Engineer",
    icon: Cloud,
    duration: "4-6 months",
    difficulty: "Intermediate",
    rating: 4.6,
    learners: "7.3K",
    description:
      "Learn cloud-native architecture, containerization, CI/CD, and infrastructure as code.",
    color: "#0891b2",
  },
  {
    id: "security",
    title: "Cybersecurity Specialist",
    icon: Shield,
    duration: "5-7 months",
    difficulty: "Advanced",
    rating: 4.7,
    learners: "5.8K",
    description:
      "Master cybersecurity fundamentals, ethical hacking, zero-trust architecture, and security operations.",
    color: "#164e63",
  },
];

interface Module {
  title: string;
  lessons: number;
  hours: number;
  index: number;
  status: "completed" | "current" | "locked";
  completed_at: string | null;
}

interface PathProgress {
  enrolled: boolean;
  path_id: string;
  path_title?: string;
  modules: Module[];
  progress_pct: number;
}

export default function LearningPathPage() {
  const [selectedId, setSelectedId] = useState("ai-ml");
  const [progress, setProgress] = useState<Record<string, PathProgress>>({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const isLoggedIn = !!getToken();

  const selectedMeta = pathsMeta.find((p) => p.id === selectedId)!;

  const loadProgress = async (pathId: string) => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const data = (await apiGetPathProgress(pathId)) as PathProgress;
      setProgress((prev) => ({ ...prev, [pathId]: data }));
    } catch {
      // silently fail — show static UI
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    try {
      await apiEnroll(selectedId);
      await loadProgress(selectedId);
    } catch {
      // already enrolled or error
      await loadProgress(selectedId);
    }
  };

  const handleMarkComplete = async (moduleIndex: number, currentStatus: string) => {
    if (!isLoggedIn) return;
    setUpdating(moduleIndex);
    const newStatus = currentStatus === "completed" ? "current" : "completed";
    try {
      await apiUpdateModule(selectedId, moduleIndex, newStatus as "completed" | "current");
      await loadProgress(selectedId);
    } catch {
      // ignore
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    loadProgress(selectedId);
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentProgress = progress[selectedId];
  // Use DB progress if available, else use static defaults
  const modules: Module[] = currentProgress?.modules ?? [];
  const progressPct = currentProgress?.progress_pct ?? 0;
  const enrolled = currentProgress?.enrolled ?? false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Learning <span className="text-primary-light">Paths</span>
        </h1>
        <p className="text-muted">
          AI-curated learning roadmaps aligned with industry demand. Track your
          progress and master in-demand skills.
        </p>
      </div>

      {/* AI Recommendation Badge */}
      <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary-light" />
        </div>
        <div>
          <div className="text-sm font-medium text-primary-light">
            AI Recommendation
          </div>
          <div className="text-sm text-muted">
            Based on trending skills and your profile, we recommend the{" "}
            <span className="text-foreground font-medium">
              AI &amp; Machine Learning Engineer
            </span>{" "}
            path. It aligns with the highest-growth skills in the job market.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Path List */}
        <div className="lg:col-span-1 space-y-3">
          {pathsMeta.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedId(path.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedId === path.id
                  ? "gradient-card border-primary/30 glow-cyan"
                  : "bg-surface/50 border-primary/5 hover:border-primary/15"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${path.color}15` }}
                >
                  <path.icon className="w-5 h-5" style={{ color: path.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{path.title}</div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-warning" />
                      {path.rating}
                    </span>
                    {/* Show progress % if enrolled */}
                    {progress[path.id]?.enrolled && (
                      <span className="text-primary-light">
                        {progress[path.id].progress_pct}%
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-muted transition-transform ${
                    selectedId === path.id ? "text-primary-light" : ""
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Path Details */}
        <div key={selectedId} className="lg:col-span-2">
          <div className="gradient-card rounded-2xl border border-primary/10 p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${selectedMeta.color}15` }}
              >
                <selectedMeta.icon
                  className="w-7 h-7"
                  style={{ color: selectedMeta.color }}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{selectedMeta.title}</h2>
                <p className="text-sm text-muted mt-1">{selectedMeta.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-light/50 text-muted">
                <Clock className="w-4 h-4" /> {selectedMeta.duration}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-light/50 text-muted">
                <Star className="w-4 h-4 text-warning" /> {selectedMeta.rating} rating
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-light/50 text-muted">
                <BookOpen className="w-4 h-4" /> {selectedMeta.learners} learners
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-light/50 text-muted">
                <Route className="w-4 h-4" /> {selectedMeta.difficulty}
              </span>
            </div>
          </div>

          {/* Enroll / Progress Bar */}
          {!isLoggedIn ? (
            <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between">
              <span className="text-sm text-muted">Sign in to track your progress</span>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </div>
          ) : !enrolled ? (
            <div className="mb-6">
              <button
                onClick={handleEnroll}
                className="w-full py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Route className="w-5 h-5" />
                Start This Path
              </button>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-primary-light">{progressPct}%</span>
              </div>
              <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Module List */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 gradient-card rounded-xl border border-primary/10 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {modules.map((mod) => (
                <div
                  key={mod.index}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    mod.status === "current"
                      ? "gradient-card border-primary/30 glow-cyan"
                      : mod.status === "completed"
                        ? "bg-surface/30 border-success/20"
                        : "bg-surface/20 border-primary/5 opacity-60"
                  }`}
                >
                  <div className="shrink-0">
                    {mod.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    ) : mod.status === "current" ? (
                      <div className="w-6 h-6 rounded-full border-2 border-primary animate-pulse flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-muted/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{mod.title}</div>
                    <div className="text-xs text-muted">
                      {mod.lessons} lessons &middot; {mod.hours} hours
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {mod.status === "current" && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary-light">
                        In Progress
                      </span>
                    )}
                    {mod.status === "completed" && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-success/20 text-success">
                        Completed
                      </span>
                    )}
                    {/* Mark complete button — only for enrolled users on current/completed modules */}
                    {isLoggedIn && enrolled && mod.status !== "locked" && (
                      <button
                        onClick={() => handleMarkComplete(mod.index, mod.status)}
                        disabled={updating === mod.index}
                        title={mod.status === "completed" ? "Mark as in-progress" : "Mark as complete"}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface hover:bg-primary/10 border border-primary/10 transition-colors disabled:opacity-50"
                      >
                        <CheckCheck className={`w-3.5 h-3.5 ${mod.status === "completed" ? "text-success" : "text-muted"}`} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Not enrolled yet — show static preview */}
              {!enrolled && !loading && modules.length === 0 && (
                <p className="text-center text-sm text-muted py-8">
                  Click <strong>Start This Path</strong> to begin tracking your progress.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
