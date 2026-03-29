"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  TrendingUp,
  Lightbulb,
  RotateCcw,
  Upload,
  FileText,
  Trash2,
  Loader2,
  Paperclip,
} from "lucide-react";
import { apiChat, apiUploadDoc, apiListDocs, apiDeleteDoc } from "@/lib/api";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  {
    icon: TrendingUp,
    text: "What are the top trending skills in AI for 2026?",
  },
  {
    icon: BookOpen,
    text: "Create a 3-month learning plan for full-stack development",
  },
  {
    icon: Lightbulb,
    text: "Which career path has the highest growth potential?",
  },
  {
    icon: Sparkles,
    text: "Compare data science vs AI engineering career paths",
  },
];


export default function AIMentorPage() {
  const initialTimestamp = useMemo(() => new Date(), []);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hello! I'm your **EduTrend AI Mentor**, powered by RAG and real-time educational data. I can help you with:\n\n- 📈 **Trending skills** and career insights\n- 📚 **Personalized learning plans**\n- 🎯 **Career path guidance**\n- 💡 **Skill gap analysis**\n\nYou can also **upload a PDF or TXT** (using the 📎 button) and I'll answer questions based on it!\n\nWhat would you like to explore today?",
      timestamp: initialTimestamp,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Doc upload state
  const [docs, setDocs] = useState<{ doc_id: string; filename: string; uploaded_at: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    apiListDocs().then(({ docs: d }) => setDocs(d)).catch(() => {});
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg("");
    try {
      const res = await apiUploadDoc(file);
      setUploadMsg(`✅ ${res.filename} added (${res.chunks} chunks)`);
      const { docs: updated } = await apiListDocs();
      setDocs(updated);
    } catch (err: unknown) {
      setUploadMsg(`❌ ${err instanceof Error ? err.message : "Upload failed"}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    await apiDeleteDoc(docId).catch(() => {});
    setDocs((prev) => prev.filter((d) => d.doc_id !== docId));
  };

  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    const userMsg: Message = {
      id: messages.length,
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await apiChat(message, sessionId);
      if (res.session_id) setSessionId(res.session_id);
      const aiMsg: Message = {
        id: messages.length + 1,
        role: "assistant",
        content: res.response,
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: messages.length + 1,
        role: "assistant",
        content: "⚠️ Could not reach the AI backend. Make sure the FastAPI server is running on port 8000.",
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 0,
        role: "assistant",
        content:
          "Hello! I'm your **EduTrend AI Mentor**. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-7 h-7 text-primary-light" />
            AI <span className="text-primary-light">Mentor</span>
          </h1>
          <p className="text-sm text-muted">
            Powered by RAG • Real-time educational intelligence
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground bg-surface border border-primary/10 hover:border-primary/20 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-primary/10 bg-surface/30 p-4 space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === "assistant" ? "bg-primary/15" : "bg-surface-light"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="w-4 h-4 text-primary-light" />
              ) : (
                <User className="w-4 h-4 text-muted" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "gradient-card border border-primary/10"
                  : "bg-primary/15 border border-primary/20"
              }`}
            >
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
              <div
                className="text-[10px] text-muted mt-2"
                suppressHydrationWarning
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-light" />
            </div>
            <div className="gradient-card border border-primary/10 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt.text}
              onClick={() => handleSend(prompt.text)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm bg-surface/50 border border-primary/10 hover:border-primary/25 text-muted hover:text-foreground transition-all"
            >
              <prompt.icon className="w-4 h-4 text-primary shrink-0" />
              {prompt.text}
            </button>
          ))}
        </div>
      )}

      {/* Docs Panel */}
      {showDocs && (
        <div className="mb-3 p-3 rounded-xl bg-surface border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted uppercase tracking-wide flex items-center gap-1">
              <FileText className="w-3 h-3" /> Knowledge Documents ({docs.length})
            </span>
          </div>
          {uploadMsg && (
            <div className={`text-xs mb-2 px-2 py-1 rounded-lg ${uploadMsg.startsWith("✅") ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
              {uploadMsg}
            </div>
          )}
          {docs.length === 0 ? (
            <p className="text-xs text-muted/60 italic">No documents uploaded yet. Upload a PDF or TXT to enhance AI answers.</p>
          ) : (
            <div className="space-y-1">
              {docs.map((doc) => (
                <div key={doc.doc_id} className="flex items-center justify-between text-xs bg-surface-light/30 rounded-lg px-2 py-1.5">
                  <span className="text-muted truncate flex items-center gap-1">
                    <FileText className="w-3 h-3 shrink-0" /> {doc.filename}
                  </span>
                  <button onClick={() => handleDeleteDoc(doc.doc_id)} className="text-muted/50 hover:text-danger transition-colors ml-2 shrink-0">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.md"
          onChange={handleFileUpload}
          className="hidden"
        />
        {/* Upload button */}
        <button
          onClick={() => { setShowDocs(!showDocs); if (!showDocs) fileInputRef.current?.click(); }}
          title="Upload PDF or TXT for RAG context"
          disabled={uploading}
          className="px-3 py-3 rounded-xl bg-surface border border-primary/10 text-muted hover:text-primary-light hover:border-primary/30 transition-all disabled:opacity-50 relative"
        >
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
          {docs.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[9px] text-white flex items-center justify-center">
              {docs.length}
            </span>
          )}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask about trends, skills, career paths, or your uploaded docs..."
          className="flex-1 px-4 py-3 rounded-xl bg-surface border border-primary/10 text-foreground placeholder-muted focus:outline-none focus:border-primary/40 transition-colors"
          disabled={isTyping}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="px-4 py-3 rounded-xl gradient-primary text-white hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

