"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  activeRole: "builder" | "seller";
  loading: boolean;
  error: string | null;
  setActiveRole: (role: "builder" | "seller") => void;
  login: (email: string, password: string) => Promise<UserProfile>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ACTIVE_ROLE_KEY = "bondor_active_role";

function mapAuthError(code: string, fallback: string): string {
  const map: Record<string, string> = {
    "auth/invalid-email": "Invalid email address. Please check and try again.",
    "auth/user-not-found": "No account found with this email. Please sign up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Incorrect email or password. Please try again.",
    "auth/email-already-in-use": "This email is already registered. Try signing in.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/missing-email": "Email is required.",
    "auth/missing-password": "Password is required.",
  };
  return map[code] || fallback;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeRole, setActiveRoleState] = useState<"builder" | "seller">("builder");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Persist activeRole preference only if user role is "both"
  const setActiveRole = useCallback((role: "builder" | "seller") => {
    setActiveRoleState((prev) => {
      // Only allow switching if profile is "both" or no profile yet (during signup flow)
      if (userProfile && userProfile.role !== "both" && userProfile.role !== role) {
        // Force role to match profile if not "both"
        const forced = userProfile.role === "seller" ? "seller" : "builder";
        try {
          localStorage.setItem(ACTIVE_ROLE_KEY, forced);
        } catch {}
        return forced;
      }
      try {
        localStorage.setItem(ACTIVE_ROLE_KEY, role);
      } catch {}
      return role;
    });
  }, [userProfile]);

  const fetchUserProfile = useCallback(async (uid: string): Promise<UserProfile | null> => {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        // Validate role
        const validRoles: UserRole[] = ["builder", "seller", "both"];
        const safeRole = validRoles.includes(data.role) ? data.role : "builder";
        const profile: UserProfile = { ...data, role: safeRole, uid };
        setUserProfile(profile);
        // Set active role based on profile + persisted preference
        if (profile.role === "both") {
          try {
            const stored = localStorage.getItem(ACTIVE_ROLE_KEY) as "builder" | "seller" | null;
            if (stored === "builder" || stored === "seller") {
              setActiveRoleState(stored);
            } else {
              setActiveRoleState("builder");
            }
          } catch {
            setActiveRoleState("builder");
          }
        } else if (profile.role === "seller") {
          setActiveRoleState("seller");
        } else {
          setActiveRoleState("builder");
        }
        return profile;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      return null;
    }
  }, []);

  // Sync auth state — single source of truth, no localStorage mock user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setError(null);
      if (currentUser) {
        setUser(currentUser);
        const profile = await fetchUserProfile(currentUser.uid);
        if (!profile) {
          // Profile document missing — create default builder profile in Firestore
          const fallback: UserProfile = {
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email?.split("@")[0] || "Maker",
            email: currentUser.email || "",
            role: "builder",
            createdAt: Date.now(),
          };
          try {
            await setDoc(doc(db, "users", currentUser.uid), { ...fallback, createdAt: serverTimestamp() } as any, { merge: true });
            // Re-fetch to get server timestamp normalized
            await fetchUserProfile(currentUser.uid);
          } catch (e) {
            console.warn("Could not create fallback profile:", e);
            setUserProfile(fallback);
            setActiveRoleState("builder");
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setActiveRoleState("builder");
        try {
          localStorage.removeItem(ACTIVE_ROLE_KEY);
        } catch {}
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // Keep activeRole in sync when profile role changes (e.g. after login)
  useEffect(() => {
    if (!userProfile) return;
    if (userProfile.role === "seller") {
      setActiveRoleState("seller");
    } else if (userProfile.role === "builder") {
      setActiveRoleState("builder");
    } else if (userProfile.role === "both") {
      // Respect stored preference
      try {
        const stored = localStorage.getItem(ACTIVE_ROLE_KEY) as "builder" | "seller" | null;
        if (stored === "builder" || stored === "seller") {
          setActiveRoleState(stored);
        }
      } catch {}
    }
  }, [userProfile?.role]);

  const login = useCallback(async (email: string, password: string): Promise<UserProfile> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
      let profile = await fetchUserProfile(cred.user.uid);
      if (!profile) {
        // Create fallback if Firestore doc missing (first login after manual Firebase creation)
        profile = {
          uid: cred.user.uid,
          name: cred.user.displayName || cleanEmail.split("@")[0] || "Bondor User",
          email: cred.user.email || cleanEmail,
          role: "builder",
          createdAt: Date.now(),
        };
        try {
          await setDoc(doc(db, "users", cred.user.uid), { ...profile, createdAt: serverTimestamp() } as any, { merge: true });
        } catch (e) {
          console.warn("Failed to create fallback profile on login:", e);
        }
        setUserProfile(profile);
        setActiveRoleState("builder");
      }
      setUser(cred.user);
      return profile;
    } catch (err: any) {
      const code = err?.code as string | undefined;
      const message = mapAuthError(code || "", err?.message || "Login failed. Please try again.");
      setError(message);
      throw new Error(message);
    }
  }, [fetchUserProfile]);

  const signup = useCallback(async (name: string, email: string, password: string, role: UserRole): Promise<UserProfile> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if (!cleanName || cleanName.length < 2) {
      throw new Error("Please enter your full name (at least 2 characters).");
    }
    if (!cleanEmail || !validateEmail(cleanEmail)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
    const validRoles: UserRole[] = ["builder", "seller", "both"];
    if (!validRoles.includes(role)) {
      throw new Error("Please select a valid account type.");
    }

    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
      // Set displayName in Auth profile
      try {
        await updateProfile(cred.user, { displayName: cleanName });
      } catch (e) {
        console.warn("Failed to set displayName:", e);
      }

      const newProfile: UserProfile = {
        uid: cred.user.uid,
        name: cleanName,
        email: cleanEmail,
        role,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", cred.user.uid), { ...newProfile, createdAt: serverTimestamp() } as any);
      setUser(cred.user);
      setUserProfile(newProfile);
      setActiveRoleState(role === "seller" ? "seller" : "builder");
      try {
        localStorage.setItem(ACTIVE_ROLE_KEY, role === "seller" ? "seller" : "builder");
      } catch {}
      return newProfile;
    } catch (err: any) {
      const code = err?.code as string | undefined;
      const message = mapAuthError(code || "", err?.message || "Signup failed. Please try again.");
      setError(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (e: any) {
      console.warn("SignOut error:", e);
      // Still clear local state even if Firebase signOut fails
    } finally {
      setUser(null);
      setUserProfile(null);
      setActiveRoleState("builder");
      try {
        localStorage.removeItem(ACTIVE_ROLE_KEY);
      } catch {}
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchUserProfile(user.uid);
    }
  }, [user, fetchUserProfile]);

  const contextValue = useMemo(() => ({
    user,
    userProfile,
    activeRole,
    loading,
    error,
    setActiveRole,
    login,
    signup,
    logout,
    refreshProfile,
  }), [user, userProfile, activeRole, loading, error, setActiveRole, login, signup, logout, refreshProfile]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useRequireAuth = (allowedRoles?: UserRole[]) => {
  const { user, userProfile, loading } = useAuth();
  const isAuthenticated = !!user && !!userProfile;
  const hasRole = !allowedRoles || !userProfile ? false : allowedRoles.includes(userProfile.role) || userProfile.role === "both" || allowedRoles.includes("both" as any);
  // For pages that allow both but check activeRole separately, use allowedRoles logic in component
  return { isAuthenticated, hasRole, loading, user, userProfile };
};
