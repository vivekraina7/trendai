"use client";

import { Brain, Linkedin, Mail, Instagram } from "lucide-react";

const team = [
  {
    name: "Vanam Vaishnavi Devi",
    role: "Co-Founder & Education Innovator",
    image: "/team/vaishnavi.jpg",
    bio: "Hi, I'm Vanam Vaishnavi Devi — a learner, builder, and dreamer who believes education should go beyond textbooks. From exploring AI and emerging technologies to building Vyreka, a platform focused on hands-on, peer-to-peer learning, my journey is all about turning knowledge into action and ideas into impact. I'm passionate about creating communities where students don't just learn — they collaborate, build, and grow together.",
    linkedin: "https://www.linkedin.com/in/vanam-vaishnavi-devi-9601ba2bb",
    instagram: "https://www.instagram.com/vaishnavi_devi08?igsh=Yzh4Z25ob3U2ajJ5",
    email: "vaishnavidevivanam256@gmail.com",
  },
  {
    name: "Pradeep Kiran Pothala",
    role: "QA Engineer & Technical Advisor",
    image: "/team/pradeep.jpg",
    bio: "Hi, I'm Pradeep Kiran Pothala, a QA Engineer based in Hyderabad, currently working at Thomson Reuters. I focus on building reliable software through manual and automation testing, API validation, and cloud-based solutions. I work with Java, Python, Selenium, Postman, SQL, and AWS, and enjoy improving quality, optimizing workflows, and continuously learning new technologies.",
    linkedin: "https://www.linkedin.com/in/pradeep-kiran-275010278",
    instagram: "https://www.instagram.com/pothala_pradeep?igsh=MWx4M2xyY3Q3dWVjcA==",
    email: "pradeepkiranpothala@gmail.com",
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
          Built by{" "}
          <span className="text-primary-light">Dreamers</span> for{" "}
          <span className="text-primary-light">Learners</span>
        </h1>
        <p className="text-muted max-w-3xl mx-auto text-lg leading-relaxed">
          EduTrend AI is a product of{" "}
          <span className="text-primary-light font-semibold">Vyreka</span> — a
          community-first platform where students don't just learn, they
          collaborate, build, and grow together. We believe education should
          meet you where the world is heading.
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <div className="gradient-card rounded-2xl p-8 border border-danger/10">
          <h2 className="text-xl font-bold mb-4 text-danger">The Problem</h2>
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
          <h2 className="text-xl font-bold mb-4 text-success">Our Solution</h2>
          <p className="text-sm text-muted leading-relaxed">
            EduTrend AI continuously scans data from learning platforms, job
            portals, and academic resources to detect emerging educational
            trends, recommend personalized learning paths, and provide AI-based
            mentorship using a conversational interface. By leveraging RAG and
            real-time data, we ensure up-to-date, context-aware, and
            actionable learning insights.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Meet the <span className="text-primary-light">Team</span>
          </h2>
          <p className="text-muted mt-3 text-sm">
            The people behind EduTrend AI & Vyreka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="gradient-card rounded-3xl p-8 border border-primary/15 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Profile header */}
              <div className="flex items-start gap-5 mb-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0d1b2a&color=22d3ee&size=96`;
                      }}
                    />
                  </div>
                  {/* Gradient ring */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all pointer-events-none" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-light font-medium mt-0.5">
                    {member.role}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-2 mt-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/20"
                    >
                      <Linkedin className="w-3 h-3" />
                      LinkedIn
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-md shadow-purple-500/20"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light border border-primary/15 text-muted hover:text-primary-light hover:border-primary/30 text-xs font-medium transition-all"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted leading-relaxed border-t border-primary/10 pt-5">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Vyreka CTA */}
      <div className="gradient-card rounded-3xl p-10 border border-primary/20 glow-cyan text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-5">
          <Brain className="w-4 h-4" />
          Powered by Vyreka
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Join Our <span className="text-primary-light">Community</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto leading-relaxed mb-8">
          EduTrend AI is just the beginning. Vyreka is building a movement where
          learners become builders, and ideas become impact. Connect with us and
          be part of the journey.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.linkedin.com/company/vyreka/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
          >
            <Linkedin className="w-4 h-4" />
            Follow on LinkedIn
          </a>
          <a
            href="https://chat.whatsapp.com/Lp8HCvoz8NyLS1ynXKLDDz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join WhatsApp Community
          </a>
          <a
            href="https://www.instagram.com/_vyreka_?igsh=cGwxNGx3djg4dW1w"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
