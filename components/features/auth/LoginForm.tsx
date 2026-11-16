"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LoginFormProps {
  /** Form submission handler */
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  /** Whether the form is submitting */
  isLoading?: boolean;
}

/**
 * LoginForm component - form for user authentication
 */
export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<"email" | "password", string>>
  >({});

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      const result = loginSchema.safeParse(value);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        setValidationErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
        return;
      }

      setValidationErrors({});
      await onSubmit(result.data);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <FieldGroup className="space-y-4">
              <Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="outline" type="button" className="w-full">
                    <span className="mr-2"></span>
                    Login with Apple
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <span className="mr-2">G</span>
                    Login with Google
                  </Button>
                </div>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                        setValidationErrors((errors) => ({
                          ...errors,
                          email: undefined,
                        }));
                      }}
                      placeholder="m@example.com"
                      disabled={isLoading}
                    />
                    {(validationErrors.email ||
                      field.state.meta.errors.length > 0) && (
                      <FieldDescription className="text-destructive">
                        {validationErrors.email ??
                          field.state.meta.errors.join(", ")}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                        setValidationErrors((errors) => ({
                          ...errors,
                          password: undefined,
                        }));
                      }}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    {(validationErrors.password ||
                      field.state.meta.errors.length > 0) && (
                      <FieldDescription className="text-destructive">
                        {validationErrors.password ??
                          field.state.meta.errors.join(", ")}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/auth/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
