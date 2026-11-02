"use client";

import { login, logout, updateUser } from "@/lib/store/slices/user";
import { useAppDispatch, useAppSelector } from "@/lib/store";

export default function useUser() {
  const { user, isLoggedIn, isAdmin, token } = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,

    login: (userData: { user: UserI | SafeUserI; token: string }) =>
      dispatch(login(userData)),

    logout: () => dispatch(logout()),

    updateUser: (data: Partial<UserI>) => dispatch(updateUser(data)),
  };
}
