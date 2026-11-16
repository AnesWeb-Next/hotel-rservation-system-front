/**
 * Server-side API helpers for fetching data in Server Components.
 * These use native fetch() (no axios) so they work in RSC context.
 */

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}

async function serverFetch<T>(
  path: string,
  options?: { auth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.auth) {
    const token = await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, options?.auth
    ? { headers, cache: "no-store" }
    : { headers, next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchRooms(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<RoomsResponse> {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }
  const query = searchParams.toString();
  const response = await serverFetch<ApiPaginatedResponse<RoomI>>(
    `/room${query ? `?${query}` : ""}`,
  );

  return {
    data: response.data,
    total: response.pagination.total,
    page: response.pagination.page,
    limit: response.pagination.limit,
  };
}

export async function fetchHomeRooms(): Promise<RoomsResponse> {
  return fetchRooms({ limit: 4 });
}

// ─── User profile (auth required) ────────────────────────────

export async function fetchUserProfile(): Promise<UserI> {
  const data = await serverFetch<ApiSuccessResponse<UserI>>("/auth/check", {
    auth: true,
  });
  return data.data;
}
