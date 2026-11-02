"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Auth Layout - used for login, register, and other auth pages
 * Redirects authenticated users to the home page
 * Displays centered card with interactive particle background
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Redirect to home if already logged in
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, [isLoggedIn, router]);

  // Don't render auth pages if already logged in
  if (isLoggedIn) {
    return null;
  }

  return <div>{children}</div>;
}
