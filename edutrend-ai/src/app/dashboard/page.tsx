"use client";

import { useEffect, useReducer, useState } from "react";
import {
  TrendingUp,
  Users,
  BookOpen,
  BriefcaseBusiness,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { apiGetTrends, apiGetTopTrending, type Trend } from "@/lib/api";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

// -- Historical trend chart data (kept static as it's projective) --
const trendData = [
  { month: "Jan", ai: 4200, web: 3800, data: 3100, cloud: 2800 },
  { month: "Feb", ai: 4600, web: 3700, data: 3400, cloud: 2900 },
  { month: "Mar", ai: 5100, web: 3900, data: 3600, cloud: 3100 },
  { month: "Apr", ai: 5800, web: 3600, data: 3900, cloud: 3300 },
  { month: "May", ai: 6400, web: 3500, data: 4100, cloud: 3500 },
  { month: "Jun", ai: 7200, web: 3400, data: 4500, cloud: 3700 },
  { month: "Jul", ai: 7800, web: 3300, data: 4800, cloud: 3600 },
  { month: "Aug", ai: 8500, web: 3200, data: 5200, cloud: 3900 },
];

const platformShare = [
  { name: "Coursera", value: 32, color: "#06b6d4" },
  { name: "Udemy", value: 28, color: "#0891b2" },
  { name: "edX", value: 18, color: "#22d3ee" },
  { name: "LinkedIn Learning", value: 12, color: "#67e8f9" },
  { name: "Others", value: 10, color: "#164e63" },
];

const salaryTrend = [
  { year: "2022", entry: 55, mid: 85, senior: 130 },
  { year: "2023", entry: 60, mid: 92, senior: 140 },
  { year: "2024", entry: 65, mid: 100, senior: 155 },
  { year: "2025", entry: 72, mid: 110, senior: 170 },
  { year: "2026", entry: 78, mid: 120, senior: 185 },
];

const summaryCards = [
  { title: "Trending Skills", value: "2,847", change: "+12.5%", up: true,  icon: TrendingUp },
  { title: "Active Learners", value: "25,340", change: "+8.2%",  up: true,  icon: Users },
  { title: "Courses Tracked", value: "14,205", change: "+15.3%", up: true,  icon: BookOpen },
  { title: "Job Matches",     value: "9,102",  change: "-2.1%",  up: false, icon: BriefcaseBusiness },
];

export default function DashboardPage() {
  const [mounted, mount] = useReducer(() => true, false);
  useEffect(mount, [mount]);

  const [topTrending, setTopTrending] = useState<{ name: string; growth: string; tag: string }[]>([]);
  const [skillDemand, setSkillDemand] = useState<{ skill: string; demand: number }[]>([]);
  const [radarData, setRadarData] = useState([
    { subject: "AI/ML",       A: 95, fullMark: 100 },
    { subject: "Web Dev",     A: 72, fullMark: 100 },
    { subject: "Data Science",A: 88, fullMark: 100 },
    { subject: "Cloud",       A: 80, fullMark: 100 },
    { subject: "Security",    A: 65, fullMark: 100 },
    { subject: "Mobile",      A: 58, fullMark: 100 },
  ]);

  useEffect(() => {
    // Load top trending items for the sidebar list
    apiGetTopTrending(5)
      .then(({ top_trending }) => {
        setTopTrending(
          top_trending.map((t: Trend) => ({
            name: t.name,
            growth: `+${Math.round(t.growth_pct)}%`,
            tag: t.growth_pct > 200 ? "Hot" : t.growth_pct > 100 ? "Rising" : "Steady",
          }))
        );
      })
      .catch(() => {});

    // Load all trends for the skill demand bar chart
    apiGetTrends()
      .then(({ trends }) => {
        // Top 8 by demand for bar chart
        const sorted = [...trends].sort((a, b) => b.demand - a.demand).slice(0, 8);
        setSkillDemand(sorted.map((t: Trend) => ({ skill: t.name.split(" ")[0], demand: Math.round(t.demand) })));

        // Aggregate demand by category for radar
        const catMap: Record<string, number[]> = {};
        trends.forEach((t: Trend) => { (catMap[t.category] ??= []).push(t.demand); });
        const avg = (arr: number[]) => Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);
        setRadarData([
          { subject: "AI/ML",        A: avg(catMap["ai"]       ?? [95]), fullMark: 100 },
          { subject: "Web Dev",      A: avg(catMap["web"]      ?? [72]), fullMark: 100 },
          { subject: "Data Science", A: avg(catMap["data"]     ?? [88]), fullMark: 100 },
          { subject: "Cloud",        A: avg(catMap["cloud"]    ?? [80]), fullMark: 100 },
          { subject: "Security",     A: avg(catMap["security"] ?? [65]), fullMark: 100 },
          { subject: "Mobile",       A: avg(catMap["mobile"]   ?? [58]), fullMark: 100 },
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Analytics <span className="text-primary-light">Dashboard</span>
        </h1>
        <p className="text-muted">
          Real-time overview of global education trends, skill demand, and
          learning analytics.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, i) => (
          <div
            key={card.title}
            className="gradient-card rounded-xl p-5 border border-primary/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <card.icon className="w-5 h-5 text-primary-light" />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  card.up ? "text-success" : "text-danger"
                }`}
              >
                {card.up ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-sm text-muted">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      {mounted && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Trend Area Chart */}
            <div className="lg:col-span-2 gradient-card rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-4">
                Learning Trend Growth
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="dataGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f2847",
                      border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ai"
                    stroke="#06b6d4"
                    fill="url(#aiGrad)"
                    strokeWidth={2}
                    name="AI/ML"
                  />
                  <Area
                    type="monotone"
                    dataKey="data"
                    stroke="#22d3ee"
                    fill="url(#dataGrad)"
                    strokeWidth={2}
                    name="Data Science"
                  />
                  <Area
                    type="monotone"
                    dataKey="cloud"
                    stroke="#67e8f9"
                    fill="none"
                    strokeWidth={1.5}
                    name="Cloud"
                  />
                  <Area
                    type="monotone"
                    dataKey="web"
                    stroke="#164e63"
                    fill="none"
                    strokeWidth={1.5}
                    name="Web Dev"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Trending */}
            <div className="gradient-card rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-4">
                Top Trending Topics
              </h3>
              <div className="space-y-4">
                {topTrending.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted w-4">{i + 1}</span>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <span className="text-xs text-success">
                          {item.growth}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.tag === "Hot"
                          ? "bg-danger/20 text-danger"
                          : item.tag === "Rising"
                            ? "bg-warning/20 text-warning"
                            : "bg-primary/20 text-primary-light"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Skill Demand Bar Chart */}
            <div className="gradient-card rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-4">Skill Demand Index</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={skillDemand} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                  <XAxis
                    type="number"
                    stroke="#94a3b8"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <YAxis
                    dataKey="skill"
                    type="category"
                    stroke="#94a3b8"
                    fontSize={11}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f2847",
                      border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                    }}
                  />
                  <Bar dataKey="demand" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Platform Share Pie Chart */}
            <div className="gradient-card rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-4">
                Platform Market Share
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={platformShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {platformShare.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f2847",
                      border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {platformShare.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-1.5 text-xs text-muted"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="gradient-card rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-4">
                Industry Demand Radar
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e3a5f" />
                  <PolarAngleAxis
                    dataKey="subject"
                    stroke="#94a3b8"
                    fontSize={11}
                  />
                  <Radar
                    name="Demand"
                    dataKey="A"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f2847",
                      border: "1px solid rgba(6,182,212,0.2)",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Salary Trends */}
          <div className="gradient-card rounded-xl p-6 border border-primary/10">
            <h3 className="text-lg font-semibold mb-4">
              Salary Trends by Experience (in $K)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f2847",
                    border: "1px solid rgba(6,182,212,0.2)",
                    borderRadius: "8px",
                    color: "#e2e8f0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="senior"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ fill: "#06b6d4" }}
                  name="Senior"
                />
                <Line
                  type="monotone"
                  dataKey="mid"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  dot={{ fill: "#22d3ee" }}
                  name="Mid-Level"
                />
                <Line
                  type="monotone"
                  dataKey="entry"
                  stroke="#67e8f9"
                  strokeWidth={1.5}
                  dot={{ fill: "#67e8f9" }}
                  name="Entry"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
