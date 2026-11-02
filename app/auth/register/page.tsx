"use client";

import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/features/auth";
import { useRegister } from "@/lib/hook/useAuth";
import { toast } from "sonner";
import type { RegisterFormData } from "@/lib/validations/auth";
import { GalleryVerticalEnd } from "lucide-react";

/**
 * Register page - user registration
 * Uses AuthLayout for consistent styling across auth pages
 */
export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      // Strip confirmPassword before sending to backend
      const registerData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      await registerMutation.mutateAsync(registerData);
      toast.success("Account created! Welcome to your stay.");
      router.push("/home");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create account";
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
        <RegisterForm
          onSubmit={handleSubmit}
          isLoading={registerMutation.isPending}
        />
      </div>
    </div>
  );
}
