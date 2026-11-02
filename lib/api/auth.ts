/**
 * Auth API — real backend calls via apiClient
 */

import { apiClient } from "./client";

/**
 * Login user with email and password
 */
export async function login(
  credentials: LoginUserI,
  rememberMe = false,
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  if (!data.success) {
    throw new Error(data.message || "Invalid email or password");
  }

  // Persist auth data based on rememberMe preference
  if (typeof window !== "undefined") {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(
      "auth",
      JSON.stringify({ user: data.data, token: data.token }),
    );
    // Sync token to HttpOnly cookie for SSR
    void fetch("/api/auth/cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.token }),
    }).then((response) => {
      if (!response.ok) throw new Error("Could not sync authentication cookie");
    }).catch((error: unknown) => {
      console.error("Could not sync authentication cookie", error);
    });
  }

  return data;
}

/**
 * Register a new user
 * Auto-saves auth data to localStorage so the user stays logged in after registration
 */
export async function register(
  data: RegisterUserI,
): Promise<ApiSuccessResponse<UserI>> {
  const { data: res } = await apiClient.post<ApiSuccessResponse<UserI>>(
    "/auth/register",
    data,
  );

  // Persist auth so the user stays logged in after registration
  if (typeof window !== "undefined" && res.token && res.data) {
    localStorage.setItem(
      "auth",
      JSON.stringify({ user: res.data, token: res.token }),
    );
    // Sync token to HttpOnly cookie for SSR
    void fetch("/api/auth/cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: res.token }),
    }).then((response) => {
      if (!response.ok) throw new Error("Could not sync authentication cookie");
    }).catch((error: unknown) => {
      console.error("Could not sync authentication cookie", error);
    });
  }

  return res;
}

/**
 * Logout user — clear local auth data (no backend endpoint)
 */
export async function logout(): Promise<{ success: true; message: string }> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    // Clear HttpOnly cookie
    void fetch("/api/auth/cookie", { method: "DELETE" }).then((response) => {
      if (!response.ok) throw new Error("Could not clear authentication cookie");
    }).catch((error: unknown) => {
      console.error("Could not clear authentication cookie", error);
    });
  }
  return { success: true, message: "Logged out successfully" };
}

/**
 * Get current user profile
 */
export async function getProfile(): Promise<UserI> {
  const { data } =
    await apiClient.get<ApiSuccessResponse<UserI>>("/auth/check");
  return data.data;
}

/**
 * Update current user profile
 */
export async function updateProfile(
  profileData: UpdateUserData,
): Promise<UserI> {
  const { data } = await apiClient.put<ApiSuccessResponse<UserI>>(
    "/auth/profile",
    profileData,
  );
  return data.data;
}

/**
 * Change user password
 */
export async function changePassword(body: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: true; message: string }> {
  const { data } = await apiClient.put<{ success: true; message: string }>(
    "/auth/change-password",
    body,
  );
  return data;
}
