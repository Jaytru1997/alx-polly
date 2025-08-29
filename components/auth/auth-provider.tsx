"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabaseClient } from "@/lib/supabase/client";

type AuthUser = {
  id: string;
  email: string | null;
} | null;

type AuthContextValue = {
  user: AuthUser;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabaseClient.auth.getSession();
    const sessionUser = data.session?.user ?? null;
    setUser(
      sessionUser
        ? { id: sessionUser.id, email: sessionUser.email ?? null }
        : null
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Initial session fetch
    void refreshSession();

    // Subscribe to auth state changes
    const { data: subscription } = supabaseClient.auth.onAuthStateChange(() => {
      void refreshSession();
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [refreshSession]);

  const signOut = useCallback(async () => {
    await supabaseClient.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, signOut }),
    [user, isLoading, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
