/**
 * Central API client for communicating with the FastAPI backend.
 * Base URL: http://localhost:8000
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Token storage (localStorage) ────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("edutrend_token");
}

export function setToken(token: string): void {
  localStorage.setItem("edutrend_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("edutrend_token");
  localStorage.removeItem("edutrend_user");
}

export function getStoredUser(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("edutrend_user");
  return raw ? JSON.parse(raw) : null;
}

export function setStoredUser(user: Record<string, unknown>): void {
  localStorage.setItem("edutrend_user", JSON.stringify(user));
}

// ── Base fetch wrapper ───────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  withAuth = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (withAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }

  return res.json() as Promise<T>;
}

// ── Auth API ─────────────────────────────────────────────────────────────────

export interface AuthResponse {
  token: string;
  user: { id: number; name: string; email: string };
}

export async function apiRegister(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  setToken(data.token);
  setStoredUser(data.user as Record<string, unknown>);
  return data;
}

export async function apiLogin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  setStoredUser(data.user as Record<string, unknown>);
  return data;
}

export async function apiGetMe() {
  return apiFetch("/api/auth/me", {}, true);
}

export function apiLogout() {
  removeToken();
}

// ── Mentor API ───────────────────────────────────────────────────────────────

export async function apiChat(
  message: string,
  sessionId?: string
): Promise<{ session_id: string; response: string }> {
  return apiFetch(
    "/api/mentor/chat",
    {
      method: "POST",
      body: JSON.stringify({ message, session_id: sessionId }),
    },
    true
  );
}

// ── Docs / RAG API ────────────────────────────────────────────────────────────

export async function apiUploadDoc(
  file: File
): Promise<{ doc_id: string; filename: string; chunks: number; message: string }> {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/api/docs/upload`, {
    method: "POST",
    headers,
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}

export async function apiListDocs(): Promise<{
  docs: { doc_id: string; filename: string; uploaded_at: string }[];
}> {
  return apiFetch("/api/docs/", {}, true);
}

export async function apiDeleteDoc(docId: string) {
  return apiFetch(`/api/docs/${docId}`, { method: "DELETE" }, true);
}

// ── Auth extras ───────────────────────────────────────────────────────────────

export async function apiForgotPassword(
  email: string
): Promise<{ message: string; dev_otp?: string; dev_note?: string }> {
  return apiFetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function apiResetPassword(
  email: string,
  otp: string,
  new_password: string
): Promise<{ message: string }> {
  return apiFetch("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, otp, new_password }),
  });
}

export async function apiOAuthProviders(): Promise<{
  google: boolean;
  github: boolean;
}> {
  return apiFetch("/api/auth/oauth-providers");
}

/** Redirect browser to backend OAuth flow */
export function startOAuth(provider: "google" | "github") {
  window.location.href = `${BASE_URL}/api/auth/${provider}`;
}

// ── Trends API ───────────────────────────────────────────────────────────────

export interface Trend {
  id: number;
  category: string;
  name: string;
  growth_pct: number;
  demand: number;
  source: string;
  fetched_at: string;
}

export async function apiGetTopTrending(
  limit = 10
): Promise<{ top_trending: Trend[] }> {
  return apiFetch(`/api/trends/top?limit=${limit}`);
}

export async function apiGetTrends(): Promise<{
  trends: Trend[];
  by_category: Record<string, Trend[]>;
}> {
  return apiFetch("/api/trends/");
}

// ── Progress API ─────────────────────────────────────────────────────────────

export async function apiEnroll(pathId: string) {
  return apiFetch(
    "/api/progress/enroll",
    { method: "POST", body: JSON.stringify({ path_id: pathId }) },
    true
  );
}

export async function apiGetPathProgress(pathId: string) {
  return apiFetch(`/api/progress/${pathId}`, {}, true);
}

export async function apiGetAllProgress() {
  return apiFetch("/api/progress/", {}, true);
}

export async function apiUpdateModule(
  pathId: string,
  moduleIndex: number,
  status: "completed" | "current" | "locked"
) {
  return apiFetch(
    "/api/progress/update",
    {
      method: "PATCH",
      body: JSON.stringify({
        path_id: pathId,
        module_index: moduleIndex,
        status,
      }),
    },
    true
  );
}
