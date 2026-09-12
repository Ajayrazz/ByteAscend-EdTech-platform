"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Check if Zustand has already hydrated from localStorage
    setHasHydrated(useAuthStore.persist.hasHydrated());

    // Listen for hydration if it hasn't completed yet
    const unsubHydrate = useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));

    return () => unsubHydrate();
  }, []);

  useEffect(() => {
    // Only redirect if hydration is complete and there is no token
    if (hasHydrated && !token) {
      router.push("/login");
    }
  }, [hasHydrated, token, router]);

  // Prevent hydration mismatch and hide content until check is complete
  if (!hasHydrated || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B14]">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
