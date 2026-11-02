"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/features/auth";
import { useLogin } from "@/lib/hook/useAuth";
import { toast } from "sonner";
import type { LoginFormData } from "@/lib/validations/auth";
import { GalleryVerticalEnd } from "lucide-react";

/**
 * Login page - user authentication
 * Uses AuthLayout for consistent styling across auth pages
 */
export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      toast.success("Login successful");

      // Check for redirect destination stored before login
      const redirectTo =
        typeof window !== "undefined"
          ? sessionStorage.getItem("redirectAfterLogin")
          : null;

      if (redirectTo) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.push(redirectTo);
      } else {
        router.push("/home");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={loginMutation.isPending}
        />
      </div>
    </div>
  );
}
