"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  Filter,
  ArrowUp,
  Clock,
  Flame,
  ExternalLink,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { apiGetTrends, type Trend } from "@/lib/api";

const CATEGORY_MAP: Record<string, string> = {
  ai: "AI/ML",
  web: "Web Dev",
  data: "Data Science",
  cloud: "Cloud",
  security: "Cybersecurity",
  mobile: "Mobile",
  general: "General",
};

const UI_CATEGORIES = ["All", "AI/ML", "Web Dev", "Data Science", "Cloud", "Cybersecurity", "Mobile"];

// Enrich scraped trends with static descriptions/skills for known items
const ENRICH_MAP: Record<string, { description: string; skills: string[]; timeframe: string }> = {
  "Generative AI & LLMs": {
    description: "LLMs are revolutionizing how we interact with technology. Building, fine-tuning, and deploying LLMs is seeing unprecedented demand.",
    skills: ["Python", "PyTorch", "Transformers", "LangChain", "MLOps"],
    timeframe: "6 months",
  },
  "AI Agents & AutoGen": {
    description: "Multi-agent frameworks like AutoGen and CrewAI enable autonomous AI workflows. Demand for agent engineers is skyrocketing.",
    skills: ["LangChain", "AutoGen", "CrewAI", "Python", "API Design"],
    timeframe: "3 months",
  },
  "RAG Systems": {
    description: "RAG systems combining vector DBs with LLMs for grounded, factual responses are becoming essential in enterprise AI.",
    skills: ["ChromaDB", "Pinecone", "LangChain", "Embeddings", "Python"],
    timeframe: "4 months",
  },
  "Prompt Engineering": {
    description: "Crafting effective prompts is now a standalone skill. High ROI, fast to learn, and in demand across all AI roles.",
    skills: ["Prompt Patterns", "LLM APIs", "Python", "OpenAI", "Gemini"],
    timeframe: "2 months",
  },
  "React / Next.js": {
    description: "Next.js remains the go-to framework for full-stack React apps, especially with AI integration becoming standard.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "API Routes"],
    timeframe: "3 months",
  },
  "TypeScript": {
    description: "TypeScript has become the industry standard for large-scale JavaScript projects, with nearly all modern frameworks defaulting to it.",
    skills: ["TypeScript", "React", "Node.js", "Zod", "Type Guards"],
    timeframe: "3 months",
  },
  "Cloud Computing": {
    description: "Cloud-native architecture, containers, and serverless functions are essential for modern software teams.",
    skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
    timeframe: "5 months",
  },
  "Cybersecurity": {
    description: "With increasing cyber threats, security certifications and zero-trust models are being adopted enterprise-wide.",
    skills: ["Identity Management", "SIEM", "Network Security", "Python", "Cloud Security"],
    timeframe: "6 months",
  },
};

function enrichTrend(trend: Trend) {
  const extra = ENRICH_MAP[trend.name] || {
    description: `${trend.name} is a trending skill in ${CATEGORY_MAP[trend.category] || trend.category} with strong market demand.`,
    skills: [trend.name],
    timeframe: "4 months",
  };
  return { ...trend, ...extra };
}

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"growth_pct" | "demand">("growth_pct");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchTrends = async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await apiGetTrends();
      setTrends(data.trends);
      if (data.trends.length > 0) setFetchedAt(data.trends[0].fetched_at);
    } catch {
      // Keep using fallback data on error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchTrends(); }, []);

  const filtered = trends
    .filter((t) => {
      const uiCat = CATEGORY_MAP[t.category] || "General";
      const matchCat = selectedCategory === "All" || uiCat === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Trend <span className="text-primary-light">Explorer</span>
          </h1>
          <p className="text-muted">
            Emerging educational trends powered by real-time data from GitHub, dev.to & HackerNews.
            {fetchedAt && (
              <span className="ml-2 text-xs opacity-60">
                Last updated: {new Date(fetchedAt).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => fetchTrends(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground bg-surface border border-primary/10 hover:border-primary/20 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trends, skills, or topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-primary/10 text-foreground placeholder-muted focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("growth_pct")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ${
              sortBy === "growth_pct"
                ? "bg-primary/20 text-primary-light border border-primary/30"
                : "bg-surface border border-primary/10 text-muted hover:text-foreground"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Growth
          </button>
          <button
            onClick={() => setSortBy("demand")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ${
              sortBy === "demand"
                ? "bg-primary/20 text-primary-light border border-primary/30"
                : "bg-surface border border-primary/10 text-muted hover:text-foreground"
            }`}
          >
            <Flame className="w-4 h-4" />
            Demand
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Filter className="w-4 h-4 text-muted mt-1.5" />
        {UI_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selectedCategory === cat
                ? "bg-primary/20 text-primary-light border border-primary/30"
                : "bg-surface/50 border border-primary/5 text-muted hover:text-foreground hover:border-primary/15"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="gradient-card rounded-xl border border-primary/10 p-5 animate-pulse">
              <div className="h-5 bg-primary/10 rounded w-1/3 mb-3" />
              <div className="h-3 bg-primary/5 rounded w-1/4" />
            </div>
          ))}
        </div>
      )}

      {/* Trend Cards */}
      {!loading && (
        <div className="space-y-4">
          {filtered.map((trend) => {
            const enriched = enrichTrend(trend);
            const uiCat = CATEGORY_MAP[trend.category] || "General";
            return (
              <div
                key={trend.id}
                className="gradient-card rounded-xl border border-primary/10 overflow-hidden"
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === trend.id ? null : trend.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{trend.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary-light border border-primary/20">
                          {uiCat}
                        </span>
                        {trend.source !== "curated" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                            Live
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1 text-success">
                          <ArrowUp className="w-3 h-3" />+{Math.round(trend.growth_pct)}% growth
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-warning" />
                          {Math.round(trend.demand)}/100 demand
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {enriched.timeframe}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted transition-transform ${
                        expandedId === trend.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedId === trend.id && (
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 border-t border-primary/10">
                      <p className="text-sm text-muted mb-4">{enriched.description}</p>
                      <div className="mb-3">
                        <span className="text-xs text-muted uppercase tracking-wide">Key Skills</span>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {enriched.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary-light border border-primary/15"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted uppercase tracking-wide">Data Source</span>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-surface-light/50 text-muted flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {trend.source === "curated" ? "EduTrend Curated" : trend.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No trends found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
