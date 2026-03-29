import {
  Brain,
  TrendingUp,
  Route,
  MessageCircle,
  Database,
  Cpu,
  Users,
  Globe,
  Layers,
  GitBranch,
  Code2,
  BarChart3,
  Zap,
  Shield,
  Server,
  Palette,
} from "lucide-react";

const techStack = [
  {
    title: "Frontend",
    items: ["React.js / Next.js", "Tailwind CSS", "Chart.js / Recharts"],
    icon: Palette,
  },
  {
    title: "Backend",
    items: ["Node.js + Express", "FastAPI (Python)"],
    icon: Server,
  },
  {
    title: "Databases",
    items: ["MongoDB (User Data)", "PostgreSQL (Trends Data)"],
    icon: Database,
  },
  { title: "AI Models", items: ["GPT-5 / Llama 3", "LangChain"], icon: Brain },
  {
    title: "RAG Pipeline",
    items: ["LangChain + ChromaDB", "Pinecone Vector DB"],
    icon: Layers,
  },
  {
    title: "Agents",
    items: ["LangChain Agents", "CrewAI / AutoGen"],
    icon: Cpu,
  },
  {
    title: "Data Processing",
    items: ["Python, Pandas", "BeautifulSoup, Scrapy"],
    icon: BarChart3,
  },
  {
    title: "Deployment",
    items: ["AWS / Render / Vercel", "Docker, CI/CD"],
    icon: Globe,
  },
  {
    title: "Auth & Security",
    items: ["Firebase Auth / OAuth2", "JWT Tokens"],
    icon: Shield,
  },
  { title: "Version Control", items: ["GitHub", "Git Flow"], icon: GitBranch },
];

const architecture = [
  {
    icon: Globe,
    title: "Data Collection Layer",
    description:
      "Scrapers and APIs continuously gather data from Coursera, Udemy, LinkedIn, Indeed, and academic resources.",
  },
  {
    icon: Database,
    title: "Data Processing & Storage",
    description:
      "Raw data is processed with Pandas, stored in PostgreSQL for trends, and MongoDB for user profiles.",
  },
  {
    icon: Layers,
    title: "RAG Pipeline",
    description:
      "Documents are embedded and stored in ChromaDB/Pinecone. Context is retrieved to augment LLM responses.",
  },
  {
    icon: Cpu,
    title: "Multi-Agent System",
    description:
      "Specialized agents handle trend analysis, recommendation generation, and mentorship tasks autonomously.",
  },
  {
    icon: Brain,
    title: "AI Engine",
    description:
      "GPT-5/Llama 3 powers the conversational interface, learning path generation, and predictive analytics.",
  },
  {
    icon: Palette,
    title: "Frontend Application",
    description:
      "React/Next.js delivers an interactive dashboard, chat interface, trend explorer, and visualization tools.",
  },
];

const team = [
  {
    name: "AI & ML Lead",
    role: "Model training, RAG pipeline, agent orchestration",
  },
  {
    name: "Backend Engineer",
    role: "API development, data pipelines, database management",
  },
  {
    name: "Frontend Developer",
    role: "UI/UX design, dashboard, data visualization",
  },
  {
    name: "Data Engineer",
    role: "Web scraping, data processing, ETL pipelines",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-6">
          <Brain className="w-4 h-4" />
          About EduTrend AI
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Bridging the Gap Between{" "}
          <span className="text-primary-light">Learning</span> and{" "}
          <span className="text-primary-light">Industry Demand</span>
        </h1>
        <p className="text-muted max-w-3xl mx-auto text-lg">
          EduTrend AI is an AI-powered educational trend and recommendation
          platform that integrates RAG, intelligent AI agents, and external APIs
          to deliver data-driven, personalized learning insights.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="gradient-card rounded-2xl p-8 border border-danger/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-danger" />
            The Problem
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Students and educators struggle to keep up with emerging learning
            trends, in-demand skills, and future-ready career paths. Existing
            platforms mainly focus on course recommendations but lack real-time
            adaptability to global educational shifts and fail to personalize
            learning journeys based on both user needs and current industry
            trends.
          </p>
        </div>

        <div className="gradient-card rounded-2xl p-8 border border-success/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-success" />
            Our Solution
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            EduTrend AI continuously scans data from learning platforms, job
            portals, and academic resources to detect emerging educational
            trends, recommend personalized learning paths, and provide AI-based
            mentorship using a conversational interface. By leveraging RAG and
            multi-agent collaboration, we ensure up-to-date, context-aware, and
            actionable learning insights.
          </p>
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          System <span className="text-primary-light">Architecture</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architecture.map((item, i) => (
            <div
              key={item.title}
              className="relative gradient-card rounded-xl p-5 border border-primary/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary-light">
                  {i + 1}
                </div>
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Tech <span className="text-primary-light">Stack</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {techStack.map((tech, i) => (
            <div
              key={tech.title}
              className="gradient-card rounded-xl p-4 border border-primary/10 text-center"
            >
              <tech.icon className="w-6 h-6 text-primary-light mx-auto mb-2" />
              <h3 className="text-sm font-semibold mb-2">{tech.title}</h3>
              <ul className="text-xs text-muted space-y-1">
                {tech.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Key <span className="text-primary-light">Features</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: TrendingUp,
              title: "Real-Time Trends",
              desc: "Continuous scanning of global learning data",
            },
            {
              icon: Route,
              title: "Smart Paths",
              desc: "AI-generated personalized learning roadmaps",
            },
            {
              icon: MessageCircle,
              title: "AI Mentor",
              desc: "RAG-powered conversational guidance",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              desc: "Interactive dashboards and visualizations",
            },
            {
              icon: Users,
              title: "Multi-User",
              desc: "Students, educators, counselors, institutions",
            },
            {
              icon: Cpu,
              title: "Multi-Agent",
              desc: "Autonomous AI agents for research & analysis",
            },
            {
              icon: Code2,
              title: "API Access",
              desc: "RESTful API for EdTech integrations",
            },
            {
              icon: Globe,
              title: "Global Data",
              desc: "Data from Coursera, Udemy, LinkedIn, and more",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 p-4 rounded-xl border border-primary/5 bg-surface/30"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <f.icon className="w-4 h-4 text-primary-light" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{f.title}</h4>
                <p className="text-xs text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Outcome */}
      <div className="gradient-card rounded-3xl p-10 border border-primary/20 glow-cyan text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Expected <span className="text-primary-light">Outcome</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto leading-relaxed">
          EduTrend AI will help learners stay ahead of global educational
          trends, assist educators and institutions in curriculum innovation,
          and enable truly personalized and adaptive lifelong learning
          experiences. It represents a fusion of AI, data science, and education
          for positive social impact.
        </p>
      </div>
    </div>
  );
}
