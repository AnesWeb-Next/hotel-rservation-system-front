"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthGuardProps {
  children: ReactNode;
  /** URL to redirect to if not authenticated */
  redirectTo?: string;
  /** Whether to show a loading state while checking auth */
  showLoading?: boolean;
}

/**
 * AuthGuard component - protects routes that require authentication
 * Redirects unauthenticated users to login page
 */
export function AuthGuard({
  children,
  redirectTo = "/auth/login",
  showLoading = true,
}: AuthGuardProps) {
  const router = useRouter();
  const { isLoggedIn, token } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    // If not authenticated, redirect to login
    if (!isLoggedIn || !token) {
      // Store the intended destination for redirect after login
      const currentPath = window.location.pathname + window.location.search;
      sessionStorage.setItem("redirectAfterLogin", currentPath);
      router.replace(redirectTo);
    }
  }, [isLoggedIn, token, router, redirectTo]);

  // Show loading state while checking authentication
  if (!isLoggedIn || !token) {
    if (showLoading) {
      return (
        <div className="container mx-auto space-y-6 p-4">
          <div className="flex items-center justify-center py-12">
            <div className="space-y-4 text-center">
              <Skeleton className="mx-auto h-12 w-12 rounded-full" />
              <Skeleton className="mx-auto h-4 w-32" />
              <p className="text-sm text-muted-foreground">
                Checking authentication...
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
}

/**
 * Hook to use auth state with redirect functionality
 * Returns auth state and utilities for protected pages
 */
export function useRequireAuth(redirectTo = "/auth/login") {
  const router = useRouter();
  const { user, isLoggedIn, token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isLoggedIn || !token) {
      const currentPath = window.location.pathname + window.location.search;
      sessionStorage.setItem("redirectAfterLogin", currentPath);
      router.replace(redirectTo);
    }
  }, [isLoggedIn, token, router, redirectTo]);

  return {
    user,
    isLoggedIn,
    isLoading: !isLoggedIn,
  };
}
