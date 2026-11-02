import { z } from "zod";

/**
 * Registration requires a stronger password than the backend's minimum login length.
 */
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Register form validation schema
 */
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(70, "Full name must be at most 70 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional().or(z.literal("")),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/**
 * Change password validation schema
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

/**
 * Update profile validation schema
 */
export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .optional(),
  displayName: z
    .string()
    .min(3, "Display name must have at least 3 letters")
    .max(70, "Display name must have at most 70 letters")
    .optional(),
  DateOfBirth: z
    .coerce.date()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? new Date(val) : undefined)),
  gender: z
    .enum(["male", "female", "non-binary", "prefer-not-to-say"])
    .optional(),
  phone: z.string().optional().or(z.literal("")),
  nationality: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .optional()
    .or(z.literal("")),
});

/**
 * Types inferred from schemas
 */
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
