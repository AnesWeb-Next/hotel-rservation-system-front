"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  changePassword,
} from "@/lib/api/auth";
import { useAppDispatch } from "@/lib/store/index";
import {
  login as loginAction,
  logout as logoutAction,
  updateUser as updateUserAction,
} from "@/lib/store/slices/user";

/**
 * Login mutation input type
 */
interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Query key factory for auth
 */
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

/**
 * Hook to get current user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: getProfile,
    retry: false,
  });
}

/**
 * Hook to login user
 * Sets auth state on success
 */
export function useLogin() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password, rememberMe = false }: LoginInput) =>
      login({ email, password }, rememberMe),
    onSuccess: (response) => {
      if (!response.success) {
        throw new Error("Invalid email or password");
      }

      dispatch(
        loginAction({
          user: response.data as SafeUserI,
          token: response.token,
        }),
      );

      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}

/**
 * Hook to register new user
 * Auto-logs in the user on successful registration
 */
export function useRegister() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterUserI) => register(data),
    onSuccess: (response) => {
      if (response.data && response.token) {
        dispatch(
          loginAction({
            user: response.data as SafeUserI,
            token: response.token,
          }),
        );
        queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      }
    },
  });
}

/**
 * Hook to logout user
 * Clears auth state on success
 */
export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear auth data from Redux and localStorage
      dispatch(logoutAction());
      // Clear all cached queries
      queryClient.clear();
    },
    onError: () => {
      // Even on error, clear local auth state
      dispatch(logoutAction());
      queryClient.clear();
    },
  });
}

/**
 * Hook to update user profile
 * Invalidates profile cache on success
 */
export function useUpdateProfile() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) => updateProfile(data),
    onSuccess: (user) => {
      dispatch(updateUserAction(user));
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}

/**
 * Hook to change user password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      changePassword(data),
  });
}
