import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * User state interface matching reference project
 */
interface UserState {
  user: UserI | null;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isAdmin: false,
};

/**
 * User slice for managing authentication state
 * Follows pattern from reference project
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hydrateAuth: (
      state,
      action: PayloadAction<{ user: UserI; token: string } | null>,
    ) => {
      const auth = action.payload;
      state.user = auth?.user ?? null;
      state.token = auth?.token ?? null;
      state.isLoggedIn = Boolean(auth);
      state.isAdmin = auth?.user.role === "admin";
    },

    /**
     * Login action - sets user data and auth flags
     * Note: Storage is handled by the auth API based on rememberMe preference
     */
    login: (
      state,
      action: PayloadAction<{ user: UserI | SafeUserI; token: string }>,
    ) => {
      state.user = action.payload.user as UserI;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.user?.role === "admin";
    },

    /**
     * Logout action - clears all auth state
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isAdmin = false;

      // Remove from both localStorage and sessionStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
        localStorage.removeItem("rememberMe");
        sessionStorage.removeItem("auth");
      }
    },

    updateUser: (state, action: PayloadAction<Partial<UserI>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (action.payload.role) {
          state.isAdmin = action.payload.role === "admin";
        }

        if (typeof window !== "undefined" && state.token) {
          const storage = sessionStorage.getItem("auth")
            ? sessionStorage
            : localStorage;
          storage.setItem(
            "auth",
            JSON.stringify({
              user: state.user,
              token: state.token,
            }),
          );
        }
      }
    },
  },
});

export const { hydrateAuth, login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
