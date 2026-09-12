"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { userApi } from "@/lib/api";

export default function OAuth2RedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (!token) {
      router.push("/login?error=OAuth2Failed");
      return;
    }

    // Set token temporarily in localStorage so axios interceptor can use it
    localStorage.setItem("auth-storage", JSON.stringify({ state: { token, user: null }, version: 0 }));
    
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await userApi.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        login(response.data, token);
        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to fetch user data after OAuth:", error);
        router.push("/login?error=OAuth2FetchFailed");
      }
    };

    fetchUser();
  }, [token, router, login]);

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-white/70 font-medium animate-pulse">Authenticating with ByteAscend...</p>
      </div>
    </div>
  );
}
