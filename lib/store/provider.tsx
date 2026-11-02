"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { hydrateAuth } from "./slices/user";
import { store, useAppDispatch } from "./index";

interface StoreProviderProps {
  children: ReactNode;
}

function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedAuth =
      localStorage.getItem("auth") ?? sessionStorage.getItem("auth");

    if (!storedAuth) {
      dispatch(hydrateAuth(null));
      return;
    }

    try {
      const parsed = JSON.parse(storedAuth) as {
        user?: UserI;
        token?: string;
      };
      dispatch(
        hydrateAuth(
          parsed.user && parsed.token
            ? { user: parsed.user, token: parsed.token }
            : null,
        ),
      );
    } catch {
      dispatch(hydrateAuth(null));
    }
  }, [dispatch]);

  return null;
}

/**
 * Redux Store Provider component
 * Wraps the application with Redux Provider for state management
 */
export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}
