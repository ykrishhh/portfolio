const API = import.meta.env.VITE_API_URL || '/api';

export async function submitContact(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to send message');
  return json;
}

export function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

async function authFetch(url: string, opts?: RequestInit) {
  const token = getToken();
  const res = await fetch(url, {
    ...opts,
    headers: { ...opts?.headers, Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    clearToken();
    window.location.hash = '#/admin';
  }
  return res;
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Login failed');
  return json;
}

export async function getMessages() {
  const res = await authFetch(`${API}/admin/messages`);
  return res.json();
}

export async function markRead(id: number) {
  await authFetch(`${API}/admin/messages/${id}/read`, { method: 'PATCH' });
}

export async function getAdminStats() {
  const res = await authFetch(`${API}/admin/stats`);
  return res.json();
}

export async function verifyToken() {
  const res = await authFetch(`${API}/admin/verify`);
  return res.json();
}

// ── Blog API ──

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  tags: string;
  published: number;
  created_at: string;
  updated_at: string;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API}/blog`);
  return res.json();
}

export async function getPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API}/blog/${slug}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await authFetch(`${API}/blog/admin/all`);
  return res.json();
}

export async function createPost(data: Partial<BlogPost>) {
  const res = await authFetch(`${API}/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create post');
  return json;
}

export async function updatePost(id: number, data: Partial<BlogPost>) {
  const res = await authFetch(`${API}/blog/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id: number) {
  await authFetch(`${API}/blog/${id}`, { method: 'DELETE' });
}
