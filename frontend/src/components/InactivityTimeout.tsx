"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour in milliseconds

export function InactivityTimeout() {
  const { token, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Only track inactivity if the user is logged in
    if (!token) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        router.push("/login?message=Session expired due to inactivity");
      }, INACTIVITY_LIMIT);
    };

    // Initialize timer
    resetTimer();

    // Events that count as user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    
    // Define the event listener
    const handleActivity = () => resetTimer();

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [token, logout, router]);

  return null; // This is a logic-only component
}
