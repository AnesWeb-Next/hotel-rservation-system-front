"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { registerSchema, type RegisterFormData } from "@/lib/validations";

interface RegisterFormProps {
  /** Form submission handler */
  onSubmit: (data: RegisterFormData) => Promise<void> | void;
  /** Whether the form is submitting */
  isLoading?: boolean;
}

/**
 * RegisterForm component - form for user registration
 */
export function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const [validationErrors, setValidationErrors] = useState<
    Partial<
      Record<
        "fullName" | "email" | "password" | "confirmPassword",
        string
      >
    >
  >({});

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      // Parse and validate with Zod
      const result = registerSchema.safeParse(value);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        setValidationErrors({
          fullName: fieldErrors.fullName?.[0],
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
          confirmPassword: fieldErrors.confirmPassword?.[0],
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-4">
              {/* Full Name */}
              <form.Field name="fullName">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setValidationErrors((errors) => ({
                          ...errors,
                          fullName: undefined,
                        }));
                      }}
                      placeholder="John Doe"
                      disabled={isLoading}
                    />
                    {(validationErrors.fullName ||
                      field.state.meta.errors.length > 0) && (
                      <FieldDescription className="text-destructive">
                        {validationErrors.fullName ??
                          field.state.meta.errors.join(", ")}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Email */}
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
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

              {/* Phone */}
              <form.Field name="phone">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Phone{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setValidationErrors((errors) => ({
                          ...errors,
                          password: undefined,
                        }));
                      }}
                      placeholder="Enter your phone number"
                      disabled={isLoading}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <FieldDescription className="text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </FieldDescription>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="password">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          setValidationErrors((errors) => ({
                            ...errors,
                            confirmPassword: undefined,
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

                <form.Field name="confirmPassword">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      {(validationErrors.confirmPassword ||
                        field.state.meta.errors.length > 0) && (
                        <FieldDescription className="text-destructive">
                          {validationErrors.confirmPassword ??
                            field.state.meta.errors.join(", ")}
                        </FieldDescription>
                      )}
                    </Field>
                  )}
                </form.Field>
              </div>

              <FieldDescription>
                Password must be at least 8 characters with 1 uppercase, 1
                lowercase, and 1 number.
              </FieldDescription>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
