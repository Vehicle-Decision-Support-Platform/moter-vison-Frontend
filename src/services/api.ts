import Constants from 'expo-constants';

import type { PublicUser, RiskAssessmentRequest, RiskAssessmentResponse } from '@/types/api';

const configured = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl || '';
export const apiBaseUrl = String(configured).replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiBaseUrl) throw new Error('Backend URL is not configured. Add EXPO_PUBLIC_API_URL to .env.');
  const response = await fetch(`${apiBaseUrl}${path}`, { ...init, credentials: 'include', headers: { Accept: 'application/json', ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers } });
  const body = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status}).`);
  return body as T;
}

export const api = {
  session: () => request<{ user: PublicUser | null }>('/api/auth/session'),
  login: (email: string, password: string) => request<{ user: PublicUser }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request<{ ok: true }>('/api/auth/logout', { method: 'POST', body: '{}' }),
  assessRisk: (listing: RiskAssessmentRequest) => request<RiskAssessmentResponse>('/api/risk/assess', { method: 'POST', body: JSON.stringify(listing) }),
};
