import Link from "next/link";
import {
  TrendingUp,
  Brain,
  Route,
  MessageCircle,
  BarChart3,
  Users,
  BookOpen,
  Zap,
  ArrowRight,
  GraduationCap,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Trend Detection",
    description:
      "Continuously scans global learning platforms, job portals, and academic resources to identify emerging educational trends.",
  },
  {
    icon: Route,
    title: "Personalized Learning Paths",
    description:
      "AI-generated learning roadmaps tailored to your goals, current skills, and the latest industry demands.",
  },
  {
    icon: MessageCircle,
    title: "AI Mentor Chat",
    description:
      "Conversational AI mentor powered by RAG that provides context-aware guidance and actionable learning insights.",
  },
  {
    icon: BarChart3,
    title: "Interactive Analytics",
    description:
      "Rich data visualizations of skill demand, salary trends, course popularity, and career trajectory predictions.",
  },
  {
    icon: Brain,
    title: "Multi-Agent Intelligence",
    description:
      "LangChain agents collaborate to research trends, validate data, and synthesize personalized recommendations.",
  },
  {
    icon: Zap,
    title: "RAG-Powered Insights",
    description:
      "Retrieval-Augmented Generation ensures every recommendation is backed by the most current and relevant data.",
  },
];

const stats = [
  { value: "5K+", label: "Learning Trends Tracked", icon: TrendingUp },
  { value: "10k+", label: "Data Points Analyzed", icon: BarChart3 },
  { value: "2K+", label: "Active Learners", icon: Users },
  { value: "50+", label: "Skill Categories", icon: BookOpen },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Get personalized skill and course recommendations with an AI-based study planner.",
  },
  {
    icon: BookOpen,
    title: "Educators",
    description:
      "Gain insights into trending skills to design relevant, future-ready curriculums.",
  },
  {
    icon: Globe,
    title: "Institutions",
    description:
      "Leverage predictive analytics on education demand and skill gaps.",
  },
  {
    icon: Users,
    title: "Career Counselors",
    description:
      "Access data-backed guidance on career paths and learning roadmaps.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Educational Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Stay Ahead of{" "}
              <span className="text-primary-light glow-text">
                Global Education
              </span>{" "}
              Trends with AI
            </h1>

            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10">
              EduTrend AI analyzes millions of data points from learning
              platforms, job portals, and academic resources to deliver
              personalized, future-ready learning insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-xl gradient-primary text-white font-semibold text-base hover:opacity-90 transition-opacity glow-cyan flex items-center justify-center gap-2"
              >
                Explore Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-mentor"
                className="px-8 py-3 rounded-xl border border-primary/30 text-primary-light font-semibold text-base hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Talk to AI Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-primary/10 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-primary-light">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powered by{" "}
              <span className="text-primary-light">Cutting-Edge AI</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our platform combines RAG pipelines, multi-agent systems, and
              real-time data analysis to deliver unmatched educational
              intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="gradient-card rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for <span className="text-primary-light">Everyone</span> in
              Education
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Whether you&apos;re a student, educator, institution, or career
              counselor, EduTrend AI has insights tailored for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="text-center p-6 rounded-2xl border border-primary/10 hover:border-primary/25 transition-all bg-background/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <uc.icon className="w-7 h-7 text-primary-light" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{uc.title}</h3>
                <p className="text-sm text-muted">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-card rounded-3xl p-10 sm:p-14 border border-primary/20 glow-cyan">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Learning Journey?
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Join thousands of learners and educators who are already using
              EduTrend AI to stay ahead in the ever-changing world of education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 rounded-xl border border-primary/30 text-primary-light font-semibold hover:bg-primary/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
